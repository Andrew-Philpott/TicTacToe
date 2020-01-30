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
    this.turnCount = 1;
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
  isWinner2() {
    let potentialWins = [];

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
    this.turnCount += 1;
    if(currentPlayer == this.playerX) {
      this.currentPlayer = this.playerO;
    } else {
      this.currentPlayer = this.playerX;
    }
  }

  resetGame() {
    this.turnCount = 1;
    this.board = this.makeBoard();
    this.currentPlayer = this.playerX;
  }

  isWinner() {
    if (this.checkColumns() || this.checkRows() || this.checkDiagonal()) {
      return true;
    }
    return false;
  }
}

  function displayBoard(game) {
    let boardContainer = $("#board");
    let htmlForBoardContainer = "";
    let boardGameLength = game.board.board.length-1;
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++) {
        let space = game.board.getSpace(row, col);
        let coords = space.getCoordinates();
        let position = "";
        if(coords[0] === 0){
          if(coords[1] === 0) {
            position = "top-left";
          } else if(coords[1] === boardGameLength)
          {
            position = "top-right";
          } else {
            position = "top-middle";
          }
        } else if(coords[1] === 0) {
          if(coords[0] === boardGameLength){
            position = "bottom-left";
          } else {
            position = "left-middle";
          }

        } else if(coords[0] === boardGameLength) {
          if(coords[1] === boardGameLength)
          {
            position = "bottom-right";
          } else {
            position = "bottom-middle";
          }
        }
        else if(coords[1] === boardGameLength)
        {
          position = "right-middle";
        }
        htmlForBoardContainer +=`<div class='space ${position}' id='${space.getCoordinates()}'>${space.getMark()}</div>`  
      }
    }
    return boardContainer.html(htmlForBoardContainer);
  }

  function attachListeners(game){
    $("#board").on("click", ".space", function() {
      let id = this.id;
      let coordinatesSplit = id.split(",");
      let space = game.board.getSpace(coordinatesSplit[0], coordinatesSplit[1]);
      if(!game.isWinner()){
        let didMarkSpace = space.setMark(game.currentPlayer.getSymbol());
        if(didMarkSpace) {
          displayBoard(game);
          if(game.isWinner()) {
            notifyWinner(game);
            displayBoard(game);
          } else if (!game.isWinner() && (game.turnCount === 9)){
            notifyTie();
          } else {
            game.switchPlayer(game.currentPlayer);
          }
        }
      }
    });
    $("#new-game-button").on("click", function() {
      game.resetGame();
      $("#board").show();
      $("#winner-text").remove();
      displayBoard(game);
    });
  }

  function notifyWinner(game) {
    $("#board-container").append(`<p id="winner-text">${game.currentPlayer.getSymbol()} Wins!</p>`)
    $("#board").hide();
  }

  function notifyTie() {
    $("#board-container").append(`<p id="winner-text">Tie</p>`)
    $("#board").hide();
  }

$(document).ready(function(){
  let game = new Game();
   displayBoard(game);
   attachListeners(game);

});