import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder } from '@angular/forms';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit, OnChanges {
  receipts:any;
  receipts2:any;
  tempReceipts:any;
  @Input() searchTerm:any;
  searched:Boolean = false;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceService.loadReceipts().subscribe(data=>{
      if(data.status == 200){
          this.receipts = data.body.receipt;
          this.receipts2 = data.body.receipt;
      }
  });
  }

  ngOnChanges(){
    this.searched = true;
        //filter array based on invoice number or description
        if(this.searchTerm != ''){
            if(this.searched){
                this.tempReceipts = [];
                //use new array values
                this.receipts = [];
                this.receipts = this.receipts2;
                this.receipts.forEach((item,index)=>{
                    
                    if ((item.receipt_number !== undefined && typeof(item.receipt_number) === 'string' && item.receipt_number.indexOf(this.searchTerm) > -1) || (item.description !== undefined && typeof(item.description) === 'string' && item.description.indexOf(this.searchTerm) > -1)) {
                        this.tempReceipts.push(item);
                    } 
                    
                });

                this.receipts = this.tempReceipts;
            }else{
                this.tempReceipts = [];
                //use new array values
                this.receipts.forEach((item,index)=>{
                    
                    if ((item.receipt_number !== undefined && typeof(item.receipt_number) === 'string' && item.receipt_number.indexOf(this.searchTerm) > -1) || (item.description !== undefined && typeof(item.description) === 'string' && item.description.indexOf(this.searchTerm) > -1)) {
                        this.tempReceipts.push(item);
                    } 
                    
                });

                this.receipts = this.tempReceipts;
            }
            
        }else{
            //use original array values
            this.invoiceService.loadReceipts().subscribe(data=>{
                if(data.status == 200){
                    this.receipts = data.body.receipt;
                    this.receipts2 = data.body.receipt;
                }
            });
        }
  }


}
