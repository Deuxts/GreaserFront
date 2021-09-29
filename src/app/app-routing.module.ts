import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Hash } from 'crypto';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./@public/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./@public/pages/contact/contact.module').then(m => m.ContactModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
