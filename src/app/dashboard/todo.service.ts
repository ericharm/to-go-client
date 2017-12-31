import { Injectable } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, IResourceMethod, ResourceHandler } from '@ngx-resource/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
@ResourceParams({
    url: environment.apiUrl,
    pathPrefix: 'todos'
})
export class TodoResource extends Resource {

    authToken: string

    @ResourceAction({
        // IResourceAction
        isArray: true,
        path: '/'
    })
    index: IResourceMethod<any, any>;

    constructor(restHandler: ResourceHandler, auth: AuthService) {
        super(restHandler);
        this.authToken = auth.authToken;
    }

    $getHeaders(methodOptions?: any): any {
        const headers: any = {};
        headers["X-AUTH-TOKEN"] = this.authToken;
        headers["Content-Type"] = 'application/json';
        return headers;
    }

}

