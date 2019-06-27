import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder } from '@angular/forms';
import { PurchasesService } from 'src/app/_services/purchases.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  purchases:any;
  purchases2:any;
  tempPurchases:any;
  @Input() searchTerm:any;
  searched:Boolean = false;
  changedStat: Boolean = false;

  constructor(private purchaseService: PurchasesService) { }

  ngOnInit() {
    this.purchaseService.loadPurchases().subscribe(data=>{
      if(data.status == 200){
        //convert date
          this.purchases = data.body.purchased_properties;
          this.purchases2 = data.body.purchased_properties;
          
      }
  });
  }

  changeStatus(status, pbid){
    var newStat = status == 'Unapproved'?'Approved':'Unapproved';
    this.purchaseService.changePurchase(newStat, pbid).subscribe(data=>{
      if(data.status === 200){
          this.changedStat = true;
          
          setTimeout(()=>{
              this.changedStat = false
              this.ngOnInit();
            }, 2000
          );
      }
    });
  }

  ngOnChanges(){
    this.searched = true;
    //filter array based on invoice number or description
    if(this.searchTerm != ''){
        if(this.searched){
            this.tempPurchases = [];
            //use new array values
            this.purchases = [];
            this.purchases = this.purchases2;
            this.purchases.forEach((item,index)=>{
                
                if ((item.purchases_details.status !== undefined && typeof(item.purchases_details.status) === 'string' && item.purchases_details.status.indexOf(this.searchTerm) > -1) || 
                (item.land_info[0].name !== undefined && typeof(item.land_info[0].name) === 'string' && item.land_info[0].name.indexOf(this.searchTerm) > -1) ||
                (item.purchases_details.customer_name !== undefined && typeof(item.purchases_details.customer_name) === 'string' && item.purchases_details.customer_name.indexOf(this.searchTerm) > -1) || 
                (item.purchases_details.createdAt !== undefined && typeof(item.purchases_details.createdAt) === 'string' && item.purchases_details.createdAt.indexOf(this.searchTerm) > -1)) {
                    this.tempPurchases.push(item);
                } 
                
            });

            this.purchases = this.tempPurchases;
        }else{
            this.tempPurchases = [];
            //use new array values
            this.purchases.forEach((item,index)=>{
                
              if ((item.purchases_details.status !== undefined && typeof(item.purchases_details.status) === 'string' && item.purchases_details.status.indexOf(this.searchTerm) > -1) || 
              (item.land_info[0].name !== undefined && typeof(item.land_info[0].name) === 'string' && item.land_info[0].name.indexOf(this.searchTerm) > -1) ||
              (item.purchases_details.customer_name !== undefined && typeof(item.purchases_details.customer_name) === 'string' && item.purchases_details.customer_name.indexOf(this.searchTerm) > -1) || 
              (item.purchases_details.createdAt !== undefined && typeof(item.purchases_details.createdAt) === 'string' && item.purchases_details.createdAt.indexOf(this.searchTerm) > -1)) {
                  this.tempPurchases.push(item);
              } 
            });

            this.purchases = this.tempPurchases;
        }
        
    }else{
        //use original array values
        this.purchaseService.loadPurchases().subscribe(data=>{
            if(data.status == 200){
                this.purchases = data.body.purchased_properties;
                this.purchases2 = data.body.purchased_properties;
            }
        });
    }
}

}
