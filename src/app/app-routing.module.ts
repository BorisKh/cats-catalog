import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {CatPageComponent} from "./cat-page/cat-page.component";


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'cat/:id', component: CatPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
