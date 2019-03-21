import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import routes
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';

// Import Modules
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './error404/error404.component';

// Routes
const routes: Routes = [
  {path: '', redirectTo : '/home' , pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'comments/:id', component: CommentsComponent},
  {path: '404', component: Error404Component},
  // otherwise redirect to 404
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    HomeComponent,
    PostsComponent,
    CommentsComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
