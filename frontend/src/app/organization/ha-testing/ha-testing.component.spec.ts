import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaTestingComponent } from './ha-testing.component';

describe('HaTestingComponent', () => {
  let component: HaTestingComponent;
  let fixture: ComponentFixture<HaTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
