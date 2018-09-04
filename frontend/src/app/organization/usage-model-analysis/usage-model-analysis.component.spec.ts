import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageModelAnalysisComponent } from './usage-model-analysis.component';

describe('UsageModelAnalysisComponent', () => {
  let component: UsageModelAnalysisComponent;
  let fixture: ComponentFixture<UsageModelAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageModelAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageModelAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
