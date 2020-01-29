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
}

$(document).ready(function(){
  let game = new Game();
  game.board.print();

  // let spacesArray = [[],[],[]];
  // for(let row = 0; row < 3; row++) {
  //   for(let col = 0; col < 3; col++) {
  //     let newSpace = new Space(row, col);
  //     spacesArray[row][col] = newSpace;
  //   }
  // }
  // let board = new Board(spacesArray);
  // board.print();
  // let player = new Player("X");
  // board.getSpace(0,0).setMark(player.getSymbol());
  // board.print();
})