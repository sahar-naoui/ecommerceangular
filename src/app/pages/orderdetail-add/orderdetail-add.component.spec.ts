import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdetailAddComponent } from './orderdetail-add.component';

describe('OrderdetailAddComponent', () => {
  let component: OrderdetailAddComponent;
  let fixture: ComponentFixture<OrderdetailAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderdetailAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderdetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
