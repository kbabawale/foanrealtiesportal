import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Receipt } from '../_models/receipt';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../_services/admin.service';

@Component({
    selector: 'app-adminreceipt',
    templateUrl:'./adminReceipt.component.html'
})

export class AdminReceiptComponent implements OnInit {
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    receipts: Receipt;
    receipt: Receipt = new Receipt();

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

        this.sharedService.getAllReceipts()
            .subscribe(receipt => {
                this.receipts = receipt;
            },
                error => this.errorMessage = <any>error);
    }
}