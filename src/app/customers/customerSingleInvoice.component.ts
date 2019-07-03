import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InvoiceService } from '../_services/invoice.service';

@Component({
    selector: 'app-customersingleinvoice',
    templateUrl: './customerSingleInvoice.component.html'
})

export class CustomerSingleInvoiceComponent implements OnInit {
    iid:any;
    invoice:any;
    constructor(private route: ActivatedRoute,
                private http:HttpClient,
                private invoiceService: InvoiceService){

    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.iid = this.route.snapshot.paramMap.get('invid');
        this.invoiceService.loadInvoice(this.iid).subscribe(data=>{
            if(data.status==200){
                this.invoice = data.body.invoices[0];
            }
        });
    }
}