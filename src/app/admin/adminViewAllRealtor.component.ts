import { Component, OnInit } from "@angular/core";
import { UserService } from '../_services/user.service';


@Component({
    selector: 'app-viewallrealtor',
    templateUrl: './adminViewAllRealtor.component.html'
})

export class AdminViewAllRealtorComponent implements OnInit {
    realtors:any;
    typedTerm:any;
    constructor(
        private UserService: UserService
    ) {
        
    }

    ngOnInit(): void {
        this.UserService.loadRealtors().subscribe(data=>{
            this.realtors = data.body.user;
            //console.log(this.customers);
        });
    }
}