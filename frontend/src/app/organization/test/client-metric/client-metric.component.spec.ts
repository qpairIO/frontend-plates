import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMetricComponent } from './client-metric.component';

describe('ClientMetricComponent', () => {
  let component: ClientMetricComponent;
  let fixture: ComponentFixture<ClientMetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
