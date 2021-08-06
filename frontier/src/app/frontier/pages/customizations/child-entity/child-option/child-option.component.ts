import { Component, OnInit, Input } from '@angular/core';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChildEntity } from '../../../../utils/store/interfaces/quote';
import { ChildEntityService } from '../../helpers/child-entity.service';
import { ChildEntityConfigurationComponent } from '../child-entity-configuration/child-entity-configuration.component';

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

  constructor(private modalService: NgbModal, private childEntityService: ChildEntityService) { }

  ngOnInit(): void {
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

  selectOption() {
    debugger
    if (!this.childEntity.Active) {
      if (this.canActivate()) {
        this.childEntityService.selectCustomization(this.childEntity);
      }
      if (this.childEntity.ConfiguredValue)
        this.openConfigurationForm();
    }
    else {
      debugger
      this.childEntity.Active = false;
      this.childEntityService.removeCustomization(this.childEntity);
    }
  }


  canActivate() {
    this.childEntity.ChangedManually = true;
    if (!this.parentEntity)
      return true
    // Validate when is multiple choice
    if (this.parentEntity.maximumActiveChildEntities == 1 && this.getParentSelectedOptions() > 0) {
      this.parentEntity.ChildEntity = this.parentEntity.ChildEntity.map((iterateChildEntity: ChildEntity) => {
        this.childEntityService.removeCustomization(iterateChildEntity);
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

  openConfigurationForm() {
    const modalRef = this.modalService.open(ChildEntityConfigurationComponent);
    modalRef.componentInstance.childEntity = this.childEntity;
  }

}
