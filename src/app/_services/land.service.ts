import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface myStates{
  state:any
}

interface myFacilities{
  //facilities: {name:String, fid:String}[];
  facilities:any
}

interface landInfo{
  statusMsg,
  land_info: {
    'pid'
  }
}

interface myPP{
  pid:String,
  square_meters:String,
  outright_plan:String,
  initial_deposit:String,
  three_months_plan:String,
  six_months_plan:String,
  twelve_months_plan:String,
  eighteen_months_plan:String,
  twentyfour_months_plan:String
}

interface myPPP{
  plans:any
}

interface myProperty{
  property:any;
}

@Injectable({
  providedIn: 'root'
})
export class LandService {

  constructor(private http: HttpClient) { }

  //addLandInfo
  addLandInfo(name,plot_size,price,no_of_plots,description){
        
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'json',
        'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<landInfo>('/api/property/land-info/add', {"name":name,
    "plot_size":plot_size,
    "price":price,
    "no_of_plots":no_of_plots,
    "description":description},{headers: headers, observe: 'response'});
    
  }

  addLandLocation(address,state,local_govt,city,pid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
  });
  return this.http.post('/api/property/location/add', {"address":address,
  "state_id":state,
  "local_govt":local_govt,
  "city":city,
  "pid":pid},{headers: headers, observe: 'response'});
  }

  addLandFacilities(fac,pid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
  });
  return this.http.post('/api/property/facilities/add', {"facilities":fac,
  "pid":pid},{headers: headers, observe: 'response'});
  }

  addLandPaymentPlan(square_meters,outright_plan,initial_deposit,three_months_plan,six_months_plan,twelve_months_plan,eighteen_months_plan,twentyfour_months_plan,pid){
        
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'json',
        'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myPP>('/api/property/payment-plan/add', {"square_meters":square_meters,
    "outright_plan":outright_plan,
    "initial_deposit":initial_deposit,
    "three_months_plan":three_months_plan,
    "six_months_plan":six_months_plan,
    "twelve_months_plan":twelve_months_plan,
    "eighteen_months_plan":eighteen_months_plan,
    "twentyfour_months_plan":twentyfour_months_plan,
    "pid":pid},{headers: headers, observe: 'response'});
    
  }

  //load states
  loadStates(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
  });
  return this.http.post<myStates>('/api/state/all', {},{headers: headers, observe: 'response'});
  }

  //load facilities
  loadFacilities(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
  });
  return this.http.post<myFacilities>('/api/property/facilities/db/all', {},{headers: headers, observe: 'response'});
  }

  //load payment plan
  loadPaymentPlan(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
  });
  return this.http.post<myPPP>('/api/property/payment-plan/all', {"pid":localStorage.getItem('pid').toString()},{headers: headers, observe: 'response'});
  }

  //load all properties
  loadProperties(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myProperty>('/api/property/all', {},{headers: headers, observe: 'response'});
  }

  //load a property
  loadProperty(pid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myProperty>('/api/property/all', {"pid":pid},{headers: headers, observe: 'response'});
  }
}