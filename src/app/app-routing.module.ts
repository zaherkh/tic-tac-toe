import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { MainComponentComponent } from './main-component/main-component.component';

const routes: Routes = [
  {path: 'main', component: MainComponentComponent},
  {path: 'game', component: GameComponentComponent},
  { path: '**', component: MainComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
