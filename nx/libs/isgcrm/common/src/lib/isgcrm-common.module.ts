import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    MenuComponent,
  ]
})
export class IsgcrmCommonModule {}
