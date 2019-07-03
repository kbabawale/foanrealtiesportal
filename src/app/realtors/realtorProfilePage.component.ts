import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap, RouterEvent, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-realtorprofilepage',
    templateUrl: './realtorProfilePage.component.html'
})

export class RealtorProfilePageComponent {
    rid: any;
    realtors:any;
    downlines:any;

    constructor(private route: ActivatedRoute,
        private http:HttpClient,
        private CustomerService:UserService,
        private Router: Router){

            

    }


    ngOnInit(){
        
        this.rid = localStorage.getItem('FRLS-D').toString();
        this.CustomerService.loadRealtor(this.rid).subscribe(data=>{
            if(data.status == 200){
              this.realtors = data.body.user[0];
            //   console.log(this.realtors);
            }
        });

        this.CustomerService.loadDownlines(this.rid).subscribe(data=>{
            if(data.status == 200){
                // data.body.downlines.Generation_1.forEach((v,i)=>{
                //     v.generation = '1st';
                //   });
                //   data.body.downlines.Generation_2.forEach((v,i)=>{
                //     v.generation = '2nd';
                //   });
                //   data.body.downlines.Generation_3.forEach((v,i)=>{
                //     v.generation = '3rd';
                //   });
                this.downlines = [...data.body.downlines.Generation_1, ...data.body.downlines.Generation_2, ...data.body.downlines.Generation_3];
                
            }
        });
    }
}