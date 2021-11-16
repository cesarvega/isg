import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ViewComponent}
    ]),
  ],
  declarations: [
    ViewComponent
  ],
  exports:[
    ViewComponent
  ]
})
export class IsgcrmViewModule {}
