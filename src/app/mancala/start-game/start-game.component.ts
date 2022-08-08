import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-play-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})

export class StartGameComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
   
  }
}
