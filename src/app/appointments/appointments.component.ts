import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  AppointmentServiceProxy,
  AppointmentDtoPagedResultDto,
  AppointmentDto
} from '@shared/service-proxies/service-proxies';
import { CreateAppointmentDialogComponent } from './create-appointment/create-appointment-dialog.component';
import { EditAppointmentDialogComponent } from './edit-appointment/edit-appointment-dialog.component';

class PagedAppointmentsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent extends PagedListingComponentBase<AppointmentDto> {

  appointments: AppointmentDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _appointmentsService: AppointmentServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedAppointmentsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._appointmentsService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: AppointmentDtoPagedResultDto) => {
        this.appointments = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(appointment: AppointmentDto): void {
    abp.message.confirm(
      this.l('AppointmentDeleteWarningMessage', appointment.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this._appointmentsService
            .delete(appointment.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => { });
        }
      }
    );
  }

  showCreateOrEditAppointmentDialog(id?: number): void {
    let createOrEditAppointmentDialog: BsModalRef;
    if (!id) {
      createOrEditAppointmentDialog = this._modalService.show(
        CreateAppointmentDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    }
    else {
      createOrEditAppointmentDialog = this._modalService.show(
        EditAppointmentDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditAppointmentDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  createAppointment(): void {
    this.showCreateOrEditAppointmentDialog();
  }

  editAppointment(appointment: AppointmentDto): void {
    this.showCreateOrEditAppointmentDialog(appointment.id);
  }
}
