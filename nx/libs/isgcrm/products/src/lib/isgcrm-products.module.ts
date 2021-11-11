import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {MenuItem, PrimeIcons} from 'primeng/api';


export interface Product {
  type: any;
  description: any;
  features: any;
  revenue: any;
  start: any;
  end: any;
}

@NgModule({
  imports: [
    FormsModule,
    DropdownModule,
    TableModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ProductsComponent}
    ])
  ],
  declarations: [
    ProductsComponent
  ],
})
export class IsgcrmProductsModule {}
