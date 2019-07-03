import { Component, OnInit } from "@angular/core";
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-realtorDashboard',
    templateUrl: './realtorDashboard.component.html'
})

export class RealtorDashboardComponent implements OnInit {
    
    downlines:any;
    downline_count:any;

    constructor(private userservice: UserService){

    }

    ngOnInit(): void {
       
        this.userservice.loadDownlines(localStorage.getItem('FRLS-D').toString()).subscribe(data=>{
        if(data.status==200){
            var cc1 = data.body.downlines.Generation_1.length;
            var cc2 = data.body.downlines.Generation_2.length;
            var cc3 = data.body.downlines.Generation_3.length;
            this.downline_count = cc1+cc2+cc3;

            if(data.body.downlines.Generation_1.length > 0){
                var dat = data.body.downlines.Generation_1;
                this.downlines = dat.splice(0,2);
                console.log(this.downlines);
            }
        }
       });
        
    }
}
