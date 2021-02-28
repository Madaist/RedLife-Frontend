import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTransfusionDto, TransfusionServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-transfusion-dialog',
  templateUrl: './create-transfusion-dialog.component.html',
  styleUrls: ['./create-transfusion-dialog.component.css']
})
export class CreateTransfusionDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  transfusion = new CreateTransfusionDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _transfusionService: TransfusionServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);

  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    const transfusion = new CreateTransfusionDto();
    transfusion.init(this.transfusion);

    this._transfusionService
      .create(transfusion)
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
