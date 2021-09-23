import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoutFormComponent } from './containers/logout-form/logout-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: LogoutFormComponent}
    ]),
  ],
  declarations: [
    LogoutFormComponent
  ],
})
export class EarthlinkLogoutModule {}
