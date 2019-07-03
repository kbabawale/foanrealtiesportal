import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    processed: boolean = true;
    submittedVal:String = 'done';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        
    ) { 
        this.registerForm = this.formBuilder.group({
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            Phone_Number: ['', Validators.required],
            Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            UserRole: [null, Validators.required],
            Password: ['', [Validators.required, Validators.minLength(6)]],
            ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() {
        // redirect to home if already logged in
        this.authenticationService.testLoginValidity().subscribe(valis=>{
            let vali = valis.body.statResponse;
            if(vali){ //if logged in, get usertype and redirect appropriately
                if (this.authenticationService.getLoginTokenType == '2') {
                    this.router.navigate(['/customerdashboard']);
                } else if (this.authenticationService.getLoginTokenType == '3') {
                    this.router.navigate(['/realtordashboard']);
                } else if (this.authenticationService.getLoginTokenType == '1') {
                    this.router.navigate(['/admindashboard']);
                }
            }else{
                this.router.navigate(['/login']);
            }
        });

        
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            this.loading = false;
            return;
        }

        if(this.f.ConfirmPassword.value == this.f.Password.value){
            console.log(this.f);
            this.authenticationService.register(this.f.FirstName.value,this.f.LastName.value, this.f.Email.value, this.f.Phone_Number.value,this.f.UserRole.value, this.f.Password.value)
            .subscribe(
                data => {
                    if(data.status == 200){
                        //this.authenticationService.setLoginToken(data.body.token, data.body.user.uid, data.body.user.user_type_id);
                        this.processed = true;
                        this.loading = false;

                        this.submittedVal = 'true';
                    }else{
                        this.processed = false;
                        this.loading = false;
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.processed = false;
                        this.loading = false;
                        
                    }
                }
            );
        }else{
            this.loading = false;
            this.submittedVal= 'match';
            return;
        }
        
    }
}
