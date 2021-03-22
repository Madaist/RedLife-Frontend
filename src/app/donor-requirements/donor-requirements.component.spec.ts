import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorRequirementsComponent } from './donor-requirements.component';

describe('DonorRequirementsComponent', () => {
  let component: DonorRequirementsComponent;
  let fixture: ComponentFixture<DonorRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
