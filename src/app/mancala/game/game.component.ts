import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  form!: FormGroup;
  isSubmitted  =  false;

  constructor(public gameService: GameService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstPlayer: new FormControl('', [Validators.required]),
      secondPlayer: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.isSubmitted = true;
    this.gameService.create(this.form.value.firstPlayer, this.form.value.secondPlayer).subscribe((res: any) => {
      console.log(res.id);
      console.log('Game created successfully!');
      this.router.navigateByUrl('mancala/'+res.id+'/start-game');
    })
  }

}
