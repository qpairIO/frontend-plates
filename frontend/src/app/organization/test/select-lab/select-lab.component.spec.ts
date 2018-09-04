import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLabComponent } from './select-lab.component';

describe('SelectLabComponent', () => {
  let component: SelectLabComponent;
  let fixture: ComponentFixture<SelectLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
