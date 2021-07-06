import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewQuizzesInCategoryComponent } from './user-view-quizzes-in-category.component';

describe('UserViewQuizzesInCategoryComponent', () => {
  let component: UserViewQuizzesInCategoryComponent;
  let fixture: ComponentFixture<UserViewQuizzesInCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewQuizzesInCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewQuizzesInCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
