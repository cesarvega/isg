
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
          },
          {
            path: 'product/edit/:partnerId/:productId',
            loadChildren: () =>
              import('@nx/isgcrm/edit').then((module) => module.IsgcrmEditModule),
          },
          {
            path: 'product/view/:productId',
            loadChildren: () =>
              import('@nx/isgcrm/view').then((module) => module.IsgcrmViewModule),
          },
          {
            path: 'product/new/:partnerId',
            loadChildren: () =>
              import('@nx/isgcrm/edit').then((module) => module.IsgcrmEditModule),
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