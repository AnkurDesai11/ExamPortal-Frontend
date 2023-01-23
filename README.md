# Exam Portal (frontend)

This project is the Angular SPA frontend for the Exam Portal application which is an Angular + Spring Boot + MySql full stack application where users can answer timed quizzes along multiple categories. The application also has admin functionality where admins can add quiz categories and specific quizzes to the categories.Question can be individually added to quizzes. 


Bootstrap is used primarily for css with material UI.

Role Based Access control implemented using 2 access levels - User and Admin

* Users can access Landing Page, Signup, Login and Dashboard where they can check available quizzes by category and also attempt them.
* Admins can access the quiz dashboard, Add category page and Add quiz page. Further Add question page allows to add questions to quizzes where and admins can also edit existing quizzes/question.

Both users can access the user profile page.

To communicate with the backend, httpclient module is used. Basic access allows users to access landing page, user signup page and login page (unified for user and admin). 
After successful login and signup, user is provided with jwt token from backend with appropriate authorisation according to the credentials provided.
Frontend uses interceptor on evry request that required elevated access (user/admin).

Angular version 12

## Useful Commands

`ng serve` - dev server on `http://localhost:4200/`. Server will be autortealoaded on changes.

`ng build` - build the project. The build artifacts will be stored in the `dist/` directory.
