import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { QrScannerComponent } from '@app/qr-scanner/qr-scanner.component';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTransfusionDto, TransfusionServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-create-transfusion-dialog',
    templateUrl: './create-transfusion-dialog.component.html',
    styleUrls: ['./create-transfusion-dialog.component.css']
})

export class CreateTransfusionDialogComponent extends AppComponentBase implements OnInit {

    saving = false;
    transfusion = new CreateTransfusionDto();
    loggedInUser: UserDto = new UserDto();
    employer: UserDto = new UserDto();
    hospitals: UserDto[] = [];

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _transfusionService: TransfusionServiceProxy,
        private _userService: UserServiceProxy,
        public bsModalRef: BsModalRef,
        private qrScannerComponent: QrScannerComponent
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.transfusion.quantity = 0.4;

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

        const transfusion = new CreateTransfusionDto();
        transfusion.init(this.transfusion);

        if (transfusion.quantity > 0.4 || transfusion.quantity <= 0)  {
            this.notify.error('Quantity can not be bigger than 0.4 or less than 0');
            this.saving = false;
        }
        else {
            transfusion.donationId = this.qrScannerComponent.getQRCode();

            if (this.isGranted('HospitalAdmin')) {
                transfusion.hospitalId = this.appSession.userId;
            }
            else if (this.isGranted('HospitalPersonnel')) {
                transfusion.hospitalId = this.employer.id;
            }

            this._transfusionService
                .create(transfusion)
                .pipe(
                    finalize(() => {
                        this.saving = false;
                    })
                )
                .subscribe(() => {
                    this.notify.info('Saved successfully');
                    this.bsModalRef.hide();
                    this.onSave.emit();
                });
        }
    }
}
