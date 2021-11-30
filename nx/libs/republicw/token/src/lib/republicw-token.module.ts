import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './components/token/token.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'', pathMatch:'full', component: TokenComponent}
    ]),
  ],
  declarations: [
    TokenComponent
  ],
})
export class RepublicwTokenModule {}
