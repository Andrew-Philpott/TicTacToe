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
    let playerSymbol = this.currentPlayer.getSymbol();

    let bleftToRight = [this.board.getSpace(0,0).getMark(), this.board.getSpace(1,1).getMark(), this.board.getSpace(2,2).getMark()];

    let tLefttoRight = [this.board.getSpace(2,0).getMark(), this.board.getSpace(1,1).getMark(), this.board.getSpace(0,2).getMark()];

    let matchedPlayerValuesbleftToRight  = [];
    bleftToRight.forEach(function(value) {
      if(value === playerSymbol) {
        matchedPlayerValuesbleftToRight.push(value);
      }
    });
    if(matchedPlayerValuesbleftToRight.length === 3)
      {
        return true;
      }
    let matchedPlayerValuesTleftToRight = [];
    tLefttoRight.forEach(function(value) {
      if(value === playerSymbol) {
        matchedPlayerValuesTleftToRight.push(value);
      }
    });
    if(matchedPlayerValuesTleftToRight.length === 3)
      {
        return true;
      }
    return false;
    }


  ////////// MY ADDITION ////////////
  checkBoard2() {
    let potentialWins = [];
    // Add all rows to potentialWins
    let rows = [];
    for(let row = 0; row < 3; row++) {
      let row = [];
      for(let col = 0; col < 3; col++) {
        // THIS LINE DOESN'T WORK BECAUSE THIS.BOARD IS A METHOD NOT THE STATE OF THE BOARD
        let spaceMark = this.board.getSpace(row,col).getMark();
        row.push(spaceMark);
      }
      rows.push(row);
    }
    potentialWins.push(board);
    console.log("push board layout " + potentialWins);
    // Add all columns to potentialWins
    let columns = [];
    for(let row = 0; row < 3; row++) {
      let column = [];
      for(let col = 0; col < 3; col++) {
        // THIS LINE DOESN'T WORK BECAUSE THIS.BOARD IS A METHOD NOT THE STATE OF THE BOARD
        let spaceMark = this.board.getSpace(col,row).getMark();
        column.push(spaceMark);
      }
      columns.push(column);
    }
    potentialWins.push(columns);
    console.log("push columns " + potentialWins);
    // Add diagonals to potentialWins
    let diagonal1 = [];
    for (let idx = 0; idx < 3; idx++){
      // THIS LINE DOESN'T WORK BECAUSE THIS.BOARD IS A METHOD NOT THE STATE OF THE BOARD
      let spaceMark = board[idx][idx].getSpace().getMark();
      diagonal1.push(spaceMark);
    }
    console.log("diagonal1 " + diagonal1);
    let diagonal2 = [];
    for (let idx = 0; idx < 3; idx++){
      // THIS LINE DOESN'T WORK BECAUSE THIS.BOARD IS A METHOD NOT THE STATE OF THE BOARD
      let spaceMark = board[idx][2-idx].getSpace().getMark();
      diagonal2.push(spaceMark);
    }
    console.log("diagonal2 " + diagonal2);
    // Check potentialWins and return true or false
    for (potential of potentialWins){
      let set = new Set(potential);
      if ((set[0]) && (set.length === 1)){
        return true;
      } 
    }
    return false;
  }
  ////////// MY ADDITION ////////////

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
    if (this.checkColumns() || this.checkRows() || this.checkDiagonal()) {
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