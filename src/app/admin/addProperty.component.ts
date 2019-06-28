import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { LandService } from '../_services/land.service';
import {environment} from '../../environments/environment';

@Component ({
    selector: 'app-add-property',
    templateUrl: './addProperty.component.html'
})
export class AddPropertyComponent implements OnInit {

    addLandInfoForm: FormGroup;
    addLandLocation: FormGroup;
    addLandFacilities: FormGroup;
    addLandPaymentPlan: FormGroup;
    landinfosubmitted: String = 'done';
    landinfosubmitted2: String = 'done';
    landinfosubmitted3: String = 'done';
    landinfosubmitted4: String = 'done';
    landinfosubmitted5: String = 'done';
    states:Array<String>;
    payment_plan:Array<String>;
    facil:Array<String>;
    payment_plan_count:Boolean=false;
    progress:Number = 0;
    selectedFile : File = null;
    uploadText:String = 'Upload A File';
    submittedSuccess:Boolean = false;
    freshProperty:Boolean = false;
    apiUrl = environment.apiUrl;

    constructor(private formBuilder: FormBuilder,
       private landService: LandService,
       private http: HttpClient){
        
        this.addLandInfoForm = this.formBuilder.group({
            property_name: ['', Validators.required],
            plot_size: ['', Validators.required],
            price: ['', Validators.required],
            no_of_plots: ['', Validators.required],
            description: ['', Validators.required]
        });

        this.addLandLocation = this.formBuilder.group({
            address: ['', Validators.required],
            state: [null, Validators.required],
            local_govt: ['', Validators.required],
            city: ['', Validators.required]
        });

        this.addLandPaymentPlan = this.formBuilder.group({
            square_meter: ['300 Sqmt', Validators.required],
            outright_plan: ['3 months', Validators.required],
            initial_deposit: ['', Validators.required],
            three_months_plan: ['Yes', Validators.required],
            six_months_plan: ['Yes', Validators.required],
            twelve_months_plan: ['Yes', Validators.required],
            eighteen_months_plan: ['Yes', Validators.required],
            twentyfour_months_plan: ['Yes', Validators.required]
        });


    }

    requiredFileType( control:File, type: Array<String> = ['jpg','png']) {
        if(control){
            
            const file  = control.name;

            if ( file ) {
                const ind = file.toString().lastIndexOf('.'); //kola.jpg
                const ex = file.toString().substring(ind); //.jpg
                const extension = ex.split('.')[1].toLowerCase(); //jpg
                //console.log(extension,'Extension');
                //check if extension of uploaded file matches one of the allowed mime types
                if(type.includes(extension.toLowerCase())===false){
                    return {
                        'requiredFileType': true
                    };
                }
                return null;
            }    
        }
        return null;
    }

    makeFresh(){
        localStorage.setItem('pid', '');
        if(localStorage.getItem('pid').toString() == ''){
            this.freshProperty = true;
        }else{
            this.freshProperty = false;
        }
    }

    ngOnInit() {

        if(localStorage.getItem('pid').toString() == ''){
            this.freshProperty = true;
        }else{
            this.freshProperty = false;
        }
        
        this.landService.loadStates().subscribe(data=>{
            this.states = data.body.state;
        });

        this.landService.loadFacilities().subscribe(data=>{
            this.facil = data.body.facilities;
            const formControls = this.facil.map(control=> new FormControl(false));

            this.addLandFacilities = this.formBuilder.group({
                fac: new FormArray(formControls)
            });

        });

        this.landService.loadPaymentPlan().subscribe(data=>{
            this.payment_plan = data.body.plans;
            var i = this.payment_plan;
            if(i.length>0){
                this.payment_plan_count = true;
            }
        });
    }
    


    // convenience getter for easy access to form fields
    get f() { return this.addLandInfoForm.controls; }
    get g() { return this.addLandLocation.controls; }
    get h() { return this.addLandPaymentPlan.controls; }
    get formData() { return <FormArray>this.addLandFacilities.get('fac'); }
    

    onLISubmit(){

        //console.log(this.addLandInfoForm);
        
        this.landService.addLandInfo(this.f.property_name.value, this.f.plot_size.value,this.f.price.value,this.f.no_of_plots.value,this.f.description.value)
            .subscribe(
                data => {
                    if(data.status == 200){
                        //store pid result of just added property
                        
                        localStorage.setItem('pid',data.body.land_info.pid);
                        this.landinfosubmitted = 'true';

                        //reset the form
                        setTimeout(()=>{
                            this.addLandInfoForm.reset();
                            this.landinfosubmitted = 'done';
                        }, 10000);
                        
                        
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

    onLLSubmit(){
        this.landService.addLandLocation(this.g.address.value, this.g.state.value,this.g.local_govt.value,this.g.city.value,localStorage.getItem('pid').toString())
            .subscribe(
                data => {
                    if(data.status == 200){
                        this.landinfosubmitted2 = 'true';

                        //reset the form
                        setTimeout(()=>{
                            this.addLandLocation.reset();
                            this.landinfosubmitted2 = 'done';
                        }, 10000);
                        
                        
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

    onLFSubmit(){
        //console.log(this.addLandFacilities.controls);

        //fetch fid of true values
        var truevalues=[];var res=[];
        var i = this.addLandFacilities.controls.fac.value; //this is an array
        i.forEach((element,index) => {
            if(element === true){
                truevalues.push(index);
            }
        });

        truevalues.forEach((e)=>{
            res.push(this.facil[e]['fid']);
        });

        //convert to string
        var res2 = res.join(',');
        
        //submit to db
        if(res.length>0){
            this.landService.addLandFacilities(res2,localStorage.getItem('pid').toString())
            .subscribe(
                data => {
                    if(data.status == 200){
                        this.landinfosubmitted3 = 'true';

                        //reset the form
                        setTimeout(()=>{
                            this.addLandFacilities.reset();
                            this.landinfosubmitted3 = 'done';
                        }, 5000);
                        
                        
                    }else{
                        this.landinfosubmitted3 = 'false';
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.landinfosubmitted3 = 'false';
                    }
                }
            );
        }else{
            this.landinfosubmitted3 = 'empty';
        }
    }

    onPPSubmit(){
        this.landService.addLandPaymentPlan(this.h.square_meter.value, this.h.outright_plan.value,this.h.initial_deposit.value,this.h.three_months_plan.value,this.h.six_months_plan.value,this.h.twelve_months_plan.value,this.h.eighteen_months_plan.value,this.h.twentyfour_months_plan.value,localStorage.getItem('pid').toString())
            .subscribe(
                data => {
                    if(data.status == 200){
                        this.landinfosubmitted4 = 'true';

                        //reset the form
                        setTimeout(()=>{
                            this.addLandPaymentPlan.reset();
                            this.landinfosubmitted4 = 'done';
                            //$('#onboardingFeaturesModal').modal('hide');
                        }, 10000);
                        
                        
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

    onFileSelected(event){
        this.selectedFile = <File>event.target.files[0];
        this.uploadText = this.selectedFile.name;
    }

    onFUSubmit(){
        
        if(this.selectedFile==null){
            this.landinfosubmitted5 = 'empty';
        }else{
            const res = this.requiredFileType(this.selectedFile);
            if(res){
                this.landinfosubmitted5 = 'false';
            }else{
                const formData = new FormData();
                formData.append('image', this.selectedFile, this.selectedFile.name);
                formData.append('pid', localStorage.getItem('pid').toString());

                let headers = new HttpHeaders({
                    'Foan-Token': localStorage.getItem('FRLS').toString()
                });
                    this.http.post(this.apiUrl+'/api/property/picture/upload', formData, {
                        headers:headers,
                        reportProgress: true,
                        observe: 'events'
                    }).subscribe(event=>{
                        if(event.type === HttpEventType.UploadProgress){
                            this.submittedSuccess=true;
                            this.progress = Math.round(event.loaded/event.total*100);
                        }else if(event.type === HttpEventType.Response){
                            if(event.status == 200){
                                this.landinfosubmitted5 = 'true';
                            }else{
                                this.landinfosubmitted5 = 'error';
                            }
                        }
                    }); 
                
            }
        }
    }
}