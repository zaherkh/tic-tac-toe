import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css']
})
export class GameComponentComponent implements OnInit {

  playerName: string = '';

  huPlayer:string = 'O';
  aiPlayer:string = 'X';

  board: string[] = [];

  isGameOver: boolean = false;
  winnerName: string = '';

  huPlayerScore: number = 0;
  aiPlayerScore: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.playerName = localStorage.getItem('playerName') as string;
    if(this.playerName == '') {
      this._router.navigate(['main']);
    }

    this.setup();

    let origBoard:any = ["O",1 ,"X","X",4 ,"X", 6 ,"O","O"];    
  }

  setup():any {
    this.isGameOver = false;
    this.winnerName = '';
    this.board = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  }

  // returns list of the indexes of empty spots on the board
  emptyIndexes(board: any){
    return board.filter((s:any) => s != this.huPlayer && s != this.aiPlayer);
  }

  // winning combinations using the board indexes
  winning(board:any, player: any){
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
      }  else {
      return false;
      }
  }

  minimax(newBoard: any, player: any):any {
    
    //available spots
    var availSpots = this.emptyIndexes(newBoard);
    

    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (this.winning(newBoard, this.huPlayer)){
      return {score:-10};
    }
    else if (this.winning(newBoard, this.aiPlayer)){
      return {score:10};
    }
    else if (availSpots.length === 0){
      return {score:0};
    }

  // an array to collect all the objects
    let moves = [];

    // loop through available spots
    for (let i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      let move: any = {};
      move.index = newBoard[availSpots[i]];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == this.aiPlayer){
        let result = this.minimax(newBoard, this.huPlayer);
        move.score = result.score;
      }
      else{
        let result = this.minimax(newBoard, this.aiPlayer);
        move.score = result.score;
      }

      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestMove: any;
    if(player === this.aiPlayer){
      let bestScore = -10000;
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{

  // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

  // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
  }

  makeMove(index:number) {
    if (this.isGameOver) return;
    
    if(this.board[index] != this.huPlayer && this.board[index] != this.aiPlayer) {
      this.board[index] = this.huPlayer;
      
      let winning: boolean = this.winning(this.board, this.huPlayer);
      if(winning) {
        this.declareWinning(this.huPlayer);
      }
      this.makeAiMove();
    }
  }

  makeAiMove() {
    let bestSpot:any = this.minimax(this.board, this.aiPlayer);
    this.board[bestSpot.index] = this.aiPlayer;

    let winning: boolean = this.winning(this.board, this.aiPlayer);
    if(winning) {
      this.declareWinning(this.aiPlayer);
    }
  }

  display(val: any) {
    return (val == this.huPlayer || val == this.aiPlayer) ? val : '';
  }

  declareWinning(player: string) {
    this.isGameOver = true;
    if (player == this.huPlayer) {
      this.huPlayerScore++;
      this.winnerName = 'You';
    } else {
      this.aiPlayerScore++;
      this.winnerName = 'I';
    }
  }

}
