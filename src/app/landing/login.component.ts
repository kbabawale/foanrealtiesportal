import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private toaster: ToastrService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.UserRole == 1) {
            this.router.navigate(['/customerdashboard']);
        } else if (this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.UserRole == 2) {
            this.router.navigate(['/realtordashboard']);
        } else {
            this.router.navigate(['/admindashboard']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            Email: ['', Validators.required],
            Password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.Email.value, this.f.Password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;

                    let role = this.authenticationService.currentUserValue.UserRole;
                    alert(role);
                    if (role == 1) {
                        this.router.navigate(['/customerdashboard']);
                    } else if (role == 2) {
                        this.router.navigate(['/realtordashboard']);
                    } else {
                        this.router.navigate(['/admindashboard']);
                    }

                    this.toaster.success('Welcome Back to Foan Realties!');
                }, (err: any) => {
                    this.loading = false;
                    if (err instanceof HttpErrorResponse) {
                        this.toaster.error(err.error, 'Authentication Problem', {
                            timeOut: 2000,
                        });
                    }
                }
            );
    }
}
