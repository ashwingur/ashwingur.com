import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";

enum Move {
  U,
  D,
  R,
  L,
  F,
  B,
}

enum ColourScheme {
  White,
  Green,
  Yellow,
  Blue,
  Orange,
  Red,
}

interface Notation {
  move: Move;
  prime: boolean;
  amount: number;
}

interface _3x3 {
  up: ColourScheme[];
  front: ColourScheme[];
  down: ColourScheme[];
  back: ColourScheme[];
  left: ColourScheme[];
  right: ColourScheme[];
}

// Only does 3x3 for now
function generate_scramble(length: number) {
  let scramble: Notation[] = [];
  for (let i = 0; i < length; i++) {
    let prev_move: Move | undefined = undefined;
    if (i != 0) {
      prev_move = scramble[i - 1].move;
    }
    let current_move: Move = pick_move(prev_move);
    let prime = Math.random() > 0.5;
    let amount = Math.random() > 0.43 ? 1 : 2; // 11/21 single moves

    scramble.push({ move: current_move, prime: prime, amount: amount });
  }

  return scramble;
}

function scramble_to_jsx(scramble: Notation[]) {
  return scramble.map((item, index) => {
    if (item.amount == 2) {
      return (
        <span className="mx-2 text-xl" key={index}>
          {Move[item.move]}2
        </span>
      );
    } else {
      return (
        <span className="mx-2 text-xl" key={index}>
          {Move[item.move]}
          {item.prime ? "'" : ""}
        </span>
      );
    }
  });
}

// Picks the next move taking into account the previous move
// U and D can't go together
// F and B can't go together
// R and L can't go together
function pick_move(prev_move: Move | undefined) {
  const no_prev: Move[] = [Move.U, Move.D, Move.R, Move.L, Move.F, Move.B];
  const prev_f_or_b: Move[] = [Move.U, Move.D, Move.R, Move.L];
  const prev_r_or_l: Move[] = [Move.U, Move.D, Move.F, Move.B];
  const prev_u_or_d: Move[] = [Move.R, Move.L, Move.F, Move.B];

  switch (prev_move) {
    case undefined:
      return no_prev[Math.floor(Math.random() * no_prev.length)];
    case Move.U:
    case Move.D:
      return prev_u_or_d[Math.floor(Math.random() * prev_u_or_d.length)];
    case Move.R:
    case Move.L:
      return prev_r_or_l[Math.floor(Math.random() * prev_u_or_d.length)];
    case Move.F:
    case Move.B:
      return prev_f_or_b[Math.floor(Math.random() * prev_f_or_b.length)];
  }
}

function visualise_scramble(scramble: Notation[]) {
  // scramble = [
  //   { move: Move.F, prime: false, amount: 2 },
  // ];
  // We have 6 arrays of 9 to represent the 6 sides with 3x3 faces
  let up: ColourScheme[] = Array(9).fill(ColourScheme.White);
  let front: ColourScheme[] = Array(9).fill(ColourScheme.Green);
  let down: ColourScheme[] = Array(9).fill(ColourScheme.Yellow);
  let back: ColourScheme[] = Array(9).fill(ColourScheme.Blue);
  let left: ColourScheme[] = Array(9).fill(ColourScheme.Orange);
  let right: ColourScheme[] = Array(9).fill(ColourScheme.Red);
  let cube: _3x3 = {
    up,
    front,
    down,
    back,
    left,
    right,
  };

  scramble.forEach((item) => {
    let { move, prime, amount } = item;
    if (prime && amount != 2) {
      amount = 3; // Treat prime move as just moving clockwise 3 times
    }
    for (let i = 0; i < amount; i++) {
      const temp_cube = JSON.parse(JSON.stringify(cube));
      // 0 1 2
      // 3 4 5
      // 6 7 8
      if (move == Move.U) {
        // console.log("before: " + JSON.stringify(temp_cube));
        let new_up: ColourScheme[] = [
          temp_cube.up[6],
          temp_cube.up[3],
          temp_cube.up[0],
          temp_cube.up[7],
          temp_cube.up[4],
          temp_cube.up[1],
          temp_cube.up[8],
          temp_cube.up[5],
          temp_cube.up[2],
        ];
        cube.up = new_up;

        cube.front[0] = temp_cube.right[0];
        cube.front[1] = temp_cube.right[1];
        cube.front[2] = temp_cube.right[2];

        cube.left[0] = temp_cube.front[0];
        cube.left[1] = temp_cube.front[1];
        cube.left[2] = temp_cube.front[2];

        cube.back[0] = temp_cube.left[0];
        cube.back[1] = temp_cube.left[1];
        cube.back[2] = temp_cube.left[2];

        cube.right[0] = temp_cube.back[0];
        cube.right[1] = temp_cube.back[1];
        cube.right[2] = temp_cube.back[2];

        // console.log("after: " + JSON.stringify(temp_cube));
      } else if (move == Move.R) {
        let new_right: ColourScheme[] = [
          temp_cube.right[6],
          temp_cube.right[3],
          temp_cube.right[0],
          temp_cube.right[7],
          temp_cube.right[4],
          temp_cube.right[1],
          temp_cube.right[8],
          temp_cube.right[5],
          temp_cube.right[2],
        ];
        cube.right = new_right;

        cube.front[2] = temp_cube.down[2];
        cube.front[5] = temp_cube.down[5];
        cube.front[8] = temp_cube.down[8];

        cube.up[2] = temp_cube.front[2];
        cube.up[5] = temp_cube.front[5];
        cube.up[8] = temp_cube.front[8];

        cube.back[0] = temp_cube.up[8];
        cube.back[3] = temp_cube.up[5];
        cube.back[6] = temp_cube.up[2];

        cube.down[2] = temp_cube.back[6];
        cube.down[5] = temp_cube.back[3];
        cube.down[8] = temp_cube.back[0];
      } else if (move == Move.L) {
        let new_left: ColourScheme[] = [
          temp_cube.left[6],
          temp_cube.left[3],
          temp_cube.left[0],
          temp_cube.left[7],
          temp_cube.left[4],
          temp_cube.left[1],
          temp_cube.left[8],
          temp_cube.left[5],
          temp_cube.left[2],
        ];
        cube.left = new_left;

        cube.front[0] = temp_cube.up[0];
        cube.front[3] = temp_cube.up[3];
        cube.front[6] = temp_cube.up[6];

        cube.up[0] = temp_cube.back[8];
        cube.up[3] = temp_cube.back[5];
        cube.up[6] = temp_cube.back[2];

        cube.back[2] = temp_cube.down[6];
        cube.back[5] = temp_cube.down[3];
        cube.back[8] = temp_cube.down[0];

        cube.down[0] = temp_cube.front[0];
        cube.down[3] = temp_cube.front[3];
        cube.down[6] = temp_cube.front[6];
      } else if (move == Move.D) {
        let new_down: ColourScheme[] = [
          temp_cube.down[6],
          temp_cube.down[3],
          temp_cube.down[0],
          temp_cube.down[7],
          temp_cube.down[4],
          temp_cube.down[1],
          temp_cube.down[8],
          temp_cube.down[5],
          temp_cube.down[2],
        ];
        cube.down = new_down;

        cube.front[6] = temp_cube.left[6];
        cube.front[7] = temp_cube.left[7];
        cube.front[8] = temp_cube.left[8];

        cube.left[6] = temp_cube.back[6];
        cube.left[7] = temp_cube.back[7];
        cube.left[8] = temp_cube.back[8];

        cube.back[6] = temp_cube.right[6];
        cube.back[7] = temp_cube.right[7];
        cube.back[8] = temp_cube.right[8];

        cube.right[6] = temp_cube.front[6];
        cube.right[7] = temp_cube.front[7];
        cube.right[8] = temp_cube.front[8];
      } else if (move == Move.F) {
        let new_front: ColourScheme[] = [
          temp_cube.front[6],
          temp_cube.front[3],
          temp_cube.front[0],
          temp_cube.front[7],
          temp_cube.front[4],
          temp_cube.front[1],
          temp_cube.front[8],
          temp_cube.front[5],
          temp_cube.front[2],
        ];
        cube.front = new_front;

        cube.up[6] = temp_cube.left[8];
        cube.up[7] = temp_cube.left[5];
        cube.up[8] = temp_cube.left[2];

        cube.left[2] = temp_cube.down[0];
        cube.left[5] = temp_cube.down[1];
        cube.left[8] = temp_cube.down[2];

        cube.down[0] = temp_cube.right[6];
        cube.down[1] = temp_cube.right[3];
        cube.down[2] = temp_cube.right[0];

        cube.right[0] = temp_cube.up[6];
        cube.right[3] = temp_cube.up[7];
        cube.right[6] = temp_cube.up[8];
      } else if (move == Move.B) {
        let new_back: ColourScheme[] = [
          temp_cube.back[6],
          temp_cube.back[3],
          temp_cube.back[0],
          temp_cube.back[7],
          temp_cube.back[4],
          temp_cube.back[1],
          temp_cube.back[8],
          temp_cube.back[5],
          temp_cube.back[2],
        ];
        cube.back = new_back;

        cube.up[0] = temp_cube.right[2];
        cube.up[1] = temp_cube.right[5];
        cube.up[2] = temp_cube.right[8];

        cube.left[0] = temp_cube.up[2];
        cube.left[3] = temp_cube.up[1];
        cube.left[6] = temp_cube.up[0];

        cube.down[6] = temp_cube.left[0];
        cube.down[7] = temp_cube.left[3];
        cube.down[8] = temp_cube.left[6];

        cube.right[2] = temp_cube.down[8];
        cube.right[5] = temp_cube.down[7];
        cube.right[8] = temp_cube.down[6];
      }
    }
  });

  return _3x3_to_jsx(cube);
}

function _3x3_to_jsx(cube: _3x3) {
  let up = cube.up.map((x, index) => {
    return <div className={colour_to_classname(x)} key={index}></div>;
  });
  let down = cube.down.map((x, index) => {
    return <div className={colour_to_classname(x)} key={index}></div>;
  });
  let front = cube.front.map((x, index) => {
    return <div className={colour_to_classname(x)} key={index}></div>;
  });
  let back = cube.back.map((x, index) => {
    return <div className={colour_to_classname(x)} key={index}></div>;
  });
  let left = cube.left.map((x, index) => {
    return <div className={colour_to_classname(x)} key={index}></div>;
  });
  let right = cube.right.map((x, index) => {
    return <div className={colour_to_classname(x)} key={index}></div>;
  });

  return (
    <div className="grid mx-72 grid-cols-4 gap-1 gap">
      <div className="grid grid-cols-3 w-36 h-36"></div>
      <div className="grid grid-cols-3 w-36 h-36 bg-black gap-1 p-1">{up}</div>
      <div className="grid grid-cols-3 w-36 h-36"></div>
      <div className="grid grid-cols-3 w-36 h-36"></div>
      <div className="grid grid-cols-3 w-36 h-36 bg-black gap-1 p-1">
        {left}
      </div>
      <div className="grid grid-cols-3 w-36 h-36 bg-black gap-1 p-1">
        {front}
      </div>
      <div className="grid grid-cols-3 w-36 h-36 bg-black gap-1 p-1">
        {right}
      </div>
      <div className="grid grid-cols-3 w-36 h-36 bg-black gap-1 p-1">
        {back}
      </div>
      <div className="grid grid-cols-3 w-36 h-36"></div>
      <div className="grid grid-cols-3 w-36 h-36 bg-black gap-1 p-1">
        {down}
      </div>
      <div className="grid grid-cols-3 w-36 h-36"></div>
      <div className="grid grid-cols-3 w-36 h-36"></div>
    </div>
  );
}

function colour_to_classname(colour: ColourScheme) {
  switch (colour) {
    case ColourScheme.White:
      return "bg-white";
    case ColourScheme.Green:
      return "bg-green-600";
    case ColourScheme.Yellow:
      return "bg-yellow-400";
    case ColourScheme.Blue:
      return "bg-blue-600";
    case ColourScheme.Orange:
      return "bg-orange-400";
    case ColourScheme.Red:
      return "bg-red-600";
  }
}

const CubeTimer = () => {
  const [scramble, setScramble] = useState<Notation[]>([]);
  //   let scramble = scramble_to_jsx(generate_scramble(21));
  useEffect(() => {
    setScramble(generate_scramble(23));
  }, []);

  return (
    <div>
      <h1 className="text-center my-4">Cube Timer</h1>
      <div className="flex justify-center my-8  delay-150">
        <button
          className="bg-green-200 hover:bg-green-400 dark:bg-green-800 dark:hover:bg-green-600 p-2 rounded-lg mx-auto transition"
          onClick={() => {
            setScramble(generate_scramble(23));
          }}
        >
          Generate New Scramble
        </button>
      </div>
      <div className="flex justify-center">{scramble_to_jsx(scramble)}</div>
      {visualise_scramble(scramble)}
    </div>
  );
};

export default CubeTimer;
