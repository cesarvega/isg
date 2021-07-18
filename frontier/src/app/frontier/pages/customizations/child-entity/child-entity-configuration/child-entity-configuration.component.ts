import { Component, OnInit, Input } from '@angular/core';
import { ConfiguredValue, ChildEntity } from '../../../../utils/store/interfaces/quote';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-child-entity-configuration',
  templateUrl: './child-entity-configuration.component.html',
  styleUrls: ['./child-entity-configuration.component.css']
})
export class ChildEntityConfigurationComponent implements OnInit {

  @Input() childEntity: ChildEntity;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  clearForm() {
    for (let configureValue of this.childEntity.ConfiguredValue) {
      if (configureValue.Value) {
        configureValue.Value[0].Value = ""
      }
    }
  }

  get ConfiguredValues() { return this.childEntity.ConfiguredValue; }

}
