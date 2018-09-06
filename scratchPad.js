const prompt = require('prompt');

class Game {
  constructor() {
    this.matrix = [['', '', ''], ['', '', ''], ['', '', '']];
    this.currentPlayer = ' X  ';
    this.updateMatrix = this.updateMatrix.bind(this);
    this.initialize();
  }

  getBoardString() {
    const { matrix } = this;
    return `    ${matrix[0][0] || ' 00 '}|${matrix[0][1] || ' 01 '}|${matrix[0][2] || ' 02 '} 
    --------------
    ${matrix[1][0] || ' 10 '}|${matrix[1][1] || ' 11 '}|${matrix[1][2] || ' 12 '}
    --------------
    ${matrix[2][0] || ' 20 '}|${matrix[2][1] || ' 21 '}|${matrix[2][2] || ' 22 '}
    `;
  }

  checkWins([row, col]) {
    const { matrix, currentPlayer } = this;
    const winningString = currentPlayer.trim().repeat(3);
    const rowString = matrix[+row].reduce((a, b) => a.trim() + b.trim());
    const colString = matrix.reduce((a, b) => a[+col].trim() + b[+col].trim());
    const majorDiagonal = `${matrix[0][0].trim()}${matrix[1][1].trim()}${matrix[2][2].trim()}`;
    const minorDiagonal = `${matrix[0][2].trim()}${matrix[1][1].trim()}${matrix[2][0].trim()}`;
    if (rowString === winningString
      || colString === winningString
      || majorDiagonal === winningString
      || minorDiagonal === winningString
      ) {
        console.log(`Player ${currentPlayer} wins!`);
      }
    return false;
  }

  initialize() {
    const { updateMatrix } = this;

    console.log(this.getBoardString());
    console.log(`Current Player: ${this.currentPlayer}`);
    prompt.get('\nEnter the coordinates of your next move', updateMatrix.bind(this));
  }

  updateMatrix(err, res) {
    const result = Object.values(res['\nEnter the coordinates of your next move']);
    this.matrix[+result[0]][+result[1]] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === ' X  ' ? ' O  ' : ' X  ';
    if (!this.checkWins(result)) {
      this.initialize();
    }
  }
}

new Game();
