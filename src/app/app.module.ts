import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { NormaluserGuard } from './services/normaluser.guard';
import { AdminGuard } from './services/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelocmeComponent } from './pages/admin/welocme/welocme.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { EditCategoryComponent } from './pages/admin/edit-category/edit-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { EditQuizComponent } from './pages/admin/edit-quiz/edit-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { EditQuestionComponent } from './pages/admin/edit-question/edit-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { UserViewQuizzesComponent } from './pages/user/user-view-quizzes/user-view-quizzes.component';
import { UserViewQuizzesInCategoryComponent } from './pages/user/user-view-quizzes-in-category/user-view-quizzes-in-category.component';
import { QuizInstructionsComponent } from './pages/user/quiz-instructions/quiz-instructions.component';
import { QuizComponent } from './pages/user/quiz/quiz.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelocmeComponent,
    EditProfileComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    EditQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    UserSidebarComponent,
    UserViewQuizzesComponent,
    UserViewQuizzesInCategoryComponent,
    QuizInstructionsComponent,
    QuizComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    CKEditorModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
  ],
  providers: [authInterceptorProviders, NormaluserGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
