import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTotalComponent } from './bill-total.component';

describe('BillTotalComponent', () => {
  let component: BillTotalComponent;
  let fixture: ComponentFixture<BillTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
