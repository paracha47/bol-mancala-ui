import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MancalaRoutingModule } from './mancala-routing.module';
import { GameComponent } from './game/game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartGameComponent } from './start-game/start-game.component';


@NgModule({
  declarations: [
    GameComponent,
    StartGameComponent
  ],
  imports: [
    CommonModule,
    MancalaRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class MancalaModule { }
