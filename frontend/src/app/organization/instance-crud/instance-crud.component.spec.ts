import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceCrudComponent } from './instance-crud.component';

describe('InstanceCrudComponent', () => {
  let component: InstanceCrudComponent;
  let fixture: ComponentFixture<InstanceCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
