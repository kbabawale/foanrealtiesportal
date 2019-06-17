import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Purchase } from '../_models/purchase';

@Component({
    selector: 'app-adminviewallpurchase',
    templateUrl: './adminViewAllPurchase.component.html'
})

export class AdminViewAllPurchaseComponent implements OnInit {
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    purchases: Purchase;
    purchase: Purchase = new Purchase();

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private toaster: ToastrService,
        private adminService: AdminService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.myDate = new Date();

        this.adminService.getAllPurchases()
            .subscribe(purchase => {
                this.purchases = purchase;
            },
                error => this.errorMessage = <any>error);
    }
}