import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { ChangeDetectorRef } from '@angular/core'

export interface Players {
  name: string;
}

export interface Pit {
  id: number;
  stones: number;
}

export interface Game {
  id: string;
  pits: Array<Pit>;
  playerTurn: string;
  players: Array<Players>;
  winner: string;
}


@Component({
  selector: 'app-play-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})

export class StartGameComponent implements OnInit {

  game!: Game;
  gameId!: string;
  pits: Array<Pit> = [];
  firstPlayerBigPit: number = 0;
  secondPlayerBigPit: number = 0;
  playerTurn: string = '';
  playerName: string = '';
  players: Array<Players> = [];
  winnerName: string = '';
  winnerScore: number = 0;
  winnerMessage: string = '';
  isGameOver: boolean = false;

  constructor(private ref: ChangeDetectorRef, public gameService: GameService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['gameId'];
    this.getGame();
  }

  getGame() {
    this.gameService.getGameById(this.gameId).subscribe(
      (data) => {
        debugger

        this.pits = data.pits;
        this.firstPlayerBigPit = data.pits[6].stones;
        this.secondPlayerBigPit = data.pits[13].stones;
        this.playerTurn = data.playerTurn;
        this.playerName = this.playerTurn === 'PLAYER_A' ? data.players[0].name : data.players[1].name;
        this.players = data.Players;
        debugger
        if (data.winner) {
          this.isGameOver = true;
          this.winnerName = data.winner.playerName != ''  ? data.winner.playerName : '';
          this.winnerScore = data.winner.score != 0 ? data.winner.score : 0;
          this.winnerMessage = data.winner.message != '' ? data.winner.message : '';
        }

      },
      (error) => {
        console.log(`error status : ${status} `);
        console.log(`error error : ${error.message} `);
      })
  }

  sow(pitIndex: number, player: string) {
    this.gameService.sow(this.gameId, pitIndex).subscribe(
      (data) => {
        this.pits = data.pits;
        this.playerTurn = data.playerTurn.toLowerCase;
        this.playerName = this.playerTurn === 'PLAYER_A' ? data.players[0].name : data.players[1].name;
        this.players = data.Players;

        let currentUrl = '/mancala/' + this.gameId + '/start-game';
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      },
      (error) => {
        console.log(`error status : `, error);
        console.log(`error error :  //// ${error.message}`);
      })
  }
}
