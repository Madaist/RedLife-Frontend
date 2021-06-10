import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DonationDto, DonationServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-donation-modal',
  templateUrl: './donation-modal.component.html',
  styleUrls: ['./donation-modal.component.css']
})
export class DonationModalComponent extends AppComponentBase implements OnInit {

  id: string;
  donation: DonationDto;
  @Output() onDownload = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }
}
