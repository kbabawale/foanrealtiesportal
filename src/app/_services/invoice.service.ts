import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface myInvoices{
  invoices:any
}

interface myReceipts{
  receipt:any
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  loadInvoices(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myInvoices>('/api/invoice/all', {},{headers: headers, observe: 'response'});
  }

  loadInvoice(iid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myInvoices>('/api/invoice/all', {"iid":iid},{headers: headers, observe: 'response'});
  }

  loadReceipts(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myReceipts>('/api/receipt/all', {},{headers: headers, observe: 'response'});
  }

  loadReceipt(reid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myReceipts>('/api/receipt/all', {"reid":reid},{headers: headers, observe: 'response'});
  }

  addInvoice(cid,due_date,description,quantity,price, terms, pid){
        
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'json',
        'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post('/api/invoice/add', {"cid":cid,
    "due_date":due_date,
    "price":price,
    "description":description,
    "terms_and_condition":terms,
    "quantity":quantity,
    "pid":pid},{headers: headers, observe: 'response'});
    
  }

  addReceipt(cid,due_date,description,quantity,price, terms, pid){
        
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'json',
        'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post('/api/receipt/add', {"cid":cid,
    "due_date":due_date,
    "price":price,
    "description":description,
    "terms_and_condition":terms,
    "quantity":quantity,
    "pid":pid},{headers: headers, observe: 'response'});
    
  }
}