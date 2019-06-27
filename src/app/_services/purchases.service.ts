import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface myPurchases{
  purchased_properties:any
}

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private http: HttpClient) { }

  //load all properties
  loadPurchases(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myPurchases>('/api/purchases/all', {},{headers: headers, observe: 'response'});
  }

  //change status of a purchase
  changePurchase(status,pbid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post('/api/property/buy/status/update', {"status":status, "pbid":pbid},{headers: headers, observe: 'response'});
  }
}
