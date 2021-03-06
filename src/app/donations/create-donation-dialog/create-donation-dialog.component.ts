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
  loggedInUser: UserDto = new UserDto();
  employer: UserDto = new UserDto();

  isBloodAcceptedOptions = [
    { id: 'Yes', value: true },
    { id: 'No', value: false }
  ]

  bloodTypes = [
    { value: "A+" },
    { value: "B+" },
    { value: "C+" },
    { value: "AB+" },
    { value: "A-" },
    { value: "B-" },
    { value: "C-" },
    { value: "AB-" },
  ]

  donationTypes = [
    { normalizedName: "ORDINARY_DONATION", value: "Ordinary donation" },
    { normalizedName: "SPECIAL_DONATION", value: "Special donation" },
    { normalizedame: "COVID_PLASMA_DONATION", value: "Covid plasma donation" },
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
    this.donation.quantity = 0.4;
    this.donation.type = "ORDINARY_DONATION";

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
        });
    };

    if (this.isGranted('CenterPersonnel') || this.isGranted('CenterAdmin')) {
      this._userService
        .get(this.appSession.userId)
        .subscribe((result) => {
          this.loggedInUser = result;

          if (this.isGranted('CenterPersonnel')) {
            this._userService
              .get(this.loggedInUser.employerId)
              .subscribe((result) => {
                this.employer = result;
              })
          }
        })
    }

  }

  save(): void {
    this.saving = true;

    if (this.isGranted('Donor')) {
      this.donation.donorId = abp.session.userId;
    }

    if (this.isGranted('CenterAdmin')) {
      this.donation.centerId = this.loggedInUser.id;
    }
    else if (this.isGranted('CenterPersonnel')) {
      this.donation.centerId = this.employer.id;
    }

    this._donationService
      .create(this.donation)
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
