import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { faTty } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../utils/categories';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Output() onSelectCategoryEvent = new EventEmitter<string>();
  @Input() categories: Category[]
  faWifi = faWifi;
  faVoice = faTty;
  faPlus = faPlus
  faShieldAlt = faShieldAlt;
  constructor() { }

  ngOnInit(): void {
  }

  activateCategory(category: Category) {
    this.categories = this.categories.map((category) => {
      category.active = false;
      return category;
    })
    category.active = !category.active;
    if (category.active)
      this.onSelectCategoryEvent.emit(category.value);
  }


  getIcon(icon: string) {
    switch (icon) {
      case "faWifi":
        return faWifi;
      case "faVoice":
        return this.faVoice;
      case "faShieldAlt":
        return this.faShieldAlt;
    }
  }

}
