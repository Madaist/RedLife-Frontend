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

  transfusionCenters: UserDto[] = [];
  donors: UserDto[] = [];

  isBloodAcceptedOptions = [
    { id: 'Yes', value: true},
    { id: 'No', value: false}
  ]

  bloodTypes = [
    {value: "A+"},
    {value: "B+"},
    {value: "C+"},
    {value: "AB+"},
    {value: "A-"},
    {value: "B-"},
    {value: "C-"},
    {value: "AB-"},
  ]

  donationTypes = [
    {normalizedName: "ORDINARY_DONATION", value: "Ordinary donation"},
    {normalizedName: "SPECIAL_DONATION", value: "Special donation"},
    {normalizedName: "COVID_PLASMA_DONATION", value: "Covid plasma donation"},
  ]
 
  
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

    if (this.isGranted('Donor')) {
      donation.donorId = abp.session.userId;
    }
 
    this._donationService
      .update(donation)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info('SavedSuccessfully');
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }

}
