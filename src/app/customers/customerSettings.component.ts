import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';


@Component({
    selector: 'app-customersettings',
    templateUrl: './customerSettings.component.html'
})

export class CustomerSettingsComponent {
    landinfosubmitted2: String = 'done';
    landinfosubmitted3: String = 'done';
    landinfosubmitted: String = 'done';
    addUserSettings: FormGroup;
    addUserReferralForm: FormGroup;
    addUserNokForm: FormGroup;
    addUserEmpForm: FormGroup;
    addUserPass: FormGroup;
    nationality_array:any;
    marital_status_array = ['Single','Married','Widowed','Divorced'];
    userDetails:any;

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

        this.addUserNokForm = this.formBuilder.group({
            name: ['', Validators.required],
            phone_number: ['', [Validators.required, Validators.maxLength(15)]],
            email: ['', Validators.required],
            address: ['', Validators.required]
        });

        this.addUserEmpForm = this.formBuilder.group({
            employer: ['', Validators.required],
            phone_number: ['', [Validators.required, Validators.maxLength(15)]],
            designation: ['', Validators.required],
            address: ['', Validators.required]
        });

        this.addUserReferralForm = this.formBuilder.group({
            name: ['', Validators.required],
            phone_number: ['', [Validators.required, Validators.maxLength(15)]],
            email: ['', Validators.required]
            
        });

        this.addUserPass = this.formBuilder.group({
            current_password: ['', Validators.required],
            new_password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
            confirm_new_password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
        });
            
    }

    
    logout(){
        //destroy all localstorage entries
        localStorage.removeItem('FRLS-D');
        localStorage.removeItem('FRLS-T');
        localStorage.removeItem('FRLS');
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        this.userService.loadNationalities().subscribe(data=>{
            this.nationality_array = data.body.country;
        });

        this.userService.getUserDetails3().subscribe(data=>{
            this.userDetails = data.user[0];
            this.patchFormValues(this.userDetails.basic_details[0]);
            this.patchFormValues1(this.userDetails.referrals[0]);
            this.patchFormValues2(this.userDetails.next_of_kin[0]);
            
        });

        
    }

    get g() { return this.addUserSettings.controls; }
    get h() { return this.addUserPass.controls; }
    get i() { return this.addUserReferralForm.controls; }
    get j() { return this.addUserNokForm.controls; }
    get k() { return this.addUserEmpForm.controls; }

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
        this.addUserReferralForm.patchValue({
            name: resValues.name,
            email: resValues.email,
            phone_number: resValues.phone_number
            
        });
    }

    patchFormValues2(resValues){
        this.addUserNokForm.patchValue({
            name: resValues.name,
            email: resValues.email,
            phone_number: resValues.phone_number,
            address: resValues.address
            
        });
    }

    patchFormValues3(resValues){
        this.addUserEmpForm.patchValue({
            employer: resValues.name,
            designation: resValues.email,
            phone_number: resValues.phone_number,
            address: resValues.address
            
        });
    }



    onUSSubmit(){
        //console.log(this.g);
        this.userService.editUser(this.g.firstname.value, this.g.lastname.value, this.g.email.value, this.g.phone_number.value, this.g.nationality.value, this.g.marital_status.value, this.g.dob.value, this.g.address.value, localStorage.getItem('FRLS-D').toString())
            .subscribe(
                data => {
                    if(data.status == 200){
                        
                        this.landinfosubmitted2 = 'true';

                        setTimeout(()=>{
                            this.landinfosubmitted2 = 'done';
                            // this.logout();
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
            this.userService.changePassword(this.h.new_password.value, localStorage.getItem('FRLS-D').toString())
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

    onRSubmit(){
        this.userService.editCustomerReferral(this.i.name.value, this.i.phone_number.value, this.i.email.value, localStorage.getItem('FRLS-D').toString())
        .subscribe(
            data => {
                if(data.status == 200){
                    
                    this.landinfosubmitted = 'true';

                    setTimeout(()=>{
                        this.landinfosubmitted = 'done';
                        
                    }, 6000);
                    
                    
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

    onNOKSubmit(){
        this.userService.editCustomerNextOfKin(this.j.name.value, this.j.address.value, this.j.phone_number.value, this.j.email.value, localStorage.getItem('FRLS-D').toString())
        .subscribe(
            data => {
                if(data.status == 200){
                    
                    this.landinfosubmitted3 = 'true';

                    setTimeout(()=>{
                        this.landinfosubmitted3 = 'done';
                        
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

    onEMPSubmit(){
        this.userService.editCustomerEmployment(this.k.employer.value, this.k.address.value, this.k.phone_number.value, this.k.designation.value, localStorage.getItem('FRLS-D').toString())
        .subscribe(
            data => {
                if(data.status == 200){
                    
                    this.landinfosubmitted3 = 'true';

                    setTimeout(()=>{
                        this.landinfosubmitted3 = 'done';
                        
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