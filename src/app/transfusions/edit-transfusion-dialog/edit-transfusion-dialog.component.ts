import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { TransfusionDto, TransfusionServiceProxy, UpdateTransfusionDto, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-transfusion-dialog',
  templateUrl: './edit-transfusion-dialog.component.html',
  styleUrls: ['./edit-transfusion-dialog.component.css']
})
export class EditTransfusionDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  id: string;

  getTransfusion = new TransfusionDto();
  loggedInUser: UserDto = new UserDto();
  employer: UserDto = new UserDto();
  hospitals: UserDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _transfusionService: TransfusionServiceProxy,
    private _userService: UserServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._transfusionService
      .get(this.id)
      .subscribe((result: TransfusionDto) => {
        this.getTransfusion = result;
      });

    if (this.isGranted('HospitalPersonnel') || this.isGranted('HospitalAdmin')) {
      this._userService
        .get(this.appSession.userId)
        .subscribe((result) => {
          this.loggedInUser = result;

          if (this.isGranted('HospitalPersonnel')) {
            this._userService
              .get(this.loggedInUser.employerId)
              .subscribe((result) => {
                this.employer = result;
              })
          }
        })
    }
    if (this.isGranted('Admin')) {
      this._userService
        .getHospitals()
        .subscribe((result) => {
          this.hospitals = result.items;
        })
    }
  }

  save(): void {
    this.saving = true;

    const transfusion = new UpdateTransfusionDto();
    transfusion.init(this.getTransfusion);

    if (this.isGranted('HospitalAdmin')) {
      transfusion.hospitalId = this.appSession.userId;
    }
    else if (this.isGranted('HospitalPersonnel')) {
      transfusion.hospitalId = this.employer.id;
    }

    this._transfusionService
      .update(transfusion)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }



}
