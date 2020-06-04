import { FirstPageComponent } from './components/first-page/first-page.component';
import { SecondPageComponent } from './components/second-page/second-page.component';
import { ThirdPageComponent } from './components/third-page/third-page.component';
import { FourthPageComponent } from './components/fourth-page/fourth-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'page1', component: FirstPageComponent},
  {path: 'page2', component: SecondPageComponent},
  {path: 'page3', component: ThirdPageComponent},
  {path: 'page4', component: FourthPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
