import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../auth/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    hide: boolean;
    credentials: object;
    apiUrl: string;

    constructor(private http: Http, private router: Router, private authService: AuthService,
                private cookieService: CookieService, public snackBar: MatSnackBar) {
        this.hide = true;
        this.credentials = {
            email: "", password: ""
        };
        this.apiUrl = environment.apiUrl;
    }

    ngOnInit() {
        this.authService.hitDashboardIfLoggedIn();
    }

    signup() {
        this.http.post(this.apiUrl + "signup", this.credentials)
            .map((res: Response) => {
                return res.json()
            }).toPromise().then((res) => {
                console.log(res);
                this.cookieService.put("auth_token", res.auth_token);
                this.router.navigate(['/dashboard']);
            }).catch(err => {
                console.log(err);
                let message = JSON.parse(err._body).message;
                this.openSnackBar(message, "X")
            }).finally(() => {
                //
            });
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

}

