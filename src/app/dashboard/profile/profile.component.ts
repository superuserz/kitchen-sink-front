import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    name: 'Manmeet Devgun',
    email: 'manmeet.devgun@nagarro.com'
  };
}
