import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  AppointmentServiceProxy,
  AppointmentDtoPagedResultDto,
  AppointmentDto
} from '@shared/service-proxies/service-proxies';

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
  ) {
    super(injector);
  }

  ngOnInit(): void {
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
            .subscribe(() => {});
        }
      }
    );
  }

}
