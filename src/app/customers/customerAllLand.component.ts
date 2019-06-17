import { Component, OnInit } from "@angular/core";
import { User } from '../_models/user';
import { Land } from '../_models/land';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../_services/admin.service';

@Component({
    selector: 'app-customerallland',
    templateUrl: './customerAllLand.component.html'
})

export class CustomerAllLandComponent implements OnInit{
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    lands: Land;
    land: Land = new Land();

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

        this.sharedService.getAllLands()
            .subscribe(land => {
                this.lands = land;
            },
                error => this.errorMessage = <any>error);
    }
}