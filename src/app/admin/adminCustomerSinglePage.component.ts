import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';


@Component({
    selector: 'app-admincustomersinglepage',
    templateUrl: './adminCustomerSinglePage.component.html'
})

export class AdminCustomerSinglePageComponent implements OnInit {
    cid: any;
    customers:any;
    constructor(private route: ActivatedRoute,
        private http:HttpClient,
        private CustomerService:UserService){

    }

    ngOnInit(){
        this.cid = this.route.snapshot.paramMap.get('cid');
        this.CustomerService.loadCustomer(this.cid).subscribe(data=>{
            if(data.status == 200){
              this.customers = data.body.user[0];
              //console.log(this.customers.referrals[0].name);
            }
        });
    }
}