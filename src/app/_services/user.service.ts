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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,
              private auth: AuthenticationService) { }

  //fetch logged in user's details            
  getUserDetails(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Foan-Token': localStorage.getItem('FRLS').toString()
  });
    return this.http.post<UserAll>('/api/user/admin/all', {uid: localStorage.getItem('FRLS-D').toString()}, {headers: headers});
  }
}
