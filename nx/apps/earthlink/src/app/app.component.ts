import { Component } from '@angular/core';
import { faBars, faCoffee, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../environments/environment';

@Component({
  selector: 'nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'earthlink';
  faBars = faBars;
  faCoffee = faCoffee;
  faExclamationCircle = faExclamationCircle;
  apiURL = environment.apiURL;
}
