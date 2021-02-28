import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { TransfusionDto, TransfusionServiceProxy, UpdateTransfusionDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-transfusion-dialog',
  templateUrl: './edit-transfusion-dialog.component.html',
  styleUrls: ['./edit-transfusion-dialog.component.css']
})
export class EditTransfusionDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  id: string;
  getTransfusion = new TransfusionDto();
  
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _transfusionService: TransfusionServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._transfusionService
      .get(this.id)
      .subscribe((result: TransfusionDto) => {
        this.getTransfusion = result;
      });
  }

  save(): void {
    this.saving = true;

    const transfusion = new UpdateTransfusionDto();
    transfusion.init(this.getTransfusion);
   
    this._transfusionService
      .update(transfusion)
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
