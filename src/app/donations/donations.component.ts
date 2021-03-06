import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { DonationDto, DonationDtoPagedResultDto, DonationServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateDonationDialogComponent } from './create-donation-dialog/create-donation-dialog.component';
import { EditDonationDialogComponent } from './edit-donation-dialog/edit-donation-dialog.component';
import { ShowDonationQRCodeDialogComponent } from './show-donation-qrcode-dialog/show-donation-qrcode-dialog.component';

class PagedDonationsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent extends PagedListingComponentBase<DonationDto> {

  donations: DonationDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _donationsService: DonationServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedDonationsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._donationsService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: DonationDtoPagedResultDto) => {
        this.donations = result.items;
        console.log(this.donations);
        this.showPaging(result, pageNumber);
      });
  }

  delete(donation: DonationDto): void {
    abp.message.confirm(
      this.l('DonationDeleteWarningMessage', donation.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this._donationsService
            .delete(donation.id)
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

  showCreateOrEditDonationDialog(id?: string): void {
    let createOrEditDonationDialog: BsModalRef;
    if (!id) {
      createOrEditDonationDialog = this._modalService.show(
        CreateDonationDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    }
    else {
      createOrEditDonationDialog = this._modalService.show(
        EditDonationDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditDonationDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }


  showDonationQRCode(id?: string): void {
    let showDonationQRCodeDialog: BsModalRef;
    showDonationQRCodeDialog = this._modalService.show(
      ShowDonationQRCodeDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          id: id,
        },
      }
    );

    showDonationQRCodeDialog.content.onDownload.subscribe(() => {
      this.refresh();
    });
  }


  createDonation(): void {
    this.showCreateOrEditDonationDialog();
  }

  editDonation(donation: DonationDto): void {
    this.showCreateOrEditDonationDialog(donation.id);
  }



}
