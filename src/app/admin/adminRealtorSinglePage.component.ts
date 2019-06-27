import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap, RouterEvent, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-adminrealtorsinglepage',
    templateUrl: './adminRealtorSinglePage.component.html'
})

export class AdminRealtorSinglePageComponent {
    rid: any;
    realtors:any;
    downlines:any;
    destroyed = new Subject<any>();

    constructor(private route: ActivatedRoute,
        private http:HttpClient,
        private CustomerService:UserService,
        private Router: Router){

            

    }


    ngOnInit(){
        
        this.rid = this.route.snapshot.paramMap.get('rid');
        this.CustomerService.loadRealtor(this.rid).subscribe(data=>{
            if(data.status == 200){
              this.realtors = data.body.user[0];
            }
        });

        this.CustomerService.loadDownlines(this.rid).subscribe(data=>{
            if(data.status == 200){
              this.downlines = data.body.downlines;
            }
        });

        this.Router.events.pipe(
            filter((event: RouterEvent)=>event instanceof NavigationEnd),takeUntil(this.destroyed))
            .subscribe(()=>{
                this.rid = this.route.snapshot.paramMap.get('rid');
                this.CustomerService.loadRealtor(this.rid).subscribe(data=>{
                    if(data.status == 200){
                        this.realtors = data.body.user[0];
                    }
                });

                this.CustomerService.loadDownlines(this.rid).subscribe(data=>{
                    if(data.status == 200){
                        this.downlines = data.body.downlines;
                    }
                });
            });
        
    }

    navigateToRoute(path:String){
        this.Router.navigate([path]);
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
        
    }


}