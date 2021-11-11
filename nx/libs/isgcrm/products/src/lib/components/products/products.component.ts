import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'nx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  partners: any = [
    {id: 0, name:'---'},
    {id: 1, name: 'Att'},
    {id: 2, name: 'Dish'},
    {id: 3, name: 'Earthlink'},
    {id: 4, name: 'Frontier'},
  ];

  loading: boolean = false;
  
  constructor(
    private router: Router,
  ) { }

  products: any = [];
  partnerId: any = null;

  ngOnInit(): void {
    if( localStorage.getItem('partnerId') ){
      this.partnerId = localStorage.getItem('partnerId');
      this.selectedPartner(this.partnerId)
    }
  }

  selectedPartner(id: any){
    this.products = [];
    this.loading = true;

    setTimeout(()=>{
      this.loading = false;
      this.products=[
        {id: 1, type: 'Video', description: 'Product video 1 description', features: '[34,35]', revenue: '123', start:'01/30/2020', end:'01/11/2021'},
        {id: 2, type: 'Video', description: 'Product video 2 description', features: '[36,37]', revenue: '124', start:'01/30/2020', end:'01/11/2021'},
        {id: 3, type: 'Video', description: 'Product video 3 description', features: '[38,39]', revenue: '125', start:'01/30/2020', end:'01/11/2021'},
        {id: 4, type: 'Video', description: 'Product video 4 description', features: '[40,41]', revenue: '126', start:'01/30/2020', end:'01/11/2021'},
      ];
    }, 1000);
    localStorage.setItem('partnerId', id);
    console.log(id);
    this.partnerId = id;
  }

  selectedProduct(id: any){
    debugger;
    if( !this.partnerId ){alert('Choose Partner'); return;}
    this.router.navigate(['product/edit/' + this.partnerId + '/' + id]);
  }
}
