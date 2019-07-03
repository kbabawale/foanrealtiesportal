import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-realtorviewdownline',
    templateUrl: './realtorViewDownline.component.html'
})

export class RealtorViewDownlineComponent implements OnInit{
   
    typedTerm:any;
    
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
       
    ) {
        
    }

    ngOnInit(): void {
        
    }
}