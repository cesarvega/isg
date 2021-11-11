import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { TableModule } from 'primeng/table';

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
