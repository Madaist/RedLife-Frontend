import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodUsageComponent } from './blood-usage.component';

describe('BloodUsageComponent', () => {
  let component: BloodUsageComponent;
  let fixture: ComponentFixture<BloodUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
