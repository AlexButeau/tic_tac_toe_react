import React from 'react';
import Square from './Square';
import './Game.css';

const winArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const baseState = {
  squares: [
    { id: 1, content: '' },
    { id: 2, content: '' },
    { id: 3, content: '' },
    { id: 4, content: '' },
    { id: 5, content: '' },
    { id: 6, content: '' },
    { id: 7, content: '' },
    { id: 8, content: '' },
    { id: 9, content: '' },
  ],
  currentContent: 'X',
  victory: false,
  victoryMessage: '',
}; //initial state

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [
        { id: 1, content: '' },
        { id: 2, content: '' },
        { id: 3, content: '' },
        { id: 4, content: '' },
        { id: 5, content: '' },
        { id: 6, content: '' },
        { id: 7, content: '' },
        { id: 8, content: '' },
        { id: 9, content: '' },
      ],
      currentContent: 'X',
      victory: false,
      victoryMessage: '',
    };
  }

  handleWin = () => {
    let squares = this.state.squares;
    for (let array of winArray) {
      let [a, b, c] = array; //indexes to check
      if (
        squares[a - 1].content !== '' &&
        squares[a - 1].content === squares[b - 1].content &&
        squares[c - 1].content === squares[b - 1].content
      ) {
        this.setState({ victory: true });
        let victoryMessage = `${
          squares[a - 1].content === 'X' ? 'Player 1' : 'Player 2'
        } wins!`;
        this.setState(() => ({ victoryMessage: victoryMessage }));
      }
    }
  };

  handleSquareClick = (event) => {
    if (this.state.victory) {
      return;
    }

    let squares = this.state.squares;
    let id = event.currentTarget.id;
    let currentContent = this.state.currentContent;
    for (let square of squares) {
      if (square.id === parseInt(id)) {
        if (square.content === '') {
          square.content = currentContent;
          currentContent = currentContent === 'X' ? 'O' : 'X';
        }
      }
    }
    this.setState(() => ({ squares: squares }));
    this.setState(() => ({ currentContent: currentContent }));
    this.handleWin();
  };

  handleReplay = () => {
    console.log(baseState);
    this.setState(baseState);
  };

  render() {
    return (
      <div className='container'>
        <p>Player 1: X - Player 2: O</p>
        <div className='board'>
          {this.state.squares.map((square) => (
            <div
              className='square'
              id={square.id}
              key={square.id}
              onClick={this.handleSquareClick}
            >
              <Square content={square.content} />
            </div>
          ))}
        </div>
        <p className='winner'>{this.state.victoryMessage}</p>
        <div className='playAgain' onClick={this.handleReplay}>
          Play again !
        </div>
      </div>
    );
  }
}

export default Game;
