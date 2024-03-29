import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  selectedDonorId: number;
  bloodType: string;
  isSpecialDonation: boolean = false;

  uploadedFile;
  base64File;

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
    { normalizedName: "COVID_PLASMA_DONATION", value: "Covid plasma donation" },
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


  fileChanged(e) {
    this.uploadedFile = e.target.files[0];
  }

  getBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  setSelectedDonor(userId) {
    this.selectedDonorId = userId;
    this.bloodType = this.getBloodType(userId);
  }

  getBloodType(userId: number): string {
    for (let i = 0; i < this.donors.length; i++) {
      if (this.donors[i].id == userId) {
        return this.donors[i].bloodType;
      }
    }
    return null;

  }

  setDonationType(donationType: string) {
    if (donationType == "SPECIAL_DONATION") {
      this.isSpecialDonation = true;
    }
    else {
      this.isSpecialDonation = false;
    }
  }

  async save(): Promise<void> {
    this.saving = true;

    if (this.donation.quantity <= 0) {
      this.notify.error("Quantity has to be bigger than 0");
      this.saving = false;
    } else {
      if (this.isGranted('Donor')) {
        this.donation.donorId = abp.session.userId;
      }


      if (this.isGranted('CenterAdmin')) {
        this.donation.centerId = this.loggedInUser.id;
      }
      else if (this.isGranted('CenterPersonnel')) {
        this.donation.centerId = this.employer.id;
      }

      if (this.uploadedFile != null && this.uploadedFile != undefined) {
        var promise = this.getBase64(this.uploadedFile);
        var pdf = await promise as string;
        if (pdf != null && pdf != undefined)
          this.donation.medicalTestsResult = await promise as string;
      }

      if (this.bloodType != null && this.bloodType != undefined) {
        this.donation.bloodType = this.bloodType;
      }

      this._donationService
        .create(this.donation)
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
