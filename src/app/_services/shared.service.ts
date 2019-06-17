import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import 'rxjs/add/operator/do';
import { Invoice } from '../_models/invoice';
import { Agreement } from '../_models/agreement';
import { Commission } from '../_models/commission';
import { Receipt } from '../_models/receipt';
import { Realtor } from '../_models/realtor';
import { Land } from '../_models/land';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    getAllInspectionLists() {
        throw new Error("Method not implemented.");
    }
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


    // Invoice Services    
    getAllInvoices(): Observable<Invoice> {
        let data = this.http.get<Invoice>(this.baseUrl + 'assets/json/invoice.json');
        return data;
    }

    //Agreement Service
    getAllAgreements(): Observable<Agreement> {
        let data = this.http.get<Agreement>(this.baseUrl + 'assets/json/agreement.json');
        return data;
    }

    //Commission Service
    getAllCommissions(): Observable<Commission> {
        let data = this.http.get<Commission>(this.baseUrl + 'assets/json/commission.json');
        return data;
    }

    //Receipt Service
    getAllReceipts(): Observable<Receipt> {
        let data = this.http.get<Receipt>(this.baseUrl + 'assets/json/receipt.json');
        return data;
    }

    // Realtor Services    
    getAllRealtors(): Observable<Realtor> {
        let data = this.http.get<Realtor>(this.baseUrl + 'assets/json/realtor.json');
        return data;
    }

    // Land Services    
    getAllLands(): Observable<Land> {
        let data = this.http.get<Land>(this.baseUrl + 'assets/json/land.json');
        return data;
    }
}


// .do(data => console.log(JSON.stringify(data)));
