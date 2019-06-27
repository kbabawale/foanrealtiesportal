import { Component, OnInit } from "@angular/core";
import { UserService } from '../_services/user.service';
import { InvoiceService } from '../_services/invoice.service';
import { FormBuilder,FormGroup, FormControl,Validators } from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';
import { LandService } from '../_services/land.service';

@Component({
    selector: 'app-adminInvoice',
    templateUrl: './adminInvoice.component.html'
})

export class AdminInvoiceComponent {
    customers:any;
    addInvoice:FormGroup;
    landinfosubmitted: String = 'done';
    property:any;
    typedTerm:any;

    constructor(private userService:UserService,
        private invoiceService:InvoiceService,
        private formBuilder:FormBuilder,
        private landservice: LandService){


        this.addInvoice = this.formBuilder.group({
            customer: [null, Validators.required],
            due_date: ['', Validators.required],
            description: ['', Validators.required],
            quantity: ['1', Validators.required],
            price: ['', Validators.required],
            terms: ['', Validators.required],
            pid: [null, Validators.required]
        });
    }

    ngOnInit(){
        this.userService.loadCustomers().subscribe(data=>{
            this.customers = data.body.user;
        });

        this.landservice.loadProperties().subscribe(data=>{
            this.property = data.body.property;
        });
    }

    get g() { return this.addInvoice.controls; }

    onISubmit(){
        this.invoiceService.addInvoice(this.g.customer.value, this.g.due_date.value, this.g.description.value, this.g.quantity.value, this.g.price.value, this.g.terms.value, this.g.pid.value)
            .subscribe(
                data => {
                    if(data.status == 200){
                        
                        this.landinfosubmitted = 'true';

                        //reset the form
                        setTimeout(()=>{
                            this.addInvoice.reset();
                            this.landinfosubmitted = 'done';
                            location.reload();
                        }, 5000);
                        
                        
                    }else{
                        this.landinfosubmitted = 'false';
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.landinfosubmitted = 'false';
                    }
                }
            );
    }
    
}