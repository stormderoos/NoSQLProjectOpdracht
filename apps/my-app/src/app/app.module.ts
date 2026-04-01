import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AboutComponent } from './apps/my-app/src/app/components/about/about/about.component';
import { HeaderComponent } from './apps/my-app/src/app/components/ui/header/header/header.component';
import { FooterComponent } from './apps/my-app/src/app/components/ui/footer/footer/footer.component';
import { NavbarComponent } from './apps/my-app/src/app/components/ui/navbar/navbar.component';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './apps/my-app/src/app/components/home/home.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        AboutComponent,
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        HomeComponent
    ],
    exports: [NavbarComponent],
    imports: [BrowserModule, RouterModule, AppRoutingModule, HttpClientModule, CommonModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
