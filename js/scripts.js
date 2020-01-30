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
    this.mark = "";
  }
  setMark(playerMark) {
    if(!this.mark) {
      this.mark = playerMark;
      return true;
    } 
    return false;
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
    let playerSymbol = this.currentPlayer.getSymbol();
    for(let row = 0; row < 3; row++) {
      let columns = [];
      for(let col = 0; col < 3; col++) {
        let spaceMark = this.board.getSpace(col,row).getMark();
        if(playerSymbol !== spaceMark) {
          break;
        } else {
          columns.push(spaceMark);
        }
      }
      if (columns.length === 3) {
        if((columns[0] === columns[1]) && (columns[1] === columns[2])) {
          return true;
        }
      }
    }
    return false;
  }
  
  checkRows() {
    let playerSymbol = this.currentPlayer.getSymbol();
    for(let row = 0; row < 3; row++) {
      let rows = [];
      for(let col = 0; col < 3; col++) {
        let spaceMark = this.board.getSpace(row,col).getMark();
        if(playerSymbol !== spaceMark) {
          break;
        } else {
          rows.push(spaceMark);
        }
        if (rows.length === 3) {
          if((rows[0] === rows[1]) && (rows[1] === rows[2])) {
            return true;
          }
        }
      } 
  }
  return false;
}

checkDiagonal() {

}


  //switch current player through game object
  switchPlayer(currentPlayer){
    if(currentPlayer == this.playerX) {
      this.currentPlayer = this.playerO;
    } else {
      this.currentPlayer = this.playerX;
    }
  }

  resetGame() {
    this.board = this.makeBoard();
    this.currentPlayer = this.playerX;
  }
  //Return true if winning
  // 

  checkBoard() {
    if (this.checkColumns() || this.checkRows()) {
      return true;
    }
    return false;
  }
  notifyWinner() {
    return this.currentPlayer.getSymbol() + " wins!!!";
  }
}

  function displayBoard(game) {
    let boardContainer = $("#board");
    let htmlForBoardContainer = "";
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++) {
        let space = game.board.getSpace(row, col);
       htmlForBoardContainer += `<div class='space' id='${space.getCoordinates()}'>${space.getMark()}</div>`;
      }
    }
    return boardContainer.html(htmlForBoardContainer);
  }
  function attachListeners(game){
    $("#board").on("click", ".space", function() {
      let id = this.id;
      let coordinatesSplit = id.split(",");
      let space = game.board.getSpace(coordinatesSplit[0], coordinatesSplit[1]);
      if(!game.checkBoard()){
        let canMarkSpace = space.setMark(game.currentPlayer.getSymbol());
        if(canMarkSpace) {
          displayBoard(game);
          let gameDone = game.checkBoard();
          if(gameDone) {
            alert(game.notifyWinner());
            displayBoard(game);
            // game = null;
          } else {
            game.switchPlayer(game.currentPlayer);
          }
        }
      }
    });
    $("#new-game-button").on("click", function() {
      game.resetGame();
      displayBoard(game);
    });
  }

$(document).ready(function(){
  let game = new Game();
   displayBoard(game);
   attachListeners(game);

});