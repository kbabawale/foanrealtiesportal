import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'foanrealties';

  constructor(private auth:AuthenticationService){

  }

  ngOnInit(): void {
    this.auth.setToken();
  }
}
