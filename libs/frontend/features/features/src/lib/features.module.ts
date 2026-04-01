import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ClubCreateComponent } from './club/club-create/club-create.component';
import { ClubListComponent } from './club/club-list/club-list.component';
import { PlayerListComponent } from './player/player-list/player-list.component';
import { PlayerCreateComponent } from './player/player-create/player-create.component';
import { ClubDetailComponent } from './club/club-detail/club-detail.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { MatchListComponent } from './match/match-list/match-list.component';
import { MatchCreateComponent } from './match/match-create/match-create.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PlayerEditComponent } from './player/player-edit/player-edit.component';
import { ClubEditComponent } from './club/club-edit/club-edit.component';
import { MatchEditComponent } from './match/match-edit/match-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { HomePageComponent } from './homepage/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    UserProfileComponent,
    UserListComponent,
    UserEditComponent,
    ClubCreateComponent,
    ClubListComponent,
    PlayerListComponent,
    PlayerCreateComponent,
    ClubDetailComponent,
    PlayerDetailComponent,
    MatchListComponent,
    MatchCreateComponent,
    LoginComponent,
    RegisterComponent,
    PlayerEditComponent,
    ClubEditComponent,
    MatchEditComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    HomePageComponent,
    UserProfileComponent,
    UserListComponent,
    UserEditComponent,
    ClubCreateComponent,
    ClubListComponent,
    PlayerListComponent,
    PlayerCreateComponent,
    MatchListComponent,
    MatchCreateComponent,
    LoginComponent,
    RegisterComponent,
    PlayerEditComponent,
    ClubEditComponent,
    MatchEditComponent,
  ],
})
export class FeaturesModule { }