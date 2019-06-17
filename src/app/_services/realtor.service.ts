import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import 'rxjs/add/operator/do';
import { InspectionList } from '../_models/inspectionlist';
import { Downline } from '../_models/downline';

@Injectable({
    providedIn: 'root'
})
export class RealtorService {
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


    // InspectionList Services    
    getAllInspectionLists(): Observable<InspectionList> {
        let data = this.http.get<InspectionList>(this.baseUrl + 'assets/json/inspectionlist.json');
        return data;
    }

    // Downline Services    
    getAllDownlines(): Observable<Downline> {
        let data = this.http.get<Downline>(this.baseUrl + 'assets/json/downline.json');
        return data;
    }
}


// .do(data => console.log(JSON.stringify(data)));
