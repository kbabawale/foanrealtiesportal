import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InvoiceService } from '../_services/invoice.service';

@Component({
    selector: 'app-adminsinglereceipt',
    templateUrl: './adminSingleReceipt.component.html'
})

export class AdminSingleReceiptComponent implements OnInit {
    iid:any;
    receipt:any;
    constructor(private route: ActivatedRoute,
                private http:HttpClient,
                private invoiceService: InvoiceService){

    }

    ngOnInit() {
        this.iid = this.route.snapshot.paramMap.get('reid');
        this.invoiceService.loadReceipt(this.iid).subscribe(data=>{
            if(data.status==200){
                this.receipt = data.body.receipt[0];
            }
        });
    }
    
}