import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted:boolean = false;
    loading:boolean = false;
    returnUrl: string;
    processed: boolean = true;


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        
    }

    ngOnInit() {
        this.authenticationService.setToken();

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

        this.loginForm = this.formBuilder.group({
            Email: ['', Validators.required],
            Password: ['', Validators.required]
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.loading = false;
            return;
        }

        this.authenticationService.login(this.f.Email.value, this.f.Password.value)
            .subscribe(
                data => {
                    if(data.status == 200){
                        this.authenticationService.setLoginToken(data.body.token, data.body.user.uid, data.body.user.user_type_id);
                        this.processed = true;
                        this.loading = false;

                        
                        if (data.body.user.user_type_id == 1) {
                            this.router.navigate(['/admindashboard']);
                        } else if (data.body.user.user_type_id == 2) {
                            this.router.navigate(['/customerdashboard']);
                        } else if(data.body.user.user_type_id == 3) {
                            this.router.navigate(['/realtordashboard']);
                        }
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
    }
}
