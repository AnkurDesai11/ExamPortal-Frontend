import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { EditCategoryComponent } from './pages/admin/edit-category/edit-category.component';
import { EditQuestionComponent } from './pages/admin/edit-question/edit-question.component';
import { EditQuizComponent } from './pages/admin/edit-quiz/edit-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelocmeComponent } from './pages/admin/welocme/welocme.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { QuizInstructionsComponent } from './pages/user/quiz-instructions/quiz-instructions.component';
import { QuizComponent } from './pages/user/quiz/quiz.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserViewQuizzesInCategoryComponent } from './pages/user/user-view-quizzes-in-category/user-view-quizzes-in-category.component';
import { UserViewQuizzesComponent } from './pages/user/user-view-quizzes/user-view-quizzes.component';
import { AdminGuard } from './services/admin.guard';
import { LoginGuard } from './services/login.guard';
import { NormaluserGuard } from './services/normaluser.guard';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    //pathMatch: 'full',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelocmeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'edit-category/:id',
        component: EditCategoryComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'edit-quiz/:id',
        component: EditQuizComponent,
      },
      {
        path: 'view-questions/:id/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add-question/:id/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'edit-question/:id/:title/:qid',
        component: EditQuestionComponent,
      },
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    //pathMatch: 'full',
    canActivate: [NormaluserGuard],
    children: [//order matters?!
      {
        path: '',
        component: UserViewQuizzesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: ':catId',
        component: UserViewQuizzesInCategoryComponent,
      },
      {
        path: 'instructions/:qid',
        component: QuizInstructionsComponent,
      },

    ]
  },
  {
    path: 'quiz/:qid',
    component: QuizComponent,
    canActivate: [NormaluserGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
