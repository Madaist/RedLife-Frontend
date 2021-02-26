import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDonationDialogComponent } from './edit-donation-dialog.component';

describe('EditDonationDialogComponent', () => {
  let component: EditDonationDialogComponent;
  let fixture: ComponentFixture<EditDonationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditDonationDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDonationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
