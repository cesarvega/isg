import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule} from 'primeng/messages';
import { MessageModule} from 'primeng/message';

@NgModule({
  imports: [
    MessageModule,
    MessagesModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: LoginComponent }
    ]),
    ReactiveFormsModule,

  ],
  declarations: [
    LoginComponent
  ],
  exports:[
    LoginComponent,
  ]
})
export class IsgcrmLoginModule {}
