import * as React from "react";

type TicTacToeBoardProps = {
  handleClick: (col: number, row: number) => void;
  grid: (null | "X" | "O")[][];
};

const TicTacToeBoard = ({ handleClick, grid }: TicTacToeBoardProps) => {
  return (
    <div className="inline-block">
      <div
        className="grid gap-1 bg-black"
        style={{
          // Our rows are equal to the length of our grid
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          // Our columns are equal to the length of a row
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            // We put the colIdx first because that is our X-axis value
            // and the rowIdx second because that is our Y-axis value
            // Getting in the habit makes using 2d grids much easier
            <div key={`${colIdx}-${rowIdx}`} className="h-20 w-20 bg-white">
              <button
                className="h-20 w-20"
                onClick={() => handleClick(colIdx, rowIdx)}
              >
                {cell}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TicTacToeBoard;
