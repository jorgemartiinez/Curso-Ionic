import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'account',
        loadChildren: () => import ('../avatar/avatar.module').then(m => m.AvatarPageModule),
      },
      {
        path: 'contact',
        loadChildren: () => import ('../lista/lista.module').then(m => m.ListaPageModule),
      },
      {
        path: 'settings',
        loadChildren: () => import ('../infinite-scroll/infinite-scroll.module').then(m => m.InfiniteScrollPageModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
