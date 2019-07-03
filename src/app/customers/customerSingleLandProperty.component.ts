import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LandService } from '../_services/land.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {environment} from '../../environments/environment';
import {FormGroup, FormBuilder,FormControl, Validators} from '@angular/forms';
import { UserService } from '../_services/user.service';
import {Location} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-customersinglelandproperty',
    templateUrl: './customerSingleLandProperty.component.html'
})

export class CustomerSingleLandPropertyComponent {
    land:any;
    documentcount:Boolean=false;
    rulecount:Boolean=false;
    pid: any;
    imagea: any;
    hostURL:String = environment.apiUrl2;
    addLandRealtor: FormGroup;
    realtors:any;
    landinfosubmitted1 = 'done';
    src: string;
  private src$;

  dataUrl$;

  constructor(private http:HttpClient,
            private landservice: LandService,
            private userservice: UserService,
            private route: ActivatedRoute,
            private router: Router,
            private formBuilder: FormBuilder,
            private location: Location,
            private domSanitizer: DomSanitizer
    ){
    
    
  }

  ngOnInit(): void {
      
      this.pid = this.route.snapshot.paramMap.get('pid');
        this.landservice.loadProperty(this.pid).subscribe(data=>{
            if(data.status == 200){
                this.land = data.body.property;
                //console.log(this.land);
                this.imagea = data.body.property.images[0].filename.toString();
                
                var t = data.body.property.agreements;
                if(t.length > 0){
                    this.documentcount = true;
                    this.rulecount = true;
                }else{
                    this.documentcount = false;
                    this.rulecount = false;
                }


                this.src = this.hostURL+this.pid+'/'+this.imagea;
                // console.log(this.src, 'Image');
                this.src$ = new BehaviorSubject(this.src);
                this.dataUrl$ = this.src$.switchMap(url => { 
                    
                    return this.http.get(url, {responseType: 'blob'})
                    .map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)));
                });      

            }
        });
  }

}