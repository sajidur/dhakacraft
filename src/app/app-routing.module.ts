import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then(
        (m) => m.HomeModule
      ),
      pathMatch : 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then(
        (m) => m.AuthModule
      ),
      pathMatch : 'full'
  },
  {
    path: 'admin',
    loadChildren: () => 
    import('./admin/admin.module').then(
      (m) => m.AdminModule
    ),
    pathMatch : 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
