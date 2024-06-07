import axios from "axios";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCircle } from "react-icons/bs";
import BasicNavbar from "../components/BasicNavbar";

// Host Creates Game and Subscribes to the Channel
// Guest Subscribes to the channel, and then posts that they joined
// Server receives post and then emits a ready event to the Host
// Host now starts the game and makes a move.
// Host sends the data to server and it updates for everyone
// Guest makes a move

interface GameState {
  board: Cell[]; // Array of 9 to represent the board
  isHostTurn: boolean;
}

enum Cell {
  Blank,
  X,
  O,
}

const newGameState = (randomiseFirstPlayer: boolean): GameState => {
  let isHostTurn = true;
  if (randomiseFirstPlayer) {
    isHostTurn = Math.random() < 0.5;
  }
  return {
    board: Array(9).fill(Cell.Blank),
    isHostTurn,
  };
};

const gameStateToJSX = (
  gamestate: GameState,
  onCellClick: (index: number) => void
) => {
  return (
    <div className="grid grid-cols-3 bg-black dark:bg-slate-500 gap-1 mx-auto mt-24 w-[246px]">
      {gamestate.board.map((cell: Cell, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              onCellClick(index);
            }}
            className="cursor-pointer hover:bg-yellow-500"
          >
            {cellToJSX(cell)}
          </div>
        );
      })}
    </div>
  );
};

const cellToJSX = (cell: Cell) => {
  switch (cell) {
    case Cell.Blank:
      return (
        <div className="bg-slate-100 dark:bg-gray-900 text-center h-20 w-20 hover:bg-slate-200 dark:hover:bg-gray-700 transition-all"></div>
      );
    case Cell.O:
      return (
        <div className="bg-slate-100 dark:bg-gray-900 text-center h-20 w-20 flex">
          <BsCircle className="m-auto" size={50} />
        </div>
      );
    case Cell.X:
      return (
        <div className="bg-slate-100 dark:bg-gray-900 text-center h-20 w-20 flex">
          <RxCross1 className="m-auto" size={50} />
        </div>
      );
  }
};

const TicTacToe = () => {
  const [inLobby, setInLobby] = useState(true);
  const [isHost, setIsHost] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [pusher, setPusher] = useState<Pusher>();
  const [localGameState, setLocalGameState] = useState(newGameState(false));
  const [gameInProgress, setGameinProgress] = useState(false);
  const [gameWinner, setGameWinner] = useState(Cell.Blank); // Blank means no winner, X means host won

  useEffect(() => {
    const pusher_ = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    setPusher(pusher_);
  }, []);

  const room_input_change = (event: any) => {
    setRoomName(event.target.value);
  };

  useEffect(() => {
    // Check for win
    const x_check = checkWinner(Cell.X, localGameState);
    if (x_check == Cell.Blank) {
      setGameWinner(checkWinner(Cell.O, localGameState));
    } else {
      setGameWinner(x_check);
    }
  }, [localGameState]);

  const postTurn = (roomName: string, gameState: GameState) => {
    axios
      .post("/api/pusher/tictactoe/turn", {
        roomName,
        gameState,
      })
      .then((response) => {})
      .catch((error) => console.log("turn error: " + error));
  };

  const updateBoard = (cellType: Cell, index: number) => {
    if (localGameState.board[index] == Cell.Blank) {
      const updatedGameState: GameState = {
        board: [...localGameState.board],
        isHostTurn: !localGameState.isHostTurn,
      };
      updatedGameState.board[index] = cellType;
      setLocalGameState(updatedGameState);
      postTurn(roomName, updatedGameState);
    }
  };

  const createGame = () => {
    setIsHost(true);
    setInLobby(false);
    const channel = pusher?.subscribe(roomName);

    channel?.bind("turn", (data: GameState) => {
      setLocalGameState(data);
    });

    channel?.bind("guest-joined", () => {
      // Guest has now joined, so we can start the game

      // Initialise the first game state and send it to both players
      postTurn(roomName, newGameState(true));
      setGameinProgress(true);
    });
  };

  const joinGame = () => {
    setIsHost(false);
    setInLobby(false);
    const channel = pusher?.subscribe(roomName);

    channel?.bind("turn", (data: GameState) => {
      setLocalGameState(data);
    });

    axios
      .post("/api/pusher/tictactoe/join", { roomName })
      .then((response) => {
        setGameinProgress(true);
      })
      .catch((error) => console.log("error: " + error));
  };

  const backToLobby = () => {
    pusher?.unsubscribe(roomName);
    setInLobby(true);
    setRoomName("");
    setLocalGameState(newGameState(false));
    setGameinProgress(false);
  };

  const onCellClick = (index: number) => {
    if (gameWinner == Cell.Blank) {
      // No winner yet, so a move can be made
      if (localGameState.isHostTurn && isHost) {
        updateBoard(Cell.X, index);
      } else if (!localGameState.isHostTurn && !isHost) {
        updateBoard(Cell.O, index);
      }
    }
  };

  const checkWinner = (cell: Cell, gameState: GameState): Cell => {
    for (let i = 0; i < 3; i++) {
      if (
        gameState.board[3 * i] == cell &&
        gameState.board[3 * i + 1] == cell &&
        gameState.board[3 * i + 2] == cell
      ) {
        return cell;
      }
      if (
        gameState.board[i] == cell &&
        gameState.board[i + 3] == cell &&
        gameState.board[i + 6] == cell
      ) {
        return cell;
      }
    }
    if (
      (gameState.board[0] == cell &&
        gameState.board[4] == cell &&
        gameState.board[8] == cell) ||
      (gameState.board[2] == cell &&
        gameState.board[4] == cell &&
        gameState.board[6] == cell)
    ) {
      return cell;
    }
    return Cell.Blank;
  };

  const winningMessage = () => {
    if (gameWinner == Cell.Blank) {
      return <div />;
    } else if (
      (gameWinner == Cell.X && isHost) ||
      (gameWinner == Cell.O && !isHost)
    ) {
      return <p className="text-center text-4xl my-4">You Win!</p>;
    } else {
      return <p className="text-center text-4xl my-4">You Lose!</p>;
    }
  };

  return (
    <div>
      {inLobby && (
        <div className="flex flex-col h-screen">
          <BasicNavbar fixed={false} />
          <h1 className="text-center py-2">Tic Tac Toe</h1>
          <div className=" m-auto flex flex-col items-center gap-4 justify-center">
            <input
              className="border-2 w-60 rounded-2xl py-1 px-4 placeholder:text-text-muted bg-background-muted border-text-muted"
              placeholder="Create/Join Room Code"
              value={roomName}
              onChange={room_input_change}
            />
            <button className="btn w-32" onClick={createGame}>
              Create Game
            </button>
            <button className="btn w-32" onClick={joinGame}>
              Join Game
            </button>
          </div>
          <div className="flex items-center gap-2"></div>
        </div>
      )}
      {!inLobby && (
        <div>
          <BasicNavbar fixed={false} />
          <button className="btn w-32 ml-4 mt-4" onClick={backToLobby}>
            Back
          </button>
          {gameStateToJSX(localGameState, onCellClick)}
        </div>
      )}
      {gameInProgress && gameWinner == Cell.Blank && (
        <p
          className={
            "text-center text-2xl font-bold my-4 " +
            (localGameState.isHostTurn == isHost
              ? "text-green-700"
              : "text-red-700")
          }
        >
          {localGameState.isHostTurn == isHost
            ? "Your Turn"
            : "Opponent's Turn"}
        </p>
      )}
      {!gameInProgress && !inLobby && (
        <p className="text-center text-2xl my-4">
          Waiting for an opponent to join room {`"${roomName}"`}
        </p>
      )}
      {winningMessage()}
    </div>
  );
};

export default TicTacToe;
