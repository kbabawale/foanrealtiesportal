import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface myPurchases{
  purchased_properties:any
}

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  //load all properties
  loadPurchases(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<myPurchases>(this.hostUrl+'/api/purchases/all', {},{headers: headers, observe: 'response'});
    
  }

  //load all properties
  loadCustomerPurchases(cid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<myPurchases>(this.hostUrl+'/api/purchases/customer/all', {"cid":cid},{headers: headers, observe: 'response'});
    
  }

  //change status of a purchase
  changePurchase(status,pbid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/property/buy/status/update', {"status":status, "pbid":pbid},{headers: headers, observe: 'response'});
    
  }
}
