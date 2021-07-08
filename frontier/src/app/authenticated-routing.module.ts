import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'frontier',
                loadChildren: () => import('./frontier/frontier-routing.module')
                    .then(m => m.FrontierRoutingModule),
            },
            { path: '', redirectTo: 'frontier', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }