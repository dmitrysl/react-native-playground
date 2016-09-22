import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 
import { User } from '../_models/index';
import { UserService } from '../services/index';
import { AuthenticationService } from '../services/index';

 
@Component({
    // moduleId: module.id,
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent implements OnInit {
    users: User[] = [];
 
    constructor(private userService: UserService,
        public http: Http, 
        public authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
 
    getPokemonInfo() {
        let headers = new Headers({ 'X-ACCESS-TOKEN': this.authenticationService.token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/pokemon/pockedex', options)
            .map((response: Response) => response.json())
            .subscribe(result => {
                console.log(result);
            });
    }

    getPokemonInfo1() {
        let headers = new Headers({ 'X-ACCESS-TOKEN': this.authenticationService.token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/pokemon/25/info', options)
            .map((response: Response) => response.json())
            .subscribe(result => {
                console.log(result);
            });
    }

    getPokemonInfo2() {
        let headers = new Headers({ 'X-ACCESS-TOKEN': this.authenticationService.token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/pokemon/25/image', options)
            .subscribe(result => {
                console.log(result);
            });
    }
}