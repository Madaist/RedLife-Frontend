import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateDonationDto, DonationServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-donation-dialog',
  templateUrl: './create-donation-dialog.component.html',
  styleUrls: ['./create-donation-dialog.component.css']
})
export class CreateDonationDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  donation = new CreateDonationDto();

  transfusionCenters: UserDto[] = [];
  donors: UserDto[] = [];

  selectedTransfusionCenterId: number;
  selectedQuantity: number = 0.4;
  selectedDonorId: number;
  selectedIsBloodAccepted: boolean = false;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _donationService: DonationServiceProxy,
    private _userService: UserServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);

  }

  ngOnInit(): void {
    if (this.isGranted('Admin')) {
      this._userService
        .getTransfusionCenters()
        .subscribe((result) => {
          this.transfusionCenters = result.items;
        });
    }
    if (this.isGranted('Users.GetDonors')) {
      this._userService
        .getDonors()
        .subscribe((result) => {
          this.donors = result.items;
          console.log(this.donors);
        });
    };


  }

  save(): void {
    this.saving = true;

    const donation = new CreateDonationDto();
    donation.init(this.donation);
    if (!this.isGranted('Donor')) {
      donation.donorId = this.selectedDonorId;
    }
    else {
      donation.donorId = abp.session.userId;
    }
    if (this.isGranted('CenterAdmin')) {
      donation.centerId = this.appSession.userId;
    }
    else {
      donation.centerId = this.selectedTransfusionCenterId;
    }
    donation.quantity = this.selectedQuantity;
    donation.isBloodAccepted = this.selectedIsBloodAccepted;

    this._donationService
      .create(donation)
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
