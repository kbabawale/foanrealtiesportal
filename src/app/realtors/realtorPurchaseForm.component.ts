import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LandService } from '../_services/land.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormGroup, FormBuilder,FormControl, Validators, FormGroupName} from '@angular/forms';
import { UserService } from '../_services/user.service';
import {Location} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import * as $ from 'jquery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component ({
    selector: 'app-realtor-purchase-form',
    templateUrl: './realtorPurchaseForm.component.html'
})

export class RealtorPurchaseFormComponent {
    pid:any;
    addSelectCustomerForm: FormGroup;
    addCustomerEmploymentForm: FormGroup;
    addCustomerNextOfKinForm: FormGroup;
    addCustomerReferralForm: FormGroup;
    addCustomerForm: FormGroup;
    addPaymentPlanForm: FormGroup;
    customers:any;
    landinfosubmitted:String = 'done';
    landinfosubmitted1:String = 'done';
    landinfosubmitted2:String = 'done';
    landinfosubmitted3:String = 'done';
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
    nationality_array:any;
    marital_status_array = ['Single','Married','Widowed','Divorced'];
    payment_plan:any;
    payment_plan_count:any;
    landinfosubmitted4:String = 'done';

    constructor(private http:HttpClient,
                private landservice: LandService,
                private userservice: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private location: Location,
                private domSanitizer: DomSanitizer){


                    this.addSelectCustomerForm = this.formBuilder.group({
                        customer: [null, Validators.required]
                    });
                    this.addCustomerForm = this.formBuilder.group({
                        firstname: ['', Validators.required],
                        lastname: ['', Validators.required],
                        address: ['', Validators.required],
                        phone_number: ['', [Validators.required, Validators.maxLength(15)]],
                        email: ['', Validators.required],
                        marital_status: [null, Validators.required],
                        password: ['', [Validators.required, Validators.min(4), Validators.max(15)]],
                        confirm_password: ['', [Validators.required, Validators.min(4), Validators.max(15)]],
                        nationality: [null, Validators.required],
                        date_of_birth: ['', Validators.required]
                    });

                    this.addCustomerEmploymentForm = this.formBuilder.group({
                        address: ['', Validators.required],
                        phone_number: ['', [Validators.required, Validators.maxLength(15)]],
                        employer: ['', Validators.required],
                        designation: [null, Validators.required]
                    });

                    this.addCustomerNextOfKinForm = this.formBuilder.group({
                        address: ['', Validators.required],
                        phone_number: ['', [Validators.required, Validators.maxLength(15)]],
                        name: ['', Validators.required],
                        email: ['', Validators.required]
                    });

                    this.addCustomerReferralForm = this.formBuilder.group({
                        phone_number: ['', [Validators.required, Validators.maxLength(15)]],
                        name: ['', Validators.required],
                        email: ['', Validators.required]
                    });

                    this.addPaymentPlanForm = this.formBuilder.group({
                        payment_plan: ['', Validators.required]
                        
                    });
    }

    ngOnInit(): void {
        this.pid = this.route.snapshot.paramMap.get('pid');

        this.userservice.loadCustomers().subscribe(data=>{
            if(data.status === 200){
                this.customers = data.body.user;
            }
        });

        this.landservice.loadPaymentPlan(this.pid).subscribe(data=>{
            if(data.status === 200){
                this.payment_plan = data.body.plans;
                var i = this.payment_plan;
                if(i.length>0){
                    this.payment_plan_count = true;
                }
            }
        });

        this.userservice.loadNationalities().subscribe(data=>{
            this.nationality_array = data.body.country;
        });

        this.staticTabs.tabs[1].disabled = true;
        this.staticTabs.tabs[2].disabled = true;
        this.staticTabs.tabs[3].disabled = true;
        this.staticTabs.tabs[4].disabled = true;
        this.staticTabs.tabs[5].disabled = true;
        
    }

    get g() { return this.addSelectCustomerForm.controls; }
    get h() { return this.addCustomerForm.controls; }
    get i() { return this.addCustomerEmploymentForm.controls; }
    get j() { return this.addCustomerNextOfKinForm.controls; }
    get k() { return this.addCustomerReferralForm.controls; }
    get l() { return this.addPaymentPlanForm.controls; }

    doSelectCustomer(){
        localStorage.setItem('b-cid', this.g.customer.value);
        //navigate to payment plan tab
        this.staticTabs.tabs[5].disabled = false;
        this.staticTabs.tabs[5].active = true;

        this.staticTabs.tabs[0].disabled = true;
        this.staticTabs.tabs[1].disabled = true;
        this.staticTabs.tabs[2].disabled = true;
        this.staticTabs.tabs[3].disabled = true;
        this.staticTabs.tabs[4].disabled = true;
    }

    addCustomerDetails(){
        //add new customer's details into db
        if(this.h.password.value == this.h.confirm_password.value){
            this.userservice.addUser(this.h.firstname.value, this.h.lastname.value, this.h.email.value, this.h.phone_number.value, this.h.password.value, '2', this.h.nationality.value, this.h.date_of_birth.value, this.h.marital_status.value, this.h.address.value, null)
            .subscribe(
                data => {
                    if(data.status == 200){
                        //store insert id of customer
                        localStorage.setItem('b-cid', data.body.users.uid);

                        this.landinfosubmitted = 'true';

                        setTimeout(()=>{
                            this.landinfosubmitted = 'done';
                            this.staticTabs.tabs[2].disabled = false;
                            this.staticTabs.tabs[2].active = true;
                            this.staticTabs.tabs[1].disabled = true;
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
        }else{
            this.landinfosubmitted = 'match';
        }
    }

    addCustomerEmployment(){
        this.userservice.updateCustomerEmployment(this.i.employer.value, this.i.designation.value, this.i.address.value, this.i.phone_number.value, localStorage.getItem('b-cid').toString())
            .subscribe(
                data => {
                    if(data.status == 200){
                        
                        this.landinfosubmitted1 = 'true';

                        setTimeout(()=>{
                            this.landinfosubmitted1 = 'done';
                            this.staticTabs.tabs[3].disabled = false;
                            this.staticTabs.tabs[3].active = true;
                            this.staticTabs.tabs[2].disabled = true;
                        }, 2000);
                        
                        
                    }else{
                        this.landinfosubmitted1 = 'false';
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.landinfosubmitted1 = 'false';
                    }
                }
            );
    }

    addCustomerNextOfKin(){
        this.userservice.updateCustomerNextOfKin(this.j.name.value, this.j.email.value, this.j.address.value, this.j.phone_number.value, localStorage.getItem('b-cid').toString())
            .subscribe(
                data => {
                    if(data.status == 200){
                        
                        this.landinfosubmitted2 = 'true';

                        setTimeout(()=>{
                            this.landinfosubmitted2 = 'done';
                            this.staticTabs.tabs[4].disabled = false;
                            this.staticTabs.tabs[4].active = true;
                            this.staticTabs.tabs[3].disabled = true;
                        }, 2000);
                        
                        
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

    addCustomerReferral(){
        this.userservice.updateCustomerReferral(this.k.name.value, this.j.email.value, this.j.phone_number.value, localStorage.getItem('b-cid').toString())
            .subscribe(
                data => {
                    if(data.status == 200){
                        
                        this.landinfosubmitted3 = 'true';

                        setTimeout(()=>{
                            this.landinfosubmitted3 = 'done';
                            this.staticTabs.tabs[5].disabled = false;
                            this.staticTabs.tabs[5].active = true;
                            this.staticTabs.tabs[4].disabled = true;
                        }, 2000);
                        
                        
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

    addPaymentPlan(){
        this.landservice.buyProperty(this.pid,localStorage.getItem('b-cid').toString(), localStorage.getItem('FRLS-D').toString(), localStorage.getItem('FRLS-D').toString(), this.l.payment_plan.value).subscribe(data=>{
            if(data.status == 200){
                this.landinfosubmitted4 = 'true';
                localStorage.removeItem('b-cid');
            }else{
                this.landinfosubmitted4 = 'false';
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.landinfosubmitted4 = 'false';
            }
        }
        );
    }

    goBack(){
        this.router.navigate(['/realtorsingleland', this.pid]);
    }

    goToPersonalTab(){
        //enable all tabs and disable customer tab
        this.staticTabs.tabs[1].disabled = false;
        this.staticTabs.tabs[0].disabled = true;
        //navigate to personal tab
        this.staticTabs.tabs[1].active = true;
    }
}