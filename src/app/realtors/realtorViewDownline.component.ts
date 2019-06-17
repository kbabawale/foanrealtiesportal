import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Downline } from '../_models/downline';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../_services/admin.service';
import { RealtorService } from '../_services/realtor.service';

@Component({
    selector: 'app-realtorviewdownline',
    templateUrl: './realtorViewDownline.component.html'
})

export class RealtorViewDownlineComponent implements OnInit{
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    downlines: Downline;
    downline: Downline = new Downline();

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private toaster: ToastrService,
        private adminService: AdminService,
        private realtorService: RealtorService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.myDate = new Date();

        this.realtorService.getAllDownlines()
            .subscribe(downline => {
                this.downlines = downline;
            },
                error => this.errorMessage = <any>error);
    }
}