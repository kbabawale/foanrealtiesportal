import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customertopbar',
  templateUrl: './customerTopBar.component.html'
})

export class CustomerTopBarComponent implements OnInit, OnDestroy {
  user_details: User = {
    UserID: 0,
    FirstName: '',
    LastName: '',
    UserRole: 0,
    Email: '',
    Password: '',
    MaritalStatus: '',
    DOB: '',
    Nationality: '',
    Address: '',
    PhoneNumber: '',
    ProfilePix: "../../assets/img/avatar1.jpg",
    NokName: '',
    NokAddress: '',
    NokEmail: '',
    NokNumber: '',
    EmployerName: '',
    EmployerAddress: '',
    EmployerNumber: '',
    EmploymentPosition: '',
    ReferralName: '',
    ReferralNumber: '',
    ReferralAddress: '',
    ReferralEmail: '',
    DateCreated: '',
    DateModified: ''
};

    constructor(
      private authenticationService: AuthenticationService,
      private UserService: UserService,
      private router: Router
    ) {
        
    }

    ngOnInit() {
      //get all details of admin
      this.UserService.getUserDetails3().subscribe(data=>{
          
          this.user_details.FirstName = data.user[0].firstname;
          this.user_details.LastName = data.user[0].lastname;
          
          
      });
    }

    ngOnDestroy() {
        
    }

    logout(){
      //destroy all localstorage entries
      localStorage.removeItem('FRLS-D');
      localStorage.removeItem('FRLS-T');
      localStorage.removeItem('FRLS');
      this.router.navigate(['/login']);
  }

    

    
}
