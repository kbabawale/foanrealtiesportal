import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-adminsettings',
    templateUrl: './adminSettings.component.html'
})

export class AdminSettingsComponent implements OnInit {
    landinfosubmitted2: String = 'done';
    landinfosubmitted3: String = 'done';
    landinfosubmitted: String = 'done';
    landinfosubmitted0: String = 'done';
    addUserSettings: FormGroup;
    addAdmin: FormGroup;
    addEditAdmin: FormGroup;
    addUserPass: FormGroup;
    nationality_array:any;
    marital_status_array = ['Single','Married','Widowed','Divorced'];
    userDetails:any;
    allAdmins:any;
    getAdmin:any;
    accountChanged:Boolean=false;
    passwordReset:Boolean=false;
    roles_array:any;

    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        private http: HttpClient,
        private router: Router,
        private location:Location){

        this.addUserSettings = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phone_number: ['', [Validators.required, Validators.maxLength(15)]],
            nationality: [null],
            marital_status: [null],
            email: ['', Validators.required],
            address: [''],
            dob: ['']
        });

        this.addEditAdmin = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phone_number: ['', [Validators.required, Validators.maxLength(15)]],
            email: ['', Validators.required],
            role: [null]
        });

        this.addAdmin = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phone_number: ['', [Validators.required, Validators.maxLength(15)]],
            email: ['', Validators.required],
            role: [null, Validators.required]
        });

        this.addUserPass = this.formBuilder.group({
            current_password: ['', Validators.required],
            new_password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
            confirm_new_password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
        });
            
    }

    ngOnInit() {
        this.userService.loadNationalities().subscribe(data=>{
            this.nationality_array = data.body.country;
        });

        this.userService.loadRoles().subscribe(data=>{
            this.roles_array = data.body.roles;
        });

        this.userService.getUserDetails().subscribe(data=>{
            this.userDetails = data.user[0];
            this.patchFormValues(this.userDetails);
        });

        this.userService.getAdmins().subscribe(data=>{
            this.allAdmins = data.user;
        });
    }

    get f() { return this.addEditAdmin.controls; }
    get g() { return this.addUserSettings.controls; }
    get h() { return this.addUserPass.controls; }
    get j() { return this.addAdmin.controls; }

    patchFormValues(resValues){
        this.addUserSettings.patchValue({
            firstname: resValues.firstname,
            lastname: resValues.lastname,
            email: resValues.email,
            phone_number: resValues.phone_number,
            address: resValues.address,
            dob: resValues.date_of_birth,
            marital_status: resValues.marital_status,
            nationality: resValues.country_id
        });
    }

    patchFormValues1(resValues){
        this.addEditAdmin.patchValue({
            firstname: resValues.firstname,
            lastname: resValues.lastname,
            email: resValues.email,
            phone_number: resValues.phone_number,
            role: resValues.role_id
        });
    }

    logout(){
        //destroy all localstorage entries
        localStorage.removeItem('FRLS-D');
        localStorage.removeItem('FRLS-T');
        localStorage.removeItem('FRLS');
        this.router.navigate(['/login']);
    }

    onUSSubmit(){
        this.userService.editUser(this.g.firstname.value, this.g.lastname.value, this.g.email.value, this.g.phone_number.value, this.g.nationality.value, this.g.marital_status.value, this.g.dob.value, this.g.address.value, this.userDetails.uid)
            .subscribe(
                data => {
                    if(data.status == 200){
                        
                        this.landinfosubmitted2 = 'true';

                        setTimeout(()=>{
                            this.landinfosubmitted2 = 'done';
                            this.logout();
                        }, 6000);
                        
                        
                    }else{
                        this.landinfosubmitted2 = 'false';
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.landinfosubmitted2 = 'false';
                    }
                }
            );
    }

    onUPSubmit(){
        //validate
        if(this.h.new_password.value != this.h.confirm_new_password.value){
            this.landinfosubmitted3 = 'match';
        }else{
            this.userService.changePassword(this.h.new_password.value, this.userDetails.uid)
            .subscribe(
                data => {
                    if(data.status == 200){
                        
                        this.landinfosubmitted3 = 'true';

                        setTimeout(()=>{
                            this.landinfosubmitted3 = 'done';
                            this.logout();
                        }, 6000);
                        
                        
                    }else{
                        this.landinfosubmitted3 = 'false';
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.landinfosubmitted3 = 'false';
                    }
                }
            );
        }
    }

    onEASubmit(){
        
        this.userService.editUser2(this.f.firstname.value, this.f.lastname.value, this.f.email.value, this.f.phone_number.value, this.f.role.value, this.userDetails.uid)
            .subscribe(
                data => {
                    if(data.status == 200){
                        
                        this.landinfosubmitted = 'true';

                        setTimeout(()=>{
                            this.landinfosubmitted = 'done';
                            location.reload();
                        }, 2000);
                        
                        
                    }else{
                        this.landinfosubmitted = 'false';
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.landinfosubmitted = 'false';
                    }
                }
            );
    }

    onAASubmit(){
        
        this.userService.addUser(this.j.firstname.value, this.j.lastname.value, this.j.email.value, this.j.phone_number.value, this.j.role.value, 'password', '1', this.userDetails.uid)
            .subscribe(
                data => {
                    if(data.status == 200){
                        
                        this.landinfosubmitted0 = 'true';

                        setTimeout(()=>{
                            this.landinfosubmitted0 = 'done';
                            location.reload();
                        }, 3000);
                        
                        
                    }else{
                        this.landinfosubmitted0 = 'false';
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.landinfosubmitted0 = 'false';
                    }
                }
            );
    }

    changeStatus(action, uid){
        this.userService.changeStatus(action, uid).subscribe(data=>{
            this.accountChanged = true;

            setTimeout(()=>{
                this.accountChanged = false;
                location.reload();
            },3000);
        });
    }

    resetPassword(password, uid){
        this.userService.changePassword(password, uid).subscribe(data=>{
            this.passwordReset = true;
            
            setTimeout(()=>{
                this.passwordReset = false;
                location.reload();
            },5000);

        });
    }

    loadAdminInfo(uid){
        this.userService.getAdmin(uid).subscribe(data=>{
            this.getAdmin = data.user[0];
            this.patchFormValues1(this.getAdmin);
        });
    }
}