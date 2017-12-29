import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide: boolean;
    credentials: object;
    apiUrl: string;

    constructor(private http: Http, private cookieService: CookieService,
                private router: Router, public snackBar: MatSnackBar) {
        this.hide = true;
        this.credentials = {
            email: "", password: ""
        };
        this.apiUrl = environment.apiUrl;
    }

    ngOnInit() {
    }

    login() {
        this.http.post(this.apiUrl + "login", this.credentials)
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
