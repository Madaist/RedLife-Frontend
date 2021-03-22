import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsCarriedComponent } from './tests-carried.component';

describe('TestsCarriedComponent', () => {
  let component: TestsCarriedComponent;
  let fixture: ComponentFixture<TestsCarriedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsCarriedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsCarriedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
