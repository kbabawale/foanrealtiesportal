import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder } from '@angular/forms';
import { InvoiceService } from 'src/app/_services/invoice.service';


@Component ({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html'
})

export class InvoiceComponent implements OnInit, OnChanges {
    invoices:any;
    invoices2:any;
    tempInvoices:any;
    @Input() searchTerm:any;
    searched:Boolean = false;
    
    constructor(
        private invoiceService: InvoiceService
    ) {
        
    }
    
    ngOnChanges(){
        this.searched = true;
        //filter array based on invoice number or description
        if(this.searchTerm != ''){
            if(this.searched){
                this.tempInvoices = [];
                //use new array values
                this.invoices = [];
                this.invoices = this.invoices2;
                this.invoices.forEach((item,index)=>{
                    
                    if ((item.invoice_number !== undefined && typeof(item.invoice_number) === 'string' && item.invoice_number.indexOf(this.searchTerm) > -1) || (item.description !== undefined && typeof(item.description) === 'string' && item.description.indexOf(this.searchTerm) > -1)) {
                        this.tempInvoices.push(item);
                    } 
                    
                });

                this.invoices = this.tempInvoices;
            }else{
                this.tempInvoices = [];
                //use new array values
                this.invoices.forEach((item,index)=>{
                    
                    if ((item.invoice_number !== undefined && typeof(item.invoice_number) === 'string' && item.invoice_number.indexOf(this.searchTerm) > -1) || (item.description !== undefined && typeof(item.description) === 'string' && item.description.indexOf(this.searchTerm) > -1)) {
                        this.tempInvoices.push(item);
                    } 
                    
                });

                this.invoices = this.tempInvoices;
            }
            
        }else{
            //use original array values
            this.invoiceService.loadInvoices().subscribe(data=>{
                if(data.status == 200){
                    this.invoices = data.body.invoices;
                    this.invoices2 = data.body.invoices;
                }
            });
        }
    }

    ngOnInit() {
        
        this.invoiceService.loadInvoices().subscribe(data=>{
            if(data.status == 200){
                this.invoices = data.body.invoices;
                this.invoices2 = data.body.invoices;
            }
        });
    }
    
}