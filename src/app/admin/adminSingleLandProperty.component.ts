import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LandService } from '../_services/land.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-adminsinglelandproperty',
    templateUrl: './adminSingleLandProperty.component.html'
})

export class AdminSingleLandPropertyComponent implements OnInit {
    
    land:any;
    pid: any;

    constructor(private http:HttpClient,
                private landservice: LandService,
                private route: ActivatedRoute,
                private router: Router){

    }

    ngOnInit() {
        this.pid = this.route.snapshot.paramMap.get('pid');
        this.landservice.loadProperty(this.pid).subscribe(data=>{
            if(data.status == 200){
                this.land = data.body.property;
            }
        });
    }
}