import * as React from "react";

type TetrisBoardProps = {
  field: any[];
  gameOver: boolean;
  score: number;
  level: number;
  rotate: number;
};

const TetrisBoard = ({
  field,
  gameOver,
  score,
  level,
  rotate,
}: TetrisBoardProps) => {
  // Create board rows
  let rows: any[] = [];

  field.forEach((row, index) => {
    // Create board columns
    const cols = row.map((column: any, index: number) => (
      <div className={`border p-3 col-${column}`} key={index} />
    ));

    rows.push(
      <div className="flex" key={index}>
        {cols}
      </div>
    );
  });
  return (
    <div className="flex justify-between">
      {/* Game info */}
      <div className="w-32">
        <p className="text-lg text-gray-900">Level: {level}</p>

        <p className="text-lg text-gray-900">Score: {score}</p>

        {gameOver && (
          <p className="text-lg text-gray-900">
            <strong>Game Over</strong>
          </p>
        )}
      </div>

      {/* Game board */}
      <div>{rows}</div>
    </div>
  );
};

export default TetrisBoard;
