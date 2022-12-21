// Import React
import * as React from "react";
import Button from "../../components/Button";

// Import TetrisBoard component
import TetrisBoard from "./TetrisBoard";

// Define props for Tetris component
type TetrisProps = {
  boardWidth: number;
  boardHeight: number;
};

// Define props for Tetris component state
type TetrisState = {
  activeTileX: number;
  activeTileY: number;
  activeTile: number;
  tileRotate: number;
  score: number;
  level: number;
  tileCount: number;
  gameOver: boolean;
  isPaused: boolean;
  field: any[];
  timerId: any;
  tiles: number[][][][];
};

function generateInitialState(height: number, width: number): TetrisState {
  let field = [];

  for (let y = 0; y < height; y++) {
    let row = [];

    for (let x = 0; x < width; x++) {
      row.push(0);
    }

    field.push(row);
  }

  // Set starting column to center
  let xStart = Math.floor(width / 2);

  return {
    activeTileX: xStart,
    activeTileY: 1,
    activeTile: 1,
    tileRotate: 0,
    score: 0,
    level: 1,
    tileCount: 0,
    gameOver: false,
    isPaused: false,
    field: field,
    timerId: null,
    tiles: [
      // 7 tiles
      // Each tile can be rotated 4 times (x/y coordinates)
      [
        // The default square
        [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
        [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
        [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
        [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      ],
      [
        // The cube tile (block 2x2)
        [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ],
        [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ],
        [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ],
        [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ],
      ],
      [
        // The I tile
        [
          [0, -1],
          [0, 0],
          [0, 1],
          [0, 2],
        ],
        [
          [-1, 0],
          [0, 0],
          [1, 0],
          [2, 0],
        ],
        [
          [0, -1],
          [0, 0],
          [0, 1],
          [0, 2],
        ],
        [
          [-1, 0],
          [0, 0],
          [1, 0],
          [2, 0],
        ],
      ],
      [
        // The T tile
        [
          [0, 0],
          [-1, 0],
          [1, 0],
          [0, -1],
        ],
        [
          [0, 0],
          [1, 0],
          [0, 1],
          [0, -1],
        ],
        [
          [0, 0],
          [-1, 0],
          [1, 0],
          [0, 1],
        ],
        [
          [0, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ],
      ],
      [
        // The inverse L tile
        [
          [0, 0],
          [-1, 0],
          [1, 0],
          [-1, -1],
        ],
        [
          [0, 0],
          [0, 1],
          [0, -1],
          [1, -1],
        ],
        [
          [0, 0],
          [1, 0],
          [-1, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [0, -1],
          [-1, 1],
        ],
      ],
      [
        // The L tile
        [
          [0, 0],
          [1, 0],
          [-1, 0],
          [1, -1],
        ],
        [
          [0, 0],
          [0, 1],
          [0, -1],
          [1, 1],
        ],
        [
          [0, 0],
          [1, 0],
          [-1, 0],
          [-1, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [0, -1],
          [-1, -1],
        ],
      ],
      [
        // The Z tile
        [
          [0, 0],
          [1, 0],
          [0, -1],
          [-1, -1],
        ],
        [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, -1],
        ],
        [
          [0, 0],
          [1, 0],
          [0, -1],
          [-1, -1],
        ],
        [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, -1],
        ],
      ],
      [
        // The inverse Z tile
        [
          [0, 0],
          [-1, 0],
          [0, -1],
          [1, -1],
        ],
        [
          [0, 0],
          [0, -1],
          [1, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [-1, 0],
          [0, -1],
          [1, -1],
        ],
        [
          [0, 0],
          [0, -1],
          [1, 0],
          [1, 1],
        ],
      ],
    ],
  };
}

function TetrisGame({ boardWidth, boardHeight }: TetrisProps) {
  const [state, dispatch] = React.useReducer(
    tetrisReducer,
    generateInitialState(boardHeight, boardWidth)
  );

  function handleBoardUpdate(
    direction: "up" | "left" | "right" | "down" | "rotate"
  ) {
    dispatch({
      type: "boardUpdate",
      direction: direction,
      height: boardHeight,
      width: boardWidth,
    });
  }

  function startNewGame() {
    dispatch({ type: "startNewGame", height: boardHeight, width: boardWidth });
  }

  // Interval for game update loop
  React.useEffect(() => {
    const timerId = window.setInterval(
      () => handleBoardUpdate("down"),
      1000 - (state.level * 10 > 600 ? 600 : state.level * 10)
    );

    return () => {
      window.clearInterval(timerId);
    };
  }, [state.level]);

  return (
    <div className="my-0 mx-auto w-[500px] p-2">
      {/* Tetris board */}
      <TetrisBoard
        field={state.field}
        gameOver={state.gameOver}
        score={state.score}
        level={state.level}
        rotate={state.tileRotate}
      />

      {/* Buttons to control blocks */}
      <div className="mt-4 flex justify-center">
        <Button className="rounded-l" onClick={() => handleBoardUpdate("left")}>
          Left
        </Button>
        <Button
          className="border-l border-l-blue-600"
          onClick={() => handleBoardUpdate("down")}
        >
          Down
        </Button>

        <Button
          className="border-l border-l-blue-600"
          onClick={() => handleBoardUpdate("right")}
        >
          Right
        </Button>

        <Button
          className="rounded-r border-l border-l-blue-600"
          onClick={() => handleBoardUpdate("rotate")}
        >
          Rotate
        </Button>
      </div>

      {/* Buttons to control game */}
      <div className="mb-4 mt-4 flex justify-center">
        <Button className="rounded-l" onClick={startNewGame}>
          New Game
        </Button>

        <Button
          className="rounded-r border-l border-l-blue-600"
          onClick={() => dispatch({ type: "togglePause" })}
        >
          {state.isPaused ? "Resume" : "Pause"}
        </Button>
      </div>
    </div>
  );
}

type Action =
  | { type: "startNewGame"; height: number; width: number }
  | {
      type: "boardUpdate";
      direction: "up" | "left" | "right" | "down" | "rotate";
      height: number;
      width: number;
    }
  | { type: "togglePause" };

function tetrisReducer(state: TetrisState, action: Action): TetrisState {
  // Do nothing if game is over or is paused
  if (state.gameOver || state.isPaused) {
    return state;
  }

  switch (action.type) {
    case "startNewGame":
      return generateInitialState(action.height, action.width);
    case "togglePause":
      return { ...state, isPaused: !state.isPaused };
    case "boardUpdate":
      // Prepare variables for additions to x/y coordinates, current active tile and new rotation
      let xAdd = 0;
      let yAdd = 0;
      let rotateAdd = 0;
      let tile = state.activeTile;

      // If tile should move to the left
      // set xAdd to -1
      if (action.direction === "left") {
        xAdd = -1;
      }

      // If tile should move to the right
      // set xAdd to 1
      if (action.direction === "right") {
        xAdd = 1;
      }

      // If tile should be rotated
      // set rotateAdd to 1
      if (action.direction === "rotate") {
        rotateAdd = 1;
      }

      // If tile should fall faster
      // set yAdd to 1
      if (action.direction === "down") {
        yAdd = 1;
      }

      // Get current x/y coordinates, active tile, rotate and all tiles
      let field = state.field;
      let x = state.activeTileX;
      let y = state.activeTileY;
      let rotate = state.tileRotate;

      const tiles = state.tiles;

      // Remove actual tile from field to test for new insert position
      field[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] = 0;
      field[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] = 0;
      field[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] = 0;
      field[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] = 0;

      // Test if the move can be executed on actual field
      let xAddIsValid = true;

      // Test if tile should move horizontally
      if (xAdd !== 0) {
        for (let i = 0; i <= 3; i++) {
          // Test if tile can be moved without getting outside the board
          if (
            x + xAdd + tiles[tile][rotate][i][0] >= 0 &&
            x + xAdd + tiles[tile][rotate][i][0] < action.width
          ) {
            if (
              field[y + tiles[tile][rotate][i][1]][
                x + xAdd + tiles[tile][rotate][i][0]
              ] !== 0
            ) {
              // Prevent the move
              xAddIsValid = false;
            }
          } else {
            // Prevent the move
            xAddIsValid = false;
          }
        }
      }

      // If horizontal move is valid update x variable (move the tile)
      if (xAddIsValid) {
        x += xAdd;
      }

      // Try to rotate the tile
      let newRotate = rotate + rotateAdd > 3 ? 0 : rotate + rotateAdd;
      let rotateIsValid = true;

      // Test if tile should rotate
      if (rotateAdd !== 0) {
        for (let i = 0; i <= 3; i++) {
          // Test if tile can be rotated without getting outside the board
          if (
            x + tiles[tile][newRotate][i][0] >= 0 &&
            x + tiles[tile][newRotate][i][0] < action.width &&
            y + tiles[tile][newRotate][i][1] >= 0 &&
            y + tiles[tile][newRotate][i][1] < action.height
          ) {
            // Test of tile rotation is not blocked by other tiles
            if (
              field[y + tiles[tile][newRotate][i][1]][
                x + tiles[tile][newRotate][i][0]
              ] !== 0
            ) {
              // Prevent rotation
              rotateIsValid = false;
            }
          } else {
            // Prevent rotation
            rotateIsValid = false;
          }
        }
      }

      // If rotation is valid update rotate variable (rotate the tile)
      if (rotateIsValid) {
        rotate = newRotate;
      }

      // Try to speed up the fall of the tile
      let yAddIsValid = true;

      // Test if tile should fall faster
      if (yAdd !== 0) {
        for (let i = 0; i <= 3; i++) {
          // Test if tile can fall faster without getting outside the board
          if (
            y + yAdd + tiles[tile][rotate][i][1] >= 0 &&
            y + yAdd + tiles[tile][rotate][i][1] < action.height
          ) {
            // Test if faster fall is not blocked by other tiles
            if (
              field[y + yAdd + tiles[tile][rotate][i][1]][
                x + tiles[tile][rotate][i][0]
              ] !== 0
            ) {
              // Prevent faster fall
              yAddIsValid = false;
            }
          } else {
            // Prevent faster fall
            yAddIsValid = false;
          }
        }
      }

      // If speeding up the fall is valid (move the tile down faster)
      if (yAddIsValid) {
        y += yAdd;
      }

      // Render the tile at new position
      field[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] =
        tile;
      field[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] =
        tile;
      field[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] =
        tile;
      field[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] =
        tile;

      // If moving down is not possible, remove completed rows add score
      // and find next tile and check if game is over
      if (!yAddIsValid) {
        for (let row = action.height - 1; row >= 0; row--) {
          let isLineComplete = true;

          // Check if row is completed
          for (let col = 0; col < action.width; col++) {
            if (field[row][col] === 0) {
              isLineComplete = false;
            }
          }

          // Remove completed rows
          if (isLineComplete) {
            for (let yRowSrc = row; row > 0; row--) {
              for (let col = 0; col < action.width; col++) {
                field[row][col] = field[row - 1][col];
              }
            }

            // Check if the row is the last
            row = action.height;
          }
        }

        // Update state - update score, update number of tiles, change level
        return {
          ...state,
          score: state.score + 1 * state.level,
          level: 1 + Math.floor(state.tileCount / 10),
        };

        // // Prepare new timer
        // let timerId;

        // // Reset the timer
        // clearInterval(state.timerId);

        // // Update new timer
        // timerId = setInterval(
        //   () => this.handleBoardUpdate("down"),
        //   1000 - (state.level * 10 > 600 ? 600 : state.level * 10)
        // );

        // // Use new timer
        // this.setState({
        //   timerId: timerId,
        // });

        // // Create new tile
        // tile = Math.floor(Math.random() * 7 + 1);
        // x = parseInt(action.width) / 2;
        // y = 1;
        // rotate = 0;

        // // Test if game is over - test if new tile can't be placed in field
        // if (
        //   field[y + tiles[tile][rotate][0][1]][
        //     x + tiles[tile][rotate][0][0]
        //   ] !== 0 ||
        //   field[y + tiles[tile][rotate][1][1]][
        //     x + tiles[tile][rotate][1][0]
        //   ] !== 0 ||
        //   field[y + tiles[tile][rotate][2][1]][
        //     x + tiles[tile][rotate][2][0]
        //   ] !== 0 ||
        //   field[y + tiles[tile][rotate][3][1]][
        //     x + tiles[tile][rotate][3][0]
        //   ] !== 0
        // ) {
        //   // Stop the game
        //   this.setState({
        //     gameOver: true,
        //   });
        // } else {
        //   // Otherwise, render new tile and continue
        //   field[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] =
        //     tile;
        //   field[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] =
        //     tile;
        //   field[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] =
        //     tile;
        //   field[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] =
        //     tile;
        // }
      }

      // Update state - use new field, active x/y coordinates, rotation and activeTile
      return {
        ...state,
        field,
        activeTileX: x,
        activeTileY: y,
        tileRotate: rotate,
        activeTile: tile,
      };
  }
}

export default TetrisGame;
