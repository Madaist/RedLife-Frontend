import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTransfusionDialogComponent } from './create-transfusion-dialog.component';

describe('CreateTransfusionDialogComponent', () => {
  let component: CreateTransfusionDialogComponent;
  let fixture: ComponentFixture<CreateTransfusionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransfusionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransfusionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
