import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfusionsComponent } from './transfusions.component';

describe('TransfusionsComponent', () => {
  let component: TransfusionsComponent;
  let fixture: ComponentFixture<TransfusionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfusionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfusionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
