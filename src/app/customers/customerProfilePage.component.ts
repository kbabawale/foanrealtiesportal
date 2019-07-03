import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap, RouterEvent, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';


@Component({
    selector:'app-customerprofilepage',
    templateUrl: './customerProfilePage.component.html'
})

export class CustomerProfilePageComponent implements OnInit{
    cid: any;
    customers:any;
    
    constructor(private route: ActivatedRoute,
        private http:HttpClient,
        private CustomerService:UserService,
        private Router: Router){

    }

    ngOnInit(): void {
        
        this.cid = localStorage.getItem('FRLS-D').toString();
        this.CustomerService.loadCustomer(this.cid).subscribe(data=>{
            if(data.status == 200){
              this.customers = data.body.user[0];
               console.log(this.customers);
            }
        });
    }
}