import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children:[
      { path:'dashboard',component:DashboardComponent,title:'Dashboard'},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
