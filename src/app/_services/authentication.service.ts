import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface loginData{
    statusMsg:String,
    user:{
        uid:String,
        user_type_id:Number
    },
    token:String
}

interface vali{
    statResponse:boolean
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    hostUrl = environment.apiUrl;

    constructor(private http: HttpClient) {

    }

    
    get getLoginToken(){
        return localStorage.getItem('FRLS').toString();
    }

    get getLoginTokenID(){
        return localStorage.getItem('FRLS-D').toString();
    }

    get getLoginTokenType(){
        return localStorage.getItem('FRLS-T').toString();
    }

    setToken(){
        if(localStorage.getItem('FRLS')==null){
            localStorage.setItem('FRLS', '');
        }
        if(localStorage.getItem('pid')==null){
            localStorage.setItem('pid', '');
        }
    }

    setLoginToken(token, uid, usertype){
        localStorage.setItem('FRLS', token);
        localStorage.setItem('FRLS-D', uid);
        localStorage.setItem('FRLS-T', usertype);
    }

    //login method
    login(email, password){
        
        return this.http.post<loginData>(this.hostUrl+'/api/login', {email, password}, {observe: 'response'});    
        
    }

    //for checking validility of token before entering any route
    testLoginValidity(){
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'responseType': 'json',
            'Foan-Token': localStorage.getItem('FRLS').toString()
        });
        
        return this.http.get<vali>(this.hostUrl+'/api/ping', {headers: headers, observe: 'response'});
        
    }

    //registration method
    register(){

    }


    

    
}