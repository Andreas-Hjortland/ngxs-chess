import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./host/host.module').then((m) => m.HostModule),
    pathMatch: 'full',
  },
  {
    path: 'join/:id',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
