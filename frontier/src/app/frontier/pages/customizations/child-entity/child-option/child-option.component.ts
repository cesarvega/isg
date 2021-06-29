import { Component, OnInit, Input } from '@angular/core';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { ChildEntity } from '../../../../utils/store/interfaces/quote';

@Component({
  selector: 'app-child-option',
  templateUrl: './child-option.component.html',
  styleUrls: ['./child-option.component.css']
})
export class ChildOptionComponent implements OnInit {

  @Input() childEntity: ChildEntity
  @Input() parentEntity: ChildEntity
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;

  constructor() { }

  ngOnInit(): void {
  }


  shouldDisplayOption() {
    return this.childEntity.hasOwnProperty('Active')
  }

  isCustomizationComplete() {
    return (this.childEntity.minimumActiveChildEntities >= this.getChildrenSelectedOptions() || !this.parentEntity)
  }


  getChildrenSelectedOptions(): Number {
    let counter = 0;
    for (let iterateChildEntity of this.childEntity.ChildEntity) {
      if (iterateChildEntity.Active)
        counter++
    }
    return counter;
  }


  canActivate() {
    this.childEntity.ChangedManually = true;
    if (!this.parentEntity)
      return true
    // Validate when is multiple choice
    if (this.parentEntity.maximumActiveChildEntities == 1 && this.getParentSelectedOptions() > 0) {
      this.parentEntity.ChildEntity = this.parentEntity.ChildEntity.map((iterateChildEntity: ChildEntity) => {
        iterateChildEntity.Active = false;
        return iterateChildEntity
      })

      return true;
    }
    // Validate if there are choices left
    return this.getParentSelectedOptions() < parseInt(this.parentEntity.maximumActiveChildEntities)
  }


  areOptionsAlreadySelected() {
    if (this.parentEntity)
      return this.getParentSelectedOptions() >= this.parentEntity.minimumActiveChildEntities
    return false
  }

  getParentSelectedOptions(): Number {
    let counter = 0;
    for (let iterateChildEntity of this.parentEntity.ChildEntity) {
      if (iterateChildEntity.Active)
        counter++
    }
    return counter;
  }

}