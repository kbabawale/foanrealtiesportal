import { Component } from '@angular/core';
import { InspectionList } from '../_models/inspectionlist';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../_services/admin.service';
import { RealtorService } from '../_services/realtor.service';

@Component({
    selector: 'app-realtorvewinspectionlist',
    templateUrl: './realtorViewInspectionList.component.html'
})

export class RealtorViewInspectionListComponent{
    errorMessage: any;
    currentUser: User = new User();
    myDate = new Date();
    inspectionlists: InspectionList;
    inspectionlist: InspectionList = new InspectionList();

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

        this.realtorService.getAllInspectionLists()
            .subscribe(inspectionlist => {
                this.inspectionlists = inspectionlist;
            },
                error => this.errorMessage = <any>error);
    }
}