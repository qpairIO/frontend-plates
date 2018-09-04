import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectObjectComponent } from './custom-select-object.component';

describe('CustomSelectObjectComponent', () => {
  let component: CustomSelectObjectComponent;
  let fixture: ComponentFixture<CustomSelectObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSelectObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
