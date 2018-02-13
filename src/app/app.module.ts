import { BrowserModule } from '@angular/platform-browser'
import { CookieModule } from 'ngx-cookie'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http'
import { ResourceModule } from '@ngx-resource/handler-ngx-http'
import { RouterModule } from '@angular/router'
import { ROUTES } from './app.routes'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { shim } from 'promise.prototype.finally'; shim()
import { AppMaterialModule } from './app-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { SignupComponent } from './signup/signup.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AuthService } from './auth/auth.service'
import { AuthGuard } from './auth/auth.guard'
import { TodoResource } from './dashboard/todo.service'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime'

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
        HttpClientModule,
        ResourceModule.forRoot(),
        RouterModule,
        RouterModule.forRoot(ROUTES),
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        BrowserAnimationsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        TodoResource
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

