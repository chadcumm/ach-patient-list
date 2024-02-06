import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchCommentComponent } from './ach-comment.component';

describe('AchCommentComponent', () => {
  let component: AchCommentComponent;
  let fixture: ComponentFixture<AchCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
