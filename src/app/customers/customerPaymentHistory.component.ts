import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { PaymentHistory } from '../_models/paymenthistory';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../_services/admin.service';
import { CustomerService } from '../_services/customer.service';

@Component({
    selector: 'app-customerpaymenthistory',
    templateUrl: './customerPaymentHistory.component.html'
})

export class CustomerPaymentHistoryComponent implements OnInit{
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    paymenthistorys: PaymentHistory;
    paymenthistory: PaymentHistory = new PaymentHistory();

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
        private toaster: ToastrService,
        private adminService: AdminService,
        private customerService: CustomerService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.myDate = new Date();

        this.customerService.getAllPaymentHistorys()
            .subscribe(paymenthistory => {
                this.paymenthistorys = paymenthistory;
            },
                error => this.errorMessage = <any>error);
    }
}