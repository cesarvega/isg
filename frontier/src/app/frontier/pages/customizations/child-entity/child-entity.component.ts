import { Component, OnInit, Input } from '@angular/core';
import { ChildEntity } from '../../../utils/store/interfaces/quote';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { ChildEntityHelperService } from '../child-entity-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChildEntityConfigurationComponent } from './child-entity-configuration/child-entity-configuration.component';

@Component({
  selector: 'app-child-entity',
  templateUrl: './child-entity.component.html',
  styleUrls: ['./child-entity.component.css']
})
export class ChildEntityComponent implements OnInit {

  @Input() childEntity: ChildEntity;
  @Input() parentEntity: ChildEntity;
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  constructor(public childEntityHelperService: ChildEntityHelperService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  isEntitySelectable() {
    return this.childEntity.hasOwnProperty('Active')
  }

  shouldDisplayTitle() {
    return !(this.isEntityConfigurable() || this.isEntitySelectable())

  }

  isEntityConfigurable() {
    return this.childEntity.hasOwnProperty('ConfiguredValue')
  }



  shouldDisplay() {
    if (!this.childEntity.ChildEntity && !this.childEntity.hasOwnProperty('Active') && !this.childEntity.hasOwnProperty("ConfiguredValue"))
      return false
    if (!this.childEntity.ChildEntity && (this.childEntity.Active && !this.childEntity.ChangedManually) && !this.parentEntity)
      return false
    if (!this.childEntity.ChildEntity)
      return true
    return this.getChildrenSelectedOptions() != this.childEntity.ChildEntity.length;
  }



  getChildrenSelectedOptions(): Number {
    let counter = 0;
    for (let iterateChildEntity of this.childEntity.ChildEntity) {
      if (iterateChildEntity.Active && !iterateChildEntity.ChangedManually)
        counter++
    }
    return counter;
  }
  open() {
    const modalRef = this.modalService.open(ChildEntityConfigurationComponent);
    modalRef.componentInstance.childEntity = this.childEntity;
  }

}
