import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/view-post/create-post/create-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ViewPostComponent } from './post/view-post/view-post.component';


const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'sign-up', component: SignUpComponent },
{ path: 'login', component: LoginComponent },
{ path: 'create-post', component: CreatePostComponent },
{ path: 'create-subreddit', component: CreateSubredditComponent },
{ path: 'view-post/:id', component: ViewPostComponent },
  // { path: 'list-subreddits', component: ListSubredditsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
