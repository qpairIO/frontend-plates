import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservedInstanceComponent } from './add-reserved-instance.component';

describe('AddReservedInstanceComponent', () => {
  let component: AddReservedInstanceComponent;
  let fixture: ComponentFixture<AddReservedInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReservedInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReservedInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
