import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import 'rxjs/add/operator/do';
import { PaymentHistory } from '../_models/paymenthistory';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
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


    // paymenthistory Services    
    getAllPaymentHistorys(): Observable<PaymentHistory> {
        let data = this.http.get<PaymentHistory>(this.baseUrl + 'assets/json/paymenthistory.json');
        return data;
    }
}


// .do(data => console.log(JSON.stringify(data)));
