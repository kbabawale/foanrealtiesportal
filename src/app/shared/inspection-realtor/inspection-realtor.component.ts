import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LandService } from 'src/app/_services/land.service';

@Component({
  selector: 'app-inspection-realtor',
  templateUrl: './inspection-realtor.component.html',
  styleUrls: ['./inspection-realtor.component.css']
})
export class InspectionRealtorComponent implements OnInit, OnChanges  {
  @Input() searchTerm:any;
  searched:Boolean = false;
  ins_list2:any;
  ins_list:any;
  tempIns:any;

  constructor(private landService: LandService) { }

  ngOnChanges(){
    this.searched = true;
    //filter array based on invoice number or description
    if(this.searchTerm != ''){
        if(this.searched){
            this.tempIns = [];
            //use new array values
            this.ins_list = [];
            this.ins_list = this.ins_list2;
            this.ins_list.forEach((item,index)=>{
                
                if ((item.property_name !== undefined && typeof(item.property_name) === 'string' && item.property_name.indexOf(this.searchTerm) > -1) || 
                (item.customer_name !== undefined && typeof(item.customer_name) === 'string' && item.customer_name.indexOf(this.searchTerm) > -1) ||
                (item.inspection_date !== undefined && typeof(item.inspection_date) === 'string' && item.inspection_date.indexOf(this.searchTerm) > -1) ||
                (item.property_address !== undefined && typeof(item.property_address) === 'string' && item.property_address.indexOf(this.searchTerm) > -1)) {
                    this.tempIns.push(item);
                } 
                
            });

            this.ins_list = this.tempIns;
        }else{
            this.tempIns = [];
            //use new array values
            this.ins_list.forEach((item,index)=>{
                
              if ((item.property_name !== undefined && typeof(item.property_name) === 'string' && item.property_name.indexOf(this.searchTerm) > -1) || 
              (item.customer_name !== undefined && typeof(item.customer_name) === 'string' && item.customer_name.indexOf(this.searchTerm) > -1) ||
              (item.inspection_date !== undefined && typeof(item.inspection_date) === 'string' && item.inspection_date.indexOf(this.searchTerm) > -1) ||
              (item.property_address !== undefined && typeof(item.property_address) === 'string' && item.property_address.indexOf(this.searchTerm) > -1)) {
                  this.tempIns.push(item);
              } 
                
            });

            this.ins_list = this.tempIns;
        }
        
    }else{
        //use original array values
        this.landService.loadRealtorInspection(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
          if(data.status == 200){
              this.ins_list = data.body.inspections;
              this.ins_list2 = data.body.inspections;
          }
        });
    } 
  }

  ngOnInit() {
      
      
      this.landService.loadRealtorInspection(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
        if(data.status == 200){
            this.ins_list = data.body.inspections;
            this.ins_list2 = data.body.inspections;
        }
    });
  }

}
