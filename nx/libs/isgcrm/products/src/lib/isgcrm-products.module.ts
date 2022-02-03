import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
//import { MenuItem, PrimeIcons} from 'primeng/api';
import { MessagesModule} from 'primeng/messages';
import { MessageModule} from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

export interface Catalog {
  type: any;
  description: any;
  features: any;
  revenue: any;
  start: any;
  end: any;
}

@NgModule({
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
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
