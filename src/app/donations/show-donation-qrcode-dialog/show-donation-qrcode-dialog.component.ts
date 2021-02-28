import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-show-donation-qrcode-dialog',
  templateUrl: './show-donation-qrcode-dialog.component.html',
  styleUrls: ['./show-donation-qrcode-dialog.component.css']
})
export class ShowDonationQRCodeDialogComponent extends AppComponentBase implements OnInit {

  id: string;
  @Output() onDownload = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  download(): void {

    this.onDownload.emit();
  }

}
