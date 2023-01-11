import React, { useEffect, useState } from "react";

enum Move {
  U,
  D,
  R,
  L,
  F,
  B,
}

interface Notation {
  move: Move;
  prime: boolean;
  amount: number;
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
          {"'"}
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
          className="bg-green-200 hover:bg-green-400 p-2 rounded-lg mx-auto transition"
          onClick={() => {
            setScramble(generate_scramble(23));
          }}
        >
          Generate New Scramble
        </button>
      </div>
      <div className="flex justify-center">{scramble_to_jsx(scramble)}</div>
    </div>
  );
};

export default CubeTimer;
