// Import React
import * as React from "react";
import Button from "../../components/Button";

// Import TetrisBoard component
import GameBoard from "./TicTacToeBoard";

function generateGrid<T>(rows: number, columns: number, mapper: () => T) {
  return Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(null).map(mapper));
}

type GamePiece = null | "X" | "O";

type State = {
  grid: GamePiece[][];
  currentPlayer: "X" | "O";
  gameOver: boolean;
};

type Action =
  | {
      type: "chooseSquare";
      row: number;
      col: number;
    }
  | {
      type: "newGame";
    };

function getInitialState(): State {
  return {
    grid: generateGrid(3, 3, () => null),
    currentPlayer: "X",
    gameOver: false,
  };
}

function checkWin(flatArray: GamePiece[]): boolean {
  const [nw, n, ne, w, c, e, sw, s, se] = flatArray;

  function isSame(a: GamePiece, b: GamePiece, c: GamePiece) {
    if (a === null || b === null || c === null) return false;
    return a === b && b === c;
  }
  return (
    isSame(nw, n, ne) ||
    isSame(w, c, e) ||
    isSame(sw, s, se) ||
    isSame(nw, w, sw) ||
    isSame(n, c, s) ||
    isSame(ne, e, se) ||
    isSame(nw, c, se) ||
    isSame(ne, c, se)
  );
}

function TicTacToeReducer(state: State, action: Action): State {
  switch (action.type) {
    case "chooseSquare":
      // If game is over, do nothing
      if (state.gameOver) return state;

      const { row, col } = action;
      const grid = structuredClone(state.grid) as GamePiece[][];
      // If the square is already chosen, then don't allow it
      if (grid[action.row][action.col] !== null) return state;

      grid[row][col] = state.currentPlayer;

      // Now change current Player
      const newPlayer = state.currentPlayer === "X" ? "O" : "X";

      // Check if the game is won
      const gameWon = checkWin(grid.flat());

      return { grid, currentPlayer: newPlayer, gameOver: gameWon };
    case "newGame":
      return getInitialState();
  }
}

function TicTacToeGame() {
  const [state, dispatch] = React.useReducer(
    TicTacToeReducer,
    getInitialState()
  );
  const { grid } = state;

  function handleClick(col: number, row: number) {
    dispatch({ type: "chooseSquare", row, col });
  }

  return (
    <div className="my-0 mx-auto w-[500px] p-2">
      {/* Tetris board */}
      <GameBoard grid={grid} handleClick={handleClick} />

      {/*Info about the current game*/}
      <div className=" mb-4 mt-4 flex flex-col">
        <span>Current player: {state.currentPlayer}</span>
        <span>{state.gameOver && "Game Over"}</span>
      </div>

      {/* Buttons to control game */}
      <div className="mb-4 mt-4 flex justify-center">
        <Button
          className="rounded-l"
          onClick={() => dispatch({ type: "newGame" })}
        >
          New Game
        </Button>
      </div>
    </div>
  );
}

export default TicTacToeGame;
