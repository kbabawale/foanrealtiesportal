import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
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
        this.registerForm = this.formBuilder.group({
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            UserRole: ['0'],
            Password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                    this.toaster.success('Welcome to Foan Realties. Please Login with your credentials!');
                },(err: any) => {
                    this.loading = false;
                    if (err instanceof HttpErrorResponse) {
                        this.toaster.error(err.error, 'Authentication Problem', {
                            timeOut: 2000,
                        });
                    }
                });
    }
}
