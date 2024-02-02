import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentVersionComponent } from './component-version.component';

describe('ComponentVersionComponent', () => {
  let component: ComponentVersionComponent;
  let fixture: ComponentFixture<ComponentVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
