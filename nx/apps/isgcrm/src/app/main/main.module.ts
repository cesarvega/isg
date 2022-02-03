
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
            path: 'catalog',
            loadChildren: () => 
              import ('@nx/isgcrm/catalog').then((module) => module.IsgcrmCatalogModule
              ),
          },
          {
            path: 'product/edit/:partnerId/:catalogId',
            loadChildren: () =>
              import('@nx/isgcrm/edit').then((module) => module.IsgcrmEditModule),
          },
          {
            path: 'product/view/:catalogId',
            loadChildren: () =>
              import('@nx/isgcrm/view').then((module) => module.IsgcrmViewModule),
          },
          {
            path: 'catalog/new/:partnerId',
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