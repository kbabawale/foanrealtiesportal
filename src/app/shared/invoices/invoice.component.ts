import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Invoice } from 'src/app/_models/invoice';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';

@Component ({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html'
})

export class InvoiceComponent implements OnInit {
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    invoices: Invoice;
    invoice: Invoice = new Invoice();

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

        this.sharedService.getAllInvoices()
            .subscribe(invoice => {
                this.invoices = invoice;
            },
                error => this.errorMessage = <any>error);
    }
    
}