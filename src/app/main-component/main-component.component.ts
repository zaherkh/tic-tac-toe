import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  form = new FormGroup({
    playerName: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private _router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  startGame() {
    let playerName: string = this.form.controls.playerName.value as string;
    localStorage.setItem('playerName', playerName);
    this._router.navigate(['game']);
  }

}
