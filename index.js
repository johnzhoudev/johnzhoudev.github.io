import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component {

  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
*/

function Square(props) {
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
    };
  
  }
  */


  renderSquare(i) {
    return (
        <Square 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
        />
    );
  }
//        <div className="status">{status}</div>

  render() {
    return (

      
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>

      
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        clicked: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];   

    const squares_new = current.squares.slice(); //makes a copy of the array
    if (calculateWinner(squares_new) || squares_new[i]) { //no change if filled already
      return;
    }

    if (this.state.xIsNext) {
      squares_new[i] = 'X';
    } else {
      squares_new[i] = 'O';
    }

    //squares_new[i] = this.state.xIsNext ? 'X' : 'O'; //cool syntax
    this.setState({history: history.concat([{
      squares: squares_new,
      clicked: i,
    }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,});
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => { //takes in item, and index
      const last_move_str = '(' + row(step.clicked) + ', ' + col(step.clicked) + ')';
      let desc = move ?
        'Go to move #' + move + ' ' + last_move_str:
        'Go to game start';

      const styles = {
        fontWeight: "bold"
      };

      //If last move, bold 
      if (move == (history.length - 1)) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)} style={styles}>{desc}</button>
          </li>
        )
      }

        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>

        );
    });



    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {

  //Collection of potential winning paths
  const paths = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //For each path, check if a winner
  for (let i = 0; i < paths.length; ++i) {
    const [a, b, c] = paths[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      return squares[a]; //'X' or 'O'
    } 

  }
  return null;
}

function row(square) {
  return Math.floor(square / 3) + 1;
}

function col(square) {
  return square % 3 + 1;

}