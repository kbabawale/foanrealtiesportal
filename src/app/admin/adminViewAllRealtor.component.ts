import { Component, OnInit } from "@angular/core";
import { User } from '../_models/user';
//import { Realtor } from '../_models/realtor';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
//import { SharedService } from '../_services/shared.service';
//import { ToastrService } from 'ngx-toastr';
//import { AdminService } from '../_services/admin.service';

@Component({
    selector: 'app-viewallrealtor',
    templateUrl: './adminViewAllRealtor.component.html'
})

export class AdminViewAllRealtorComponent implements OnInit {
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    // realtors: Realtor;
    // realtor: Realtor = new Realtor();

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        // private sharedService: SharedService,
        // private toaster: ToastrService,
        // private adminService: AdminService
    ) {
        //this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.myDate = new Date();

        // this.sharedService.getAllRealtors()
        //     .subscribe(realtor => {
        //         this.realtors = realtor;
        //     },
        //         error => this.errorMessage = <any>error);
    }
}