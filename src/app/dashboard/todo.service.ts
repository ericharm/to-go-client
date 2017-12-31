import { Injectable } from '@angular/core';
import { ResourceParams, ResourceAction, IResourceMethod, ResourceHandler } from '@ngx-resource/core';
import { AuthResource } from '../auth/auth.resource';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Todo } from './todo';

@Injectable()
@ResourceParams({
    url: environment.apiUrl,
    pathPrefix: 'todos'
})
export class TodoResource extends AuthResource {

    @ResourceAction({
        isArray: true,
        path: '/'
    })
    index: IResourceMethod<void, Todo[]>;

    constructor(restHandler: ResourceHandler, auth: AuthService) {
        super(restHandler, auth);
    }

}

