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

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _appointmentService: AppointmentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this._appointmentService
      .get(this.id)
      .subscribe((result: AppointmentDto) => {
        this.getAppointment = result;
      });
  }


  save(): void {
    this.saving = true;

    const appointment = new UpdateAppointmentDto();
    appointment.init(this.getAppointment);
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
