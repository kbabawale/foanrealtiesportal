import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Purchase } from '../_models/purchase';
import 'rxjs/add/operator/do';
import { Customer } from '../_models/customer';
import { Idcard } from '../_models/idcard';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    baseUrl = environment.apiUrl;

    public currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    // Purchase Services    
    getAllPurchases(): Observable<Purchase> {
        let data = this.http.get<Purchase>(this.baseUrl + 'assets/json/purchase.json');
        return data;
    }

    // Customer Services    
    getAllCustomers(): Observable<Customer> {
        let data = this.http.get<Customer>(this.baseUrl + 'assets/json/customer.json');
        return data;
    }

    // Icard Services    
    getAllIdcards(): Observable<Idcard> {
        let data = this.http.get<Idcard>(this.baseUrl + 'assets/json/idcard.json');
        return data;
    }
}


// .do(data => console.log(JSON.stringify(data)));
