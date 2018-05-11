import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillAddComponent } from './bill-add.component';

describe('BillAddComponent', () => {
  let component: BillAddComponent;
  let fixture: ComponentFixture<BillAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
