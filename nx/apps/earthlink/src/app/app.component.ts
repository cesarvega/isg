import { Component } from '@angular/core';
import { faBars, faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'earthlink';
  faBars = faBars;
  faCoffee = faCoffee;
}
