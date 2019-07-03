import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PurchasesService } from '../_services/purchases.service';


@Component({
    selector: 'app-customerpaymenthistory',
    templateUrl: './customerPaymentHistory.component.html'
})

export class CustomerPaymentHistoryComponent implements OnInit{
    history:any;
    constructor(
        private purchaseService: PurchasesService,
        private formBuilder: FormBuilder,
        
    ) {
        
    }

    ngOnInit(): void {
        this.purchaseService.loadCustomerPaymentHistory(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
            if(data.status==200){
                this.history = data.body.history;
                // console.log(this.history);
            }
        });

        
    }
}