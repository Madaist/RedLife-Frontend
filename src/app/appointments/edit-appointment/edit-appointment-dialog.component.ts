import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  AppointmentServiceProxy,
  AppointmentDto,
  UpdateAppointmentDto,
  UserServiceProxy,
  UserDto,
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-appointment-dialog',
  templateUrl: './edit-appointment-dialog.component.html',
  styleUrls: ['./edit-appointment-dialog.component.css']
})
export class EditAppointmentDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  id: number;
  updateAppointment = new UpdateAppointmentDto();
  getAppointment = new AppointmentDto();
  selectedTransfusionCenterId: number;
  transfusionCenters: UserDto[] = [];

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
    this._appointmentService
      .get(this.id)
      .subscribe((result: AppointmentDto) => {
        this.getAppointment = result;
        this.selectedTransfusionCenterId = this.getAppointment.centerId;
      });

    if (!this.isGranted('CenterAdmin')) {
      this._userService
        .getTransfusionCenters()
        .subscribe((result) => {
          this.transfusionCenters = result.items;
          console.log(this.transfusionCenters);
        });
    }
  }


  save(): void {
    this.saving = true;

    const appointment = new UpdateAppointmentDto();
    appointment.init(this.getAppointment);
    appointment.donorId = this.getAppointment.donorId;
    appointment.centerId = this.selectedTransfusionCenterId;

    console.log(appointment);

    this._appointmentService
      .update(appointment)
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
