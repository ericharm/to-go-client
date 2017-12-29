import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { shim } from 'promise.prototype.finally'; shim();

import {
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        CookieModule.forRoot(),
        HttpModule,
        RouterModule,
        RouterModule.forRoot(ROUTES),
        FormsModule,
        ReactiveFormsModule,

        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatCardModule,
        BrowserAnimationsModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

