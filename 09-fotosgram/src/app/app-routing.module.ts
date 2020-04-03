import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
        canLoad: [ UsuarioGuard ] // proteger ruta de lazyload
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule)
    },
    {
        path: '',
        pathMatch: 'full', // redirect al main, si no estamos autenticados moverá al login
        redirectTo: 'main/tabs/tab1'
    },
    {
        path: '**', // ruta desconocida, redirige a login
        redirectTo: 'login',
      },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), HttpClientModule ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
