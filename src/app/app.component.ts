import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'tic-tac-toe';

  form = new FormGroup({
    playerName: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private _router: Router
  ) {
    
  }

  startGame() {
    let playerName = this.form.controls.playerName.value;
    console.log('playerName: ', playerName);
    this._router.navigate(['game']);
  }
}
