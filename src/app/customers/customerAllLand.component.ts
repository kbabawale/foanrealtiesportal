import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { LandService } from '../_services/land.service';

@Component({
    selector: 'app-customerallland',
    templateUrl: './customerAllLand.component.html'
})

export class CustomerAllLandComponent implements OnInit{
    lands: any;
    searchTermResults = 'All Properties';

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private landservice: LandService
        
    ) {
       
    }

    ngOnInit(): void {
        this.landservice.loadProperties().subscribe(data=>{
            if(data.status == 200){
                this.lands = data.body.property;
                //console.log(this.lands[0].location[0]);
            }
        });
    }
}