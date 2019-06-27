import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnChanges {
  @Input() searchTerm:any;
  customers:any;
  customers2:any;
  tempCustomers:any;
  searched:Boolean = false;
  changedStat: Boolean = false;
  
  constructor(private CustomerService:UserService) { }

  ngOnInit() {
    this.CustomerService.loadCustomers().subscribe(data=>{
      if(data.status == 200){
        //convert date
          this.customers = data.body.user;
          this.customers2 = data.body.user;
          
      }
    });
  }

  editAccountStatus(status,uid){
    this.CustomerService.changeStatus(status, uid).subscribe(data=>{
      if(data.status == 200){
        this.changedStat = true;

        setTimeout(()=>{
          this.changedStat = false;
          this.ngOnInit();
        }, 2000);
          
      }
    });
  }

  ngOnChanges() {
    this.searched = true;
    //filter array based on invoice number or description
    if(this.searchTerm != ''){
        if(this.searched){
            this.tempCustomers = [];
            //use new array values
            this.customers = [];
            this.customers = this.customers2;
            this.customers.forEach((item,index)=>{
                
                if ((item.status !== undefined && typeof(item.status) === 'string' && item.status.indexOf(this.searchTerm) > -1) || 
                (item.phone_number !== undefined && typeof(item.phone_number) === 'string' && item.phone_number.indexOf(this.searchTerm) > -1) ||
                (item.email !== undefined && typeof(item.email) === 'string' && item.email.indexOf(this.searchTerm) > -1) || 
                (item.firstname !== undefined && typeof(item.firstname) === 'string' && item.firstname.indexOf(this.searchTerm) > -1) ||
                (item.lastname !== undefined && typeof(item.lastname) === 'string' && item.lastname.indexOf(this.searchTerm) > -1)) {
                  this.tempCustomers.push(item);
                } 
                
            });

            this.customers = this.tempCustomers;
        }else{
            this.tempCustomers = [];
            //use new array values
            this.customers.forEach((item,index)=>{
                
              if ((item.status !== undefined && typeof(item.status) === 'string' && item.status.indexOf(this.searchTerm) > -1) || 
              (item.phone_number !== undefined && typeof(item.phone_number) === 'string' && item.phone_number.indexOf(this.searchTerm) > -1) ||
              (item.email !== undefined && typeof(item.email) === 'string' && item.email.indexOf(this.searchTerm) > -1) || 
              (item.firstname !== undefined && typeof(item.firstname) === 'string' && item.firstname.indexOf(this.searchTerm) > -1) ||
              (item.lastname !== undefined && typeof(item.lastname) === 'string' && item.lastname.indexOf(this.searchTerm) > -1)) {
                this.tempCustomers.push(item);
              } 
                
            });

            this.customers = this.tempCustomers;
        }
        
    }else{
        //use original array values
        this.CustomerService.loadCustomers().subscribe(data=>{
            if(data.status == 200){
                this.customers = data.body.user;
                this.customers2 = data.body.user;
            }
        });
    }
  }

}
