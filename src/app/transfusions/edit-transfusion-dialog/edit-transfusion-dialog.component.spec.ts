import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransfusionDialogComponent } from './edit-transfusion-dialog.component';

describe('EditTransfusionDialogComponent', () => {
  let component: EditTransfusionDialogComponent;
  let fixture: ComponentFixture<EditTransfusionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransfusionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransfusionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
