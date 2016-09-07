import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 

@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username, password): Observable<Object> {
        console.warn(arguments)
        return this.http.post('/api/auth/login', { login: username, pass: password }) //JSON.stringify()
            .map((response: Response) => {
                console.warn(response)
                let data = response.json();
                if (!data || !data.success) {
                    alert(data.message);
                    return { success: false };
                }
                // login successful if there's a jwt token in the response
                let token = data.token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return data;
                } else {
                    // return false to indicate failed login
                    return data;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}