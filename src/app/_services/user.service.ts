import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { add } from 'ngx-bootstrap/chronos/public_api';

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

interface AddUser{
  status:any,
  users:any
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
  hostUrl = environment.apiUrl;
  constructor(private http:HttpClient,
              private auth: AuthenticationService) { }

  

  //fetch logged in user's details            
  getUserDetails(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/user/admin/all', {uid: localStorage.getItem('FRLS-D').toString()}, {headers: headers});
  }

  //fetch logged in user's details            
  getUserDetails2(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/user/realtor/all', {uid: localStorage.getItem('FRLS-D').toString()}, {headers: headers});
  }

  //fetch logged in user's details            
  getUserDetails3(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/user/customer/all', {uid: localStorage.getItem('FRLS-D').toString()}, {headers: headers});
  }

  getAdmins(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/user/admin/all', {}, {headers: headers});
    
    
  }

  getAdmin(uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/user/admin/all', {"uid":uid}, {headers: headers});
    
    
  }

  //load realtors
  loadRealtors(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/user/realtor/all', {},{headers: headers, observe: 'response'});  
    
  }

  //load realtor
  loadRealtor(uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/user/realtor/all', {"uid":uid},{headers: headers, observe: 'response'});
    
  }

  
  loadDownlines(uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<Downlines>(this.hostUrl+'/api/realtor/downline/all', {"rid":uid},{headers: headers, observe: 'response'});
    
  }

  //load customers
  loadCustomers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/user/customer/all', {},{headers: headers, observe: 'response'});
    
  }

  //load customer
  loadCustomer(uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/user/customer/all', {"uid":uid},{headers: headers, observe: 'response'});
    
  }

  changeStatus(status,uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/user/delete', {"action":status, "uid":uid},{headers: headers, observe: 'response'});
    
  };

  loadNationalities(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<Country>(this.hostUrl+'/api/country/all', {},{headers: headers, observe: 'response'});
    
  }

  addUser(firstname,lastname,email,phone_number,password,user_type_id,nationality=null,date_of_birth=null,marital_status=null,address=null,role_id=null){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<AddUser>(this.hostUrl+'/api/register', {
        "firstname":firstname,"lastname":lastname,"phone_number":phone_number,"email":email,"role_id":role_id,"password":password,"user_type_id":user_type_id,"nationality_id":nationality,"date_of_birth":date_of_birth,"marital_status":marital_status,"address":address
      },{headers: headers, observe: 'response'});
    
  }

  updateCustomerEmployment(employer,designation,address,phone_number,cid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/customer/info/update', {
        "cid":cid,"employer":employer,"emp_phone_number":phone_number,"emp_designation":designation,"emp_address":address
      },{headers: headers, observe: 'response'});
  }

  updateCustomerNextOfKin(name,email,address,phone_number,cid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/customer/info/update', {
        "cid":cid,"nk_name":name,"nk_phone_number":phone_number,"nk_email":email,"nk_address":address
      },{headers: headers, observe: 'response'});
  }

  updateCustomerReferral(name,email,phone_number,cid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/customer/referral/update', {
        "cid":cid,"name":name,"phone_number":phone_number,"email":email
      },{headers: headers, observe: 'response'});
  }

  

  editUser(firstname,lastname,email,phone_number,country_id,marital_status,date_of_birth,address,uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/user/update', {
        "firstname":firstname,"lastname":lastname,"phone_number":phone_number,"email":email,"country_id":country_id,"marital_status":marital_status,"date_of_birth":date_of_birth,"address":address,"uid":uid
      },{headers: headers, observe: 'response'});
    
  }

  editUser2(firstname,lastname,email,phone_number,role_id,uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/user/update', {
        "firstname":firstname,"lastname":lastname,"phone_number":phone_number,"email":email,"role_id":role_id,"uid":uid
      },{headers: headers, observe: 'response'});
    
  }

  editRealtorReferral(name,phone_number,email,rid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/realtor/referral/update', {
        "name":name,"phone_number":phone_number,"email":email,"rid":rid
      },{headers: headers, observe: 'response'});
  }

  editRealtorNextOfKin(name,address,phone_number,email,rid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/realtor/info/update', {
        "name":name,"phone_number":phone_number,"email":email,"rid":rid,"address":address
      },{headers: headers, observe: 'response'});
  }

  changePassword(newpassword, uid){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post(this.hostUrl+'/api/user/password/change', {
        "newpassword":newpassword,"uid":uid
      },{headers: headers, observe: 'response'});
    
  }

  loadRoles(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<myRoles>(this.hostUrl+'/api/role/all', {},{headers: headers, observe: 'response'});
    
  }

  loadTopRealtors(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<myTRealtors>(this.hostUrl+'/api/realtor/top-performance', {},{headers: headers, observe: 'response'});
    
  }

  getStatPurchases(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<myProperty>(this.hostUrl+'/api/property/stats/purchases', {},{headers: headers, observe: 'response'});
    
  }

  getNewCustomers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/property/stats/customers/new', {},{headers: headers, observe: 'response'});
    
  }

  getTopCustomers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<UserAll>(this.hostUrl+'/api/property/stats/customers/top', {},{headers: headers, observe: 'response'});
    
  }

  getGeneralStats(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
    });
      return this.http.post<GenStat>(this.hostUrl+'/api/property/stats/general', {},{headers: headers, observe: 'response'});
    
  }
}
