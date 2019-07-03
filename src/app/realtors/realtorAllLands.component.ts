import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { LandService } from '../_services/land.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Component({
    selector: 'app-realtoralllands',
    templateUrl: './realtorAllLands.component.html'
})

export class RealtorAllLandsComponent implements OnInit {
    errorMessage: any;
    hostURL:String;
    myDate = new Date();
    lands: any;
    searchTermResults:any='All Properties';
    
    constructor(
        private landservice: LandService
        
    ) {
        
    }

    ngOnInit(): void {
        this.myDate = new Date();

        this.landservice.loadProperties().subscribe(data=>{
            if(data.status == 200){
                this.lands = data.body.property;
                //console.log(this.lands[0].location[0]);
            }
        });
    }
}