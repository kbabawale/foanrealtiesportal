import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

interface UserAll{
  user:[
    {
      'uid':String,
      'firstname':String,
      'lastname':String,
      'email':String,
      'phone_number':String,
      'user_type':String,
      'user_type_id':String,
      'role':String,
      'role_id':String,
      'date_of_birth':String,
      'address':String,
      'mailing_address':String,
      'status':String,
      'country':String,
      'country_id':String,
      'marital_status':String,
      'profile_pix_filename':String,
      'createdAt':String,
      'updatedAt':String
    }
  ]
}

interface Downlines{
  downlines:any
}

interface Country{
  country:any
}

interface myRoles{
  roles:any
}

interface myTRealtors{
  top_realtors:any
}

interface myProperty{
  purchased_properties:any
}

interface GenStat{
  customers:any,
  realtors:any,
  properties:any
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,
              private auth: AuthenticationService) { }

  sendVisitLog(browser,uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });
    return this.http.post('/api/log/visit/add', {
      "browser":browser,"uid":uid
    },{headers: headers, observe: 'response'});
  }

  //fetch logged in user's details            
  getUserDetails(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<UserAll>('/api/user/admin/all', {uid: localStorage.getItem('FRLS-D').toString()}, {headers: headers});
  }

  getAdmins(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<UserAll>('/api/user/admin/all', {}, {headers: headers});
  }

  getAdmin(uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<UserAll>('/api/user/admin/all', {"uid":uid}, {headers: headers});
  }

  //load realtors
  loadRealtors(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<UserAll>('/api/user/realtor/all', {},{headers: headers, observe: 'response'});
  }

  //load realtor
  loadRealtor(uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<UserAll>('/api/user/realtor/all', {"uid":uid},{headers: headers, observe: 'response'});
  }

  
  loadDownlines(uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<Downlines>('/api/realtor/downline/all', {"rid":uid},{headers: headers, observe: 'response'});
  }

  //load customers
  loadCustomers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<UserAll>('/api/user/customer/all', {},{headers: headers, observe: 'response'});
  }

  //load customer
  loadCustomer(uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<UserAll>('/api/user/customer/all', {"uid":uid},{headers: headers, observe: 'response'});
  }

  changeStatus(status,uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post('/api/user/delete', {"action":status, "uid":uid},{headers: headers, observe: 'response'});
  };

  loadNationalities(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<Country>('/api/country/all', {},{headers: headers, observe: 'response'});
  }

  addUser(firstname,lastname,email,phone_number,role_id,password,user_type_id,uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post('/api/register', {
      "firstname":firstname,"lastname":lastname,"phone_number":phone_number,"email":email,"role_id":role_id,"password":password,"user_type_id":user_type_id,"uid":uid
    },{headers: headers, observe: 'response'});
  }

  editUser(firstname,lastname,email,phone_number,country_id,marital_status,date_of_birth,address,uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post('/api/user/update', {
      "firstname":firstname,"lastname":lastname,"phone_number":phone_number,"email":email,"country_id":country_id,"marital_status":marital_status,"date_of_birth":date_of_birth,"address":address,"uid":uid
    },{headers: headers, observe: 'response'});
  }

  editUser2(firstname,lastname,email,phone_number,role_id,uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post('/api/user/update', {
      "firstname":firstname,"lastname":lastname,"phone_number":phone_number,"email":email,"role_id":role_id,"uid":uid
    },{headers: headers, observe: 'response'});
  }

  changePassword(newpassword, uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post('/api/user/password/change', {
      "newpassword":newpassword,"uid":uid
    },{headers: headers, observe: 'response'});
  }

  loadRoles(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myRoles>('/api/role/all', {},{headers: headers, observe: 'response'});
  }

  loadTopRealtors(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myTRealtors>('/api/realtor/top-performance', {},{headers: headers, observe: 'response'});
  }

  getStatPurchases(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<myProperty>('/api/property/stats/purchases', {},{headers: headers, observe: 'response'});
  }

  getNewCustomers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<UserAll>('/api/property/stats/customers/new', {},{headers: headers, observe: 'response'});
  }

  getTopCustomers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<UserAll>('/api/property/stats/customers/top', {},{headers: headers, observe: 'response'});
  }

  getGeneralStats(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
    return this.http.post<GenStat>('/api/property/stats/general', {},{headers: headers, observe: 'response'});
  }
}
