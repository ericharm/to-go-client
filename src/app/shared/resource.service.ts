import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class Resource {

    options: RequestOptions;
    authToken: string;

    constructor(private http: Http, private cookieService: CookieService, private router: Router) {
        let headers = new Headers();
        let authToken = this.cookieService.get("auth_token");
        // if no auth token we should redirect to root
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

