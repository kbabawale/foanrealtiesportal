import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Idcard } from '../_models/idcard';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../_services/admin.service';

@Component({
    selector:'app-adminelectronicidcard',
    templateUrl:'./adminElectronicIdCard.component.html',
})

export class AdminElectronicIdCardComponent implements OnInit {
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    idcards: Idcard;
    idcard: Idcard = new Idcard();

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private toaster: ToastrService,
        private adminService: AdminService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.myDate = new Date();

        this.adminService.getAllIdcards()
            .subscribe(idcard => {
                this.idcards = idcard;
            },
                error => this.errorMessage = <any>error);
    }
}