import { Component, OnInit } from "@angular/core";
import { LandService } from '../_services/land.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-adminallland',
    templateUrl: './adminAllLand.component.html'
})

export class AdminAllLandComponent implements OnInit{
    errorMessage: any;
    hostURL:String;
    myDate = new Date();
    lands: any;
    searchTermResults:any='All Properties';

    
    constructor(
        private landservice: LandService,
        private http: HttpClient
    ) {
        
    }

    

    ngOnInit(): void {

        this.myDate = new Date();

        this.landservice.loadProperties().subscribe(data=>{
            if(data.status == 200){
                this.lands = data.body.property;
                //console.log(this.lands[0].location[0]);
            }
        });
        
    }

    

    loadAllProperties(){
        this.landservice.loadProperties().subscribe(data=>{
            if(data.status == 200){
                this.lands = data.body.property;
                //console.log(this.lands[0].location[0]);
            }
        });
    }
    
    
}