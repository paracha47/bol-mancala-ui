import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartGameComponent } from './start-game/start-game.component';

const routes: Routes = [
  { path: 'mancala/game', component: GameComponent },
  { path: 'mancala/:gameId/start-game', component: StartGameComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MancalaRoutingModule { }
