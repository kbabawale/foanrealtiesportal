import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Commission } from '../_models/commission';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../_services/admin.service';

@Component({
    selector: 'app-adminviewallcomissions',
    templateUrl: './adminViewAllComissions.component.html'
})

export class AdminViewAllComissionsComponent implements OnInit {
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    commissions: Commission;
    commission: Commission = new Commission();

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

        this.sharedService.getAllCommissions()
            .subscribe(commission => {
                this.commissions = commission;
            },
                error => this.errorMessage = <any>error);
    }
}