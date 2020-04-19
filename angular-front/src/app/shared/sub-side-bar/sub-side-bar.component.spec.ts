import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSideBarComponent } from './sub-side-bar.component';

describe('SubSideBarComponent', () => {
  let component: SubSideBarComponent;
  let fixture: ComponentFixture<SubSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
