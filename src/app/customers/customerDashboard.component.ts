import { Component, OnInit, OnDestroy } from "@angular/core";
import { LandService } from '../_services/land.service';
import { PurchasesService } from '../_services/purchases.service';
import { UserService } from '../_services/user.service';


@Component({
    selector: 'app-customerDashboard',
    templateUrl: './customerDashboard.component.html'
})

export class CustomerDashboardComponent implements OnInit, OnDestroy {
   
    properties:any;
    my_properties:any;
    realtors:any;
    properties_count:any = 0;
    my_properties_count:any = 0;
    realtors_count:any = 0;
    topRealtors:any;

    constructor(
        private userservice: UserService,
       private landservice:LandService,
       private purchseservice:PurchasesService
    ) {
        
    }

    ngOnInit() {
        //get count of all properties
        this.landservice.loadProperties().subscribe(data=>{
            if(data.status==200){
                this.properties = data.body.property;
                var t = this.properties;
                this.properties_count = t.length;
            }
        });

        this.userservice.loadTopRealtors().subscribe(data=>{
            if(data.status==200)
                this.topRealtors = data.body.top_realtors;
        });

        //get customer properties
        this.purchseservice.loadCustomerPurchases(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
            if(data.status==200){
                this.my_properties = data.body.purchased_properties;
                //console.log(this.my_properties);
                var t = this.my_properties;
                this.my_properties_count = t.length;
            }
        });

        //get count of all realtors
        this.userservice.loadRealtors().subscribe(data=>{
            if(data.status==200){
                this.realtors = data.body.user;
                var t = this.realtors;
                this.realtors_count = t.length;
            }
        });
    }

    ngOnDestroy() {
       
    }

    
    
}
