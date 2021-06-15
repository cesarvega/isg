import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AddressSearchResponseItemInterface } from '../../services/interfaces/qualification/address-search-response';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent implements OnInit {

  @Input() addresses = []
  @Output() selectAddress = new EventEmitter<AddressSearchResponseItemInterface>();
  faTimes = faTimes;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  getUnparsedAddress(addressItem: AddressSearchResponseItemInterface) {
    let address = addressItem.address;
    const { addressLine1, addressLine2, city, stateProvince, zipCode } = address;
    return `${addressLine1} ${addressLine2} ${city}, ${stateProvince} ${zipCode}`

  }

  onSelectAddress(address) {
    this.selectAddress.emit(address);
  }

}
