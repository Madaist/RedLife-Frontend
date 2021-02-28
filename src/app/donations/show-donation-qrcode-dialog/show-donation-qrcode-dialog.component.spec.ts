import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDonationQRCodeDialogComponent } from './show-donation-qrcode-dialog.component';

describe('ShowDonationQRCodeDialogComponent', () => {
  let component: ShowDonationQRCodeDialogComponent;
  let fixture: ComponentFixture<ShowDonationQRCodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDonationQRCodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDonationQRCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
