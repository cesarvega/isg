import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartDetailsComponent,
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    CartDetailsComponent,
  ]
})
export class EarthlinkSharedModule {}
