import { Component, OnInit } from "@angular/core";
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../_services/admin.service';
import { Customer } from '../_models/customer';

@Component({
    selector: 'app-viewallcustomer',
    templateUrl: './adminViewAllCustomer.component.html'
})

export class AdminViewAllCustomerComponent implements OnInit {
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    customers: Customer;
    customer: Customer = new Customer();

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

        this.adminService.getAllCustomers()
            .subscribe(customer => {
                this.customers = customer;
            },
                error => this.errorMessage = <any>error);
    }
}