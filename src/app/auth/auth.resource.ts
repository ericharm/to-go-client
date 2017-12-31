import { Injectable } from '@angular/core';
import { Resource, ResourceHandler } from '@ngx-resource/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthResource extends Resource {

    authToken: string;

    constructor(restHandler: ResourceHandler, auth: AuthService) {
        super(restHandler);
        this.authToken = auth.authToken;
        if (!auth.authToken) {
            auth.logout();
        }
    }

    $getHeaders(methodOptions?: any): any {
        const headers: any = {};
        headers["X-AUTH-TOKEN"] = this.authToken;
        headers["Content-Type"] = 'application/json';
        return headers;
    }

}

