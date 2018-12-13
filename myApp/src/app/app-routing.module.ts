import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //{ path: 'list', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'details', loadChildren: './details/details.module#DetailsPageModule' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'create', loadChildren: './create/create.module#CreatePageModule' },
  { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
