import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DonationDto, DonationServiceProxy, UpdateDonationDto, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-donation-dialog',
  templateUrl: './edit-donation-dialog.component.html',
  styleUrls: ['./edit-donation-dialog.component.css']
})
export class EditDonationDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  id: string;
  updateDonation = new UpdateDonationDto();
  getDonation = new DonationDto();

  selectedTransfusionCenterId: number;
  selectedDonorId: number;

  transfusionCenters: UserDto[] = [];
  donors: UserDto[] = [];
  
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
    this._donationService
      .get(this.id)
      .subscribe((result: DonationDto) => {
        this.getDonation = result;
        this.selectedTransfusionCenterId = this.getDonation.centerId;
        this.selectedDonorId = this.getDonation.donorId;
      });

    if (this.isGranted('Admin')) {
      this._userService
        .getTransfusionCenters()
        .subscribe((result) => {
          this.transfusionCenters = result.items;
        });

      this._userService
        .getDonors()
        .subscribe((result) => {
          this.donors = result.items;
        });
    };
  }

  save(): void {
    this.saving = true;

    const donation = new UpdateDonationDto();
    donation.init(this.getDonation);

    if (!this.isGranted('Donor')) {
      donation.donorId = this.selectedDonorId;
    }
    else {
      donation.donorId = abp.session.userId;
    }
    donation.centerId = this.selectedTransfusionCenterId;

    console.log("Donation to update");
    console.log(donation);
    this._donationService
      .update(donation)
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
