import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);
    private apiUrl: string;

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(private router: Router, private http: Http,
        private cookieService: CookieService) {

        this.apiUrl = environment.apiUrl;
    }

    login (user: User, onError: (message: string) => void) {
        this.http.post(this.apiUrl + "login", user)
        .map((res: Response) => {
            return res.json()
        }).toPromise().then((res) => {
            console.log(res);
            this.loggedIn.next(true);
            this.cookieService.put("auth_token", res.auth_token);
            this.router.navigate(['/dashboard']);
        }).catch(err => {
            let body = JSON.parse(err._body);
            let message = body.message;
            onError(message);
        }).finally(() => {
            //
        });
    }

    logout () {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }
}

