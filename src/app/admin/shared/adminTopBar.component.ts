import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from '../../_models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admintopbar',
  templateUrl: './adminTopBar.component.html'
})

export class AdminTopBarComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}
