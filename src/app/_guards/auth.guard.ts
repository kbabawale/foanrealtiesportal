import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthenticationService,
              private userService:UserService,
              private router: Router){
                
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    //if login validity is invalid, redirect to login page
    //debugger
    return this.auth.testLoginValidity().pipe(map(valis=>{
      let vali = valis.body.statResponse;
      if(vali){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }
  
}
