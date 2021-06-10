import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DonationDto, DonationDtoPagedResultDto, DonationServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-show-donation-qrcode-dialog',
  templateUrl: './show-donation-qrcode-dialog.component.html',
  styleUrls: ['./show-donation-qrcode-dialog.component.css']
})
export class ShowDonationQRCodeDialogComponent extends AppComponentBase implements OnInit {
 
  id: string;
  donation: DonationDto;
  @Output() onDownload = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _donationsService: DonationServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._donationsService
      .get(this.id)
      .subscribe((result: DonationDto) => {
        this.donation = result;
      });
  }

  download(): void {

    this.onDownload.emit();
  }

}
