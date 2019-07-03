import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-realtor-downline',
  templateUrl: './realtor-downline.component.html',
  styleUrls: ['./realtor-downline.component.css']
})
export class RealtorDownlineComponent implements OnInit{
    finaldownlines = [];

    finaldownlines2:any;
    tempDownlines2:any;
    //@Input() searchTerm:any;
    //searched:Boolean = false;
  constructor(private userservice:UserService) { }

  ngOnInit() {
    this.userservice.loadDownlines(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
      if(data.status == 200){
          //add generation to each array
          data.body.downlines.Generation_1.forEach((v,i)=>{
            v.generation = 'First Generation';
          });
          data.body.downlines.Generation_2.forEach((v,i)=>{
            v.generation = 'Second Generation';
          });
          data.body.downlines.Generation_3.forEach((v,i)=>{
            v.generation = 'Third Generation';
          });
          this.finaldownlines = [...data.body.downlines.Generation_1, ...data.body.downlines.Generation_2, ...data.body.downlines.Generation_3];
          //console.log(this.finaldownlines);
          
          
      }
    });
  }

  // ngOnChanges(){
  //   this.searched = true;
  //     //filter array based on invoice number or description
  //     if(this.searchTerm != ''){
  //         if(this.searched){
  //             this.tempDownlines2 = [];
  //             //use new array values
  //             this.finaldownlines = [];
  //             this.finaldownlines = this.finaldownlines2;
  //             this.finaldownlines.forEach((item,index)=>{
                  
  //                 if ((item.realtor_name !== undefined && typeof(item.realtor_name) === 'string' && item.realtor_name.indexOf(this.searchTerm) > -1) || 
  //                 (item.downline !== undefined && typeof(item.downline) === 'string' && item.downline.indexOf(this.searchTerm) > -1) ||
  //                 (item.generation !== undefined && typeof(item.generation) === 'string' && item.generation.indexOf(this.searchTerm) > -1)) {
  //                     this.tempDownlines2.push(item);
  //                 } 
                  
  //             });

  //             this.finaldownlines = this.tempDownlines2;
  //         }else{
  //             this.tempDownlines2 = [];
  //             //use new array values
  //             this.finaldownlines.forEach((item,index)=>{
                  
  //               if ((item.realtor_name !== undefined && typeof(item.realtor_name) === 'string' && item.realtor_name.indexOf(this.searchTerm) > -1) || 
  //               (item.downline !== undefined && typeof(item.downline) === 'string' && item.downline.indexOf(this.searchTerm) > -1) ||
  //               (item.generation !== undefined && typeof(item.generation) === 'string' && item.generation.indexOf(this.searchTerm) > -1)) {
  //                   this.tempDownlines2.push(item);
  //               } 
                  
  //             });

  //             this.finaldownlines = this.tempDownlines2;
  //         }
          
  //     }else{
  //         //use original array values
  //         this.userservice.loadDownlines(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
  //             if(data.status == 200){
  //                 //add generation to each array
  //                 data.body.downlines.Generation_1.forEach((v,i)=>{
  //                   v.generation = 'First Generation';
  //                 });
  //                 data.body.downlines.Generation_2.forEach((v,i)=>{
  //                   v.generation = 'Second Generation';
  //                 });
  //                 data.body.downlines.Generation_3.forEach((v,i)=>{
  //                   v.generation = 'Third Generation';
  //                 });
  //                 this.finaldownlines = [...data.body.downlines.Generation_1, ...data.body.downlines.Generation_2, ...data.body.downlines.Generation_3];
                  
          
  //             }
  //         });
  //     }
  // }

}
