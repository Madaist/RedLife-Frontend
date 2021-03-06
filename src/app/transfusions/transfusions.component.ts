import { Component, Injector, OnInit } from '@angular/core';
import { ShowDonationQRCodeDialogComponent } from '@app/donations/show-donation-qrcode-dialog/show-donation-qrcode-dialog.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { TransfusionDto, TransfusionDtoPagedResultDto, TransfusionServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateTransfusionDialogComponent } from './create-transfusion-dialog/create-transfusion-dialog.component';
import { EditTransfusionDialogComponent } from './edit-transfusion-dialog/edit-transfusion-dialog.component';

class PagedTransfusionsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-transfusions',
  templateUrl: './transfusions.component.html',
  styleUrls: ['./transfusions.component.css']
})
export class TransfusionsComponent extends PagedListingComponentBase<TransfusionDto>{

  transfusions: TransfusionDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _transfusionService: TransfusionServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedTransfusionsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._transfusionService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TransfusionDtoPagedResultDto) => {
        this.transfusions = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(transfusion: TransfusionDto): void {
    abp.message.confirm(
      'Transfusion ' +  transfusion.id + ' will be deleted',
      undefined,
      (result: boolean) => {
        if (result) {
          this._transfusionService
            .delete(transfusion.id)
            .pipe(
              finalize(() => {
                abp.notify.success('Successfully deleted');
                this.refresh();
              })
            )
            .subscribe(() => { });
        }
      }
    );
  }

  showCreateOrEditTransfusionDialog(id?: string): void {
    let createOrEditTransfusionDialog: BsModalRef;
    if (!id) {
      createOrEditTransfusionDialog = this._modalService.show(
        CreateTransfusionDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    }
    else {
      createOrEditTransfusionDialog = this._modalService.show(
        EditTransfusionDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditTransfusionDialog.content.onSave.subscribe(() => {
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


  createTransfusion(): void {
    this.showCreateOrEditTransfusionDialog();
  }

  editTransfusion(transfusion: TransfusionDto): void {
    this.showCreateOrEditTransfusionDialog(transfusion.id);
  }

}
