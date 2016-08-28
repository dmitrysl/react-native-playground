import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 
import { AuthenticationService } from '../services/index';
import { User } from '../_models/index';

 
@Injectable()
export class UserService {
    private token: string;
 
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'X-ACCESS-TOKEN': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }
}