import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { LandService } from '../_services/land.service';


@Component({
    selector: 'app-realtorvewinspectionlist',
    templateUrl: './realtorViewInspectionList.component.html'
})

export class RealtorViewInspectionListComponent{
    
    // ins_list:any;
    typedTerm:any;

    constructor(
        
    ) {
        
    }

    ngOnInit(): void {
        // this.landservice.loadRealtorInspection(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
        //     if(data.status == 200){
        //         this.ins_list = data.body.inspections;
        //     }
        // });
    }
}