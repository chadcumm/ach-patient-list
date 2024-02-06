import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchToolbarComponent } from './ach-toolbar.component';

describe('AchToolbarComponent', () => {
  let component: AchToolbarComponent;
  let fixture: ComponentFixture<AchToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
