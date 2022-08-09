import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';

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
  winner:string;
}


@Component({
  selector: 'app-play-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})

export class StartGameComponent implements OnInit {
 
  game!:Game;  
  gameId!:string;
  pits: Array<Pit> = [];
  firstPlayerBigPit: number = 0;
  secondPlayerBigPit: number = 0;
  playerTurn: string = '';
  playerName: string = '';
  players: Array<Players> = [];
  winnerName: string = '';
  winnerScore: number = 0;
  winnerMessage: string = '';
  isGameOver : boolean = false;

  constructor(public gameService: GameService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['gameId'];
    this.getGame();
    this.isGameOver = this.isGameOver;
    console.log(this.gameId);
  }

    getGame() {
      this.gameService.getGameById(this.gameId).subscribe(
        (data) => {
          console.log(data);
          this.pits = data.pits;
          this.firstPlayerBigPit = data.pits[6].stones;
          this.secondPlayerBigPit = data.pits[13].stones;
          this.playerTurn = data.playerTurn;
          this.playerName = this.playerTurn === 'PLAYER_A' ? data.players[0].name : data.players[1].name;
          this.players = data.Players;
          console.log("pits ",this.pits);
          console.log("Players ",data.players);

        },
        (error) => {
          console.log(`error status : ${status} `);
          console.log(`error error : ${error.message} `);
          window.alert(
          ` error status : ${status} ${error.message},\n error message : ${error.message}`);

      })
  }

  sow(pitIndex:number, player:string) {
    console.log(this.gameId);

    this.gameService.sow(this.gameId, pitIndex).subscribe(
      (data) => {
        this.pits = data.pits;
        this.playerTurn = data.playerTurn.toLowerCase;
        this.playerName = this.playerTurn === 'PLAYER_A' ? data.players[0].name : data.players[1].name;
        this.players = data.Players;
        this.isGameOver = true;
        this.winnerName = "data.winner.playerName";
        console.log(this.winnerName);

        if(data.winner){
          console.log(data.winner);
          this.winnerName = "data.winner.playerName";
          this.winnerScore = data.winner.score;
          this.winnerMessage = data.winner.message;
          // window.alert(
          //   `${this.winnerName} is the game WINNER!! \n 
          //   with score Highest score ${this.winnerScore} \n
          //   ${this.winnerMessage}`);
        }
      },
      (error) => {
        console.log(`error status : `,error);
        // console.log(`error error : ${error.error.message} //// ${error.message}`);
        // window.alert(
        //   ` error status : ${error}`);

      })
      let currentUrl = '/mancala/'+this.gameId+'/start-game';
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
      
  }
}
