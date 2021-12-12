import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [{path:'',component: MainComponent}, {path:'**',component: NotfoundComponent}] 

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
