import { Component, OnInit } from "@angular/core";
import { PurchasesService } from '../_services/purchases.service';

@Component({
    selector: 'app-customermylands',
    templateUrl: './customerMyLands.component.html'
})

export class CustomerMyLandsComponent implements OnInit {
   purchases:any;
   searchText:any = 'My Properties';
   constructor(private purchasesService:PurchasesService){

   }

   ngOnInit(): void {

    this.purchasesService.loadCustomerPurchases(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
        if(data.status==200){
            this.purchases = data.body.purchased_properties;
            console.log(this.purchases);
        }
    });
       
   }

}