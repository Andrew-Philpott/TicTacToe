class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }

  getSymbol() {
    return this.symbol;
  }
}

class Space {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.mark = 0;
  }
  setMark(playerMark) {
    this.mark = playerMark;
  }
  getMark() {
    return this.mark;
  }
  getCoordinates() {
    return [this.x, this.y];
  } 
}

class Board {
  constructor(spacesArray) {
    this.board = spacesArray;
  };

  getSpace(x,y) {
    return this.board[x][y];
  }

  print() {
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++) {
        console.log(this.board[row][col].getCoordinates() + " " + this.board[row][col].getMark());
      }
    }
  }
}

class Game {
  constructor() {
    this.playerX = new Player("X");
    this.playerO = new Player("O");
    this.currentPlayer = this.playerX;
    this.board = this.makeBoard();
  }

  makeBoard() {
    let spacesArray = [[],[],[]];
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++) {
        let newSpace = new Space(row, col);
        spacesArray[row][col] = newSpace;
      }
    }
    return (new Board(spacesArray));
  }
  
  checkColumns() {
    for(let row = 0; row < this.board.length; row++) {
      let columns = [];
      for(let col = 0; col < 3; col++) {
        columns.push(this.board.getSpace(row,col).getMark());
      }
      if(columns[0] == columns[1] == columns[2]) {
        return true;
      }
    }
    return false;
  }

  checkRows() {
    for(let col = 0; col < this.board.length; col++) {
      let rows = [];
      for(let row = 0; row < 3; row++) {
        rows.push(this.board.getSpace(row,col).getMark());
      }
      if(rows[0] == rows[1] == rows[2]) {
        return true;
      }
    }
    return false;
  }
  //switch current player through game object
  switchPlayer(currentPlayer){
    if(currentPlayer == this.playerX) {
      this.currentPlayer = this.playerO;
    } else {
      currentPlayer == this.playerX;
    }
  }

  gameOver() {
    this.currentPlayer = this.playerX;
    this.playGame();
  }
  //Return true if winning
  // playGame() {
  //   let board = this.makeBoard();
  //   // Display board to UI...
  //   // User clicks a button... validate click or disable button after click
  //   board.getSpace(COORDINATES).setMark(this.currentPlayer.getSymbol())
  //   // Display mark on board UI
  //   if(checkBoard) {
  //     this.notifyWinner();
  //     this.gameOver();
  //   }
  //   else {
  //     this.switchPlayer(this.currentPlayer);
  //   }
  // }

  checkBoard() {
    if (this.checkColumns() || this.checkRows() || this.checkDiagonals())  {
      return true;
    }
    return false;
  }
$(document).ready(function(){
  let game = new Game();
  
  game.board.print();

  //make board
  //disable space button

  //Any 9 space buttons on click
  //code is run to update space, checkBoard is called
  //check to win game, if winner, start net game
  //if no winner, switch player
})