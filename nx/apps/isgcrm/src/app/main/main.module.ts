
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { MainComponent } from './main.component';
import { IsgcrmCommonModule } from '@nx/isgcrm/common';
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'products',
            loadChildren: () => 
              import ('@nx/isgcrm/products').then(
                (module) => module.IsgcrmProductsModule
              ),
          }  
        ]
    }
];
@NgModule({
    imports: [
      IsgcrmCommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: [
      MainComponent
    ]
})
export class MainModule { }