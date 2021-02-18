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
  AppointmentDto,
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
  transfusionCenters: UserDto[] = [];
  selectedTransfusionCenterId: number;

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
    // this._appointmentService
    //   .getAllPermissions()
    //   .subscribe((result: PermissionDtoListResultDto) => {
    //     this.permissions = result.items;
    //     this.setInitialPermissionsStatus();
    //   });
    this._userService
      .getTransfusionCenters()
      .subscribe((result) => {
        this.transfusionCenters = result.items;
        console.log(this.transfusionCenters);
    });
  }

  save(): void {
    this.saving = true;

    const appointment = new CreateAppointmentDto();
    appointment.init(this.appointment);
    appointment.donorId = abp.session.userId;
    appointment.centerId = this.selectedTransfusionCenterId;
    console.log(this.selectedTransfusionCenterId);
    this._appointmentService
      .create(appointment)
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
