import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'nx-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
  ) { }

  partnerId: any = null;
  partnerName: any = null;

    productType: any =[
      {id: null, name:'---'},
      {id: 1, name: 'Video'},
      {id: 2, name: 'Audio'},
      {id: 3, name: 'Internet'},
    ]

    featureType: any =[];

  ngOnInit(): void {
    if( localStorage.getItem('partnerName') ){
      this.partnerName = localStorage.getItem('partnerName');
    }
    this.partnerId = this.actRoute.snapshot.paramMap.get('partnerId');
  }

  selectedType(pType: any){
    console.log( pType.value );
    this.featureType =[
      {id: null, name:'---'},
      {id: 1, name: '23'},
      {id: 2, name: '45,56'},
      {id: 3, name: '99'},
    ];
  }

  selectedFeature( fType: any ){
    console.log( fType.value );
  }

  goPartners(){
    if(this.partnerId){
      this.route.navigate(['products']);
    }
  }
}
