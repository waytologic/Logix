import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CardsComponent } from '../pages/cards/cards.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children:[
      { path:'dashboard',component:DashboardComponent,title:'Dashboard'},
      { path:'cards',component:CardsComponent,title:'Card List'},
    ]
  },
  {path:'',redirectTo:'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
