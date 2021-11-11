import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'nx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  partners: any = [
    {value: 1, name: 'Att'},
    {value: 2, name: 'Dish'},
    {value: 3, name: 'Earthlink'},
    {value: 4, name: 'Frontier'},
  ];

  products=[
    {id: 1, type: 'Video', description: 'Product video 1 description', features: '[34,35]', revenue: '123', start:'01/30/2020', end:'01/11/2021'},
    {id: 2, type: 'Video', description: 'Product video 2 description', features: '[36,37]', revenue: '124', start:'01/30/2020', end:'01/11/2021'},
    {id: 3, type: 'Video', description: 'Product video 3 description', features: '[38,39]', revenue: '125', start:'01/30/2020', end:'01/11/2021'},
    {id: 4, type: 'Video', description: 'Product video 4 description', features: '[40,41]', revenue: '126', start:'01/30/2020', end:'01/11/2021'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
