import { Component, OnInit } from "@angular/core";
import { User } from '../_models/user';
import { Agreement } from '../_models/agreement';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../_services/admin.service';

@Component({
    selector: 'app-adminagreement',
    templateUrl: './adminAgreement.component.html'
})

export class AdminAgreementComponent implements OnInit {
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    agreements: Agreement;
    agreement: Agreement = new Agreement();

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

        this.sharedService.getAllAgreements()
            .subscribe(agreement => {
                this.agreements = agreement;
            },
                error => this.errorMessage = <any>error);
    }
}