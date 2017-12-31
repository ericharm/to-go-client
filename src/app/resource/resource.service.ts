import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class Resource {

    options: RequestOptions;
    authToken: string;

    constructor(private http: Http, private router: Router, private authService: AuthService) {
        let headers = new Headers();
        let authToken = this.authService.authToken;
        if (!authToken) {
            this.authService.logout();
        }
        headers.append('Content-Type', 'application/json');
        headers.append('X-AUTH-TOKEN', authToken);
        this.options = new RequestOptions({ headers: headers });
    }

    get(path: string) {
        let options = this.options;
        return this.http.get(environment.apiUrl + path, options)
        .map((res: Response) => {
            return res.json()
        }).toPromise();
    }

    post(path, body) {
        return this.http.post(environment.apiUrl + path, body)
        .map((res: Response) => {
            return res.json()
        }).toPromise();
    }

}

