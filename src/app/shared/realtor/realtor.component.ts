import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-realtor',
  templateUrl: './realtor.component.html',
  styleUrls: ['./realtor.component.css']
})
export class RealtorComponent implements OnInit, OnChanges {
  @Input() searchTerm:any;
  realtors:any;
  realtors2:any;
  tempRealtors:any;
  searched:Boolean = false;
  changedStat: Boolean = false;

  constructor(private CustomerService:UserService) { }

  ngOnInit() {
    this.CustomerService.loadRealtors().subscribe(data=>{
      if(data.status == 200){
        
          this.realtors = data.body.user;
          this.realtors2 = data.body.user;
          
      }
    });
  }

  ngOnChanges() {
    this.searched = true;
    //filter array based on invoice number or description
    if(this.searchTerm != ''){
        if(this.searched){
            this.tempRealtors = [];
            //use new array values
            this.realtors = [];
            this.realtors = this.realtors2;
            this.realtors.forEach((item,index)=>{
                
                if ((item.status !== undefined && typeof(item.status) === 'string' && item.status.indexOf(this.searchTerm) > -1) || 
                (item.phone_number !== undefined && typeof(item.phone_number) === 'string' && item.phone_number.indexOf(this.searchTerm) > -1) ||
                (item.email !== undefined && typeof(item.email) === 'string' && item.email.indexOf(this.searchTerm) > -1) || 
                (item.firstname !== undefined && typeof(item.firstname) === 'string' && item.firstname.indexOf(this.searchTerm) > -1) ||
                (item.lastname !== undefined && typeof(item.lastname) === 'string' && item.lastname.indexOf(this.searchTerm) > -1)) {
                  this.tempRealtors.push(item);
                } 
                
            });

            this.realtors = this.tempRealtors;
        }else{
            this.tempRealtors = [];
            //use new array values
            this.realtors.forEach((item,index)=>{
                
              if ((item.status !== undefined && typeof(item.status) === 'string' && item.status.indexOf(this.searchTerm) > -1) || 
              (item.phone_number !== undefined && typeof(item.phone_number) === 'string' && item.phone_number.indexOf(this.searchTerm) > -1) ||
              (item.email !== undefined && typeof(item.email) === 'string' && item.email.indexOf(this.searchTerm) > -1) || 
              (item.firstname !== undefined && typeof(item.firstname) === 'string' && item.firstname.indexOf(this.searchTerm) > -1) ||
              (item.lastname !== undefined && typeof(item.lastname) === 'string' && item.lastname.indexOf(this.searchTerm) > -1)) {
                this.tempRealtors.push(item);
              } 
                
            });

            this.realtors = this.tempRealtors;
        }
        
    }else{
        //use original array values
        this.CustomerService.loadRealtors().subscribe(data=>{
            if(data.status == 200){
                this.realtors = data.body.user;
                this.realtors2 = data.body.user;
            }
        });
    }
  }

}
