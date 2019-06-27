import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InvoiceService } from '../_services/invoice.service';

@Component({
    selector: 'app-adminsingleinvoice',
    templateUrl: './adminSingleInvoice.component.html'
})

export class AdminSingleInvoiceComponent implements OnInit {
    iid:any;
    invoice:any;
    constructor(private route: ActivatedRoute,
                private http:HttpClient,
                private invoiceService: InvoiceService){

    }

    ngOnInit() {
        this.iid = this.route.snapshot.paramMap.get('invid');
        this.invoiceService.loadInvoice(this.iid).subscribe(data=>{
            if(data.status==200){
                this.invoice = data.body.invoices[0];
            }
        });
    }
    
}