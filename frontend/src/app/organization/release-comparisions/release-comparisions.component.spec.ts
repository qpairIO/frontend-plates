import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseComparisionsComponent } from './release-comparisions.component';

describe('ReleaseComparisionsComponent', () => {
  let component: ReleaseComparisionsComponent;
  let fixture: ComponentFixture<ReleaseComparisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseComparisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseComparisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
