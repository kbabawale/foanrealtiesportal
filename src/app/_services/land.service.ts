import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  //addLandInfo
  addLandInfo(name,plot_size,price,no_of_plots,description){
        
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'json',
        'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<landInfo>(this.hostUrl+'/api/property/land-info/add', {"name":name,
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
    return this.http.post(this.hostUrl+'/api/property/location/add', {"address":address,
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
    return this.http.post(this.hostUrl+'/api/property/facilities/add', {"facilities":fac,
  "pid":pid},{headers: headers, observe: 'response'});
  
  }

  addLandPaymentPlan(square_meters,outright_plan,initial_deposit,three_months_plan,six_months_plan,twelve_months_plan,eighteen_months_plan,twentyfour_months_plan,pid){
        
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'json',
        'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<myPP>(this.hostUrl+'/api/property/payment-plan/add', {"square_meters":square_meters,
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
    return this.http.post<myStates>(this.hostUrl+'/api/state/all', {},{headers: headers, observe: 'response'});
  }

  //load facilities
  loadFacilities(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
  });
    return this.http.post<myFacilities>(this.hostUrl+'/api/property/facilities/db/all', {},{headers: headers, observe: 'response'});
  
  }

  //load payment plan
  loadPaymentPlan(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
  });
    return this.http.post<myPPP>(this.hostUrl+'/api/property/payment-plan/all', {"pid":localStorage.getItem('pid').toString()},{headers: headers, observe: 'response'});
  
  }

  //load all properties
  loadProperties(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<myProperty>(this.hostUrl+'/api/property/all', {},{headers: headers, observe: 'response'});
    
  }

  //load a property
  loadProperty(pid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<myProperty>(this.hostUrl+'/api/property/all', {"pid":pid},{headers: headers, observe: 'response'});
    
  }

  downloadFile(filename, pid):Observable<any>{
    let headers = new HttpHeaders({
      'responseType': 'blob',
      'Content-Type': 'application/json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/download', {"filename":filename, "pid":pid},{headers: headers});
    
  }

  //addLandRealtor
  addLandRealtor(pid, rid){
        
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'json',
        'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/property/realtors/add', {"pid":pid,
    "rid":rid},{headers: headers, observe: 'response'});
    
  }

  //unassignRealtor
  unassignRealtor(pid, rid){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
  });
    return this.http.post(this.hostUrl+'/api/property/realtors/delete', {"pid":pid, "rid":rid}, {headers:headers, observe:'response'});
    
  }
}
