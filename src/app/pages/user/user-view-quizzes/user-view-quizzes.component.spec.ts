import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewQuizzesComponent } from './user-view-quizzes.component';

describe('UserViewQuizzesComponent', () => {
  let component: UserViewQuizzesComponent;
  let fixture: ComponentFixture<UserViewQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewQuizzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
