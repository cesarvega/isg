import { Component, Input, OnInit } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { faTty } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../utils/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() categories: Category[]
  faWifi = faWifi;
  faVoice = faTty;
  faPlus = faPlus
  constructor() { }

  ngOnInit(): void {
  }

  activateCategory(category: Category) {
    this.categories = this.categories.map((category) => {
      category.active = false;
      return category;
    })
    category.active = !category.active;
  }

  getIcon(icon: string) {
    switch (icon) {
      case "faWifi":
        return faWifi;
      case "faVoice":
        return this.faVoice;
      case "faPlus":
        return this.faPlus;
    }
  }

}
