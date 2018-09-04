import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAnalysisListComponent } from './risk-analysis-list.component';

describe('RiskAnalysisListComponent', () => {
  let component: RiskAnalysisListComponent;
  let fixture: ComponentFixture<RiskAnalysisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskAnalysisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
