import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { QrScannerComponent } from '@app/qr-scanner/qr-scanner.component';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTransfusionDto, TransfusionServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-transfusion-dialog',
  templateUrl: './create-transfusion-dialog.component.html',
  styleUrls: ['./create-transfusion-dialog.component.css']
})

export class CreateTransfusionDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  transfusion = new CreateTransfusionDto();
  loggedInUser: UserDto = new UserDto();
  employer: UserDto = new UserDto();
  hospitals: UserDto[] = [];
  selectedHospitalId: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _transfusionService: TransfusionServiceProxy,
    private _userService: UserServiceProxy,
    public bsModalRef: BsModalRef,
    private qrScannerComponenet: QrScannerComponent
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.isGranted('HospitalPersonnel') || this.isGranted('HospitalAdmin')) {
      this._userService
        .get(this.appSession.userId)
        .subscribe((result) => {
          this.loggedInUser = result;
         
          if (this.isGranted('HospitalPersonnel')) {
            this._userService
              .get(this.loggedInUser.employerId)
              .subscribe((result) => {
                this.employer = result;
              })
          }
        })
    }
    if (this.isGranted('Admin')) {
      this._userService
        .getHospitals()
        .subscribe((result) => {
          this.hospitals = result.items;
        })
    }
  }

  save(): void {
    this.saving = true;
    const transfusion = new CreateTransfusionDto();
    transfusion.init(this.transfusion);
    transfusion.donationId = this.qrScannerComponenet.getQRCode();

    if (this.isGranted('HospitalAdmin')) {
      transfusion.hospitalId = this.appSession.userId;
    }
    else if (this.isGranted('HospitalPersonnel')) {
      transfusion.hospitalId = this.employer.id;
    } else if (this.isGranted('Admin')) {
      transfusion.hospitalId = this.selectedHospitalId;
    }

    this._transfusionService
      .create(transfusion)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
