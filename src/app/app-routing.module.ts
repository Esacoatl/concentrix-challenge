import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /** Use of lazy loading routes, in this case with the main pages module */
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((module) => module.PagesModule),
  },
  /** default path */
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
