import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { PurchasesService } from '../_services/purchases.service';

@Component({
    selector: 'app-realtorcustomersinglepage',
    templateUrl: './realtorCustomerSinglePage.component.html'
})

export class RealtorCustomerSinglePageComponent implements OnInit {
    cid: any;
    customers:any;
    purchases: any;

    constructor(private route: ActivatedRoute,
        private http:HttpClient,
        private CustomerService:UserService,
        private purchaseService: PurchasesService){

    }

    ngOnInit(){
        this.cid = this.route.snapshot.paramMap.get('cid');
        this.CustomerService.loadCustomer(this.cid).subscribe(data=>{
            if(data.status == 200){
              this.customers = data.body.user[0];
              
            }
        });
        this.purchaseService.loadCustomerPurchases(this.cid).subscribe(data=>{
            if(data.status == 200){
                this.purchases = data.body.purchased_properties;
                console.log(this.purchases);
            }
        });
    }
}