import { Component, OnInit } from "@angular/core";
import { UserService } from '../_services/user.service';
import { InvoiceService } from '../_services/invoice.service';
import { FormBuilder,FormGroup, FormControl,Validators } from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-viewallcustomer',
    templateUrl: './adminViewAllCustomer.component.html'
})

export class AdminViewAllCustomerComponent implements OnInit {
    customers:any;
    typedTerm:any;

    constructor(
        private UserService: UserService
    ) {
        
    }

    ngOnInit() {
        this.UserService.loadCustomers().subscribe(data=>{
            this.customers = data.body.user;
            //console.log(this.customers);
        });
    }
}