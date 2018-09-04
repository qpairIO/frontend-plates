import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAnalysisDetailsComponent } from './risk-analysis-details.component';

describe('RiskAnalysisDetailsComponent', () => {
  let component: RiskAnalysisDetailsComponent;
  let fixture: ComponentFixture<RiskAnalysisDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskAnalysisDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAnalysisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
