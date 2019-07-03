import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-invoice-customer',
  templateUrl: './invoice-customer.component.html',
  styleUrls: ['./invoice-customer.component.css']
})
export class InvoiceCustomerComponent implements OnInit {
  invoices:any='';

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceService.loadCustomerInvoices(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
      if(data.status == 200){
          this.invoices = data.body.invoices;
          
      }
    });
  }

}
