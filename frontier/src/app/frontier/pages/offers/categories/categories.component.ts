import { Component, OnInit } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { faTty } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  faWifi = faWifi;
  faVoice = faTty;
  faPlus = faPlus
  constructor() { }

  ngOnInit(): void {
  }

}
