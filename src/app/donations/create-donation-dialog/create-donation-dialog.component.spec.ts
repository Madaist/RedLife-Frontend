import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDonationDialogComponent } from './create-donation-dialog.component';

describe('CreateDonationDialogComponent', () => {
  let component: CreateDonationDialogComponent;
  let fixture: ComponentFixture<CreateDonationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDonationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDonationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
