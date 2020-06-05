import { FirstPageComponent } from './components/first-page/first-page.component';
import { SecondPageComponent } from './components/second-page/second-page.component';
import { ThirdPageComponent } from './components/third-page/third-page.component';
import { FourthPageComponent } from './components/fourth-page/fourth-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: "/page1"},
  {path: 'page1', component: FirstPageComponent, data: {animation: 'First'}},
  {path: 'page2', component: SecondPageComponent, data: {animation: 'Second'}},
  {path: 'page3', component: ThirdPageComponent, data: {animation: 'Third'}},
  {path: 'page4', component: FourthPageComponent, data: {animation: 'Fourth'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
