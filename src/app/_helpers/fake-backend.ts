import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.Email === request.body.Email && user.Password === request.body.Password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt AcessToken
                    let user = filteredUsers[0];
                    let body = {
                        UserID: user.UserID,
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        Email: user.Email,
                        UserRole: user.UserRole,
                        Password: user.Password,
                        AcessToken: 'fake-jwt-AcessToken'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Email or Password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth AcessToken in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-AcessToken') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if AcessToken is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth AcessToken in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-AcessToken') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let UserID = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.UserID === UserID; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if AcessToken is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.Email === newUser.Email; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Email "' + newUser.Email + '" is already taken' } });
                }

                // save new user
                newUser.UserID = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth AcessToken in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-AcessToken') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let UserID = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.UserID === UserID) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if AcessToken is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};