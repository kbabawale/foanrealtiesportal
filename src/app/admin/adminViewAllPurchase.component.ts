import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { InvoiceService } from '../_services/invoice.service';
import { FormBuilder,FormGroup, FormControl,Validators } from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';
import { PurchasesService } from '../_services/purchases.service';

@Component({
    selector: 'app-adminviewallpurchase',
    templateUrl: './adminViewAllPurchase.component.html'
})

export class AdminViewAllPurchaseComponent implements OnInit {
    customers:any;
    addInvoice:FormGroup;
    landinfosubmitted: String = 'done';
    purchases:any;
    typedTerm:any;

    constructor(
        private userService:UserService,
        private invoiceService:InvoiceService,
        private formBuilder:FormBuilder,
        private purchasesService: PurchasesService
        
    ) {
        
    }

    ngOnInit(){
        this.purchasesService.loadPurchases().subscribe(data=>{
            this.purchases = data.body.purchased_properties;
        });
    }
}