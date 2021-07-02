import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
  AppointmentServiceProxy,
  CreateAppointmentDto,
  UserDto,
  UserServiceProxy,
} from '../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-appointment-dialog',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.css']
})
export class CreateAppointmentDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  appointment = new CreateAppointmentDto();
  loggedInUser = new UserDto();
  employer = new UserDto();

  transfusionCenters: UserDto[] = [];
  donors: UserDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _appointmentService: AppointmentServiceProxy,
    private _userService: UserServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.isGranted('Users.GetCenters')) {
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

    //Get info about the center personnel in order to obtain the employer id and institution anme
    if (this.isGranted('CenterPersonnel')) {
      this._userService
        .get(this.appSession.userId)
        .subscribe((result) => {
          this.loggedInUser = result;

          this._userService
            .get(this.loggedInUser.employerId)
            .subscribe((result) => {
              this.employer = result;
            })
        })
    }
  }

  save(): void {
    this.saving = true;
    this.appointment.init(this.appointment); 

    if (this.appointment.date.toDate() < new Date()) {
      this.notify.error("Appointment can not be in the past or for the current day");
      this.saving = false;
    }
    else {
      
      if (this.isGranted('Donor')) {
        this.appointment.donorId = abp.session.userId;
      }

      if (this.isGranted('CenterPersonnel')) {
        this.appointment.centerId = this.loggedInUser.employerId;
      }

      this._appointmentService
      .isAppointmentDateValid(this.appointment.donorId, this.appointment.date)
      .subscribe((result) => {
         if(result == false){
           this.notify.error("You already have an appointment for this day.");
           this.saving = false;
         }
         else {
            
      this._appointmentService
      .create(this.appointment)
      .pipe(
        finalize(() => {
          this.saving = false;
          console.log("finalize");
        })
      )
      .subscribe(() => {
        this.notify.info('Saved successfully');
        this.bsModalRef.hide();
        this.onSave.emit();
      });
         }
      });

    }
  }

}
