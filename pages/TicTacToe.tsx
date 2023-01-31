import axios from "axios";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCircle } from "react-icons/bs";

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
    <div className="grid grid-cols-3 bg-black gap-1 mx-auto mt-24 w-[246px]">
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
        <div className="bg-slate-100 text-center h-20 w-20  hover:bg-slate-200 transition-all">
          {" "}
        </div>
      );
    case Cell.O:
      return (
        <div className="bg-slate-100 text-center h-20 w-20 flex">
          <BsCircle className="m-auto" size={50} />
        </div>
      );
    case Cell.X:
      return (
        <div className="bg-slate-100 text-center h-20 w-20  flex">
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

  useEffect(() => {
    const pusher_ = new Pusher("71a7b422dcc29a66021c", {
      cluster: "ap4",
    });
    setPusher(pusher_);
  }, []);

  const room_input_change = (event: any) => {
    setRoomName(event.target.value);
  };

  const postTurn = (roomName: string, gameState: GameState) => {
    axios
      .post("/api/pusher/tictactoe/turn", {
        roomName,
        gameState,
      })
      .then((response) =>
        console.log("tictactoe turn response:" + JSON.stringify(response.data))
      )
      .catch((error) => console.log("turn error: " + error));
  };

  const updateBoard = (cellType: Cell, index: number) => {
    if (localGameState.board[index] == Cell.Blank) {
      const updatedGameState: GameState = {
        board: [...localGameState.board],
        isHostTurn: !localGameState.isHostTurn,
      };
      updatedGameState.board[index] = cellType;
      console.log("updated game board is: " + JSON.stringify(updatedGameState));
      setLocalGameState(updatedGameState);
      postTurn(roomName, updatedGameState);
    }
  };

  const createGame = () => {
    setIsHost(true);
    setInLobby(false);
    const channel = pusher?.subscribe(roomName);
    console.log("Host subscribed to: " + roomName);

    channel?.bind("turn", (data: GameState) => {
      console.log("turn received: " + JSON.stringify(data));
      setLocalGameState(data);
    });

    channel?.bind("guest-joined", () => {
      console.log("Guest has joined");
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
    console.log("Guest subscribed to: " + roomName);

    channel?.bind("turn", (data: GameState) => {
      console.log("turn received: " + JSON.stringify(data));
      setLocalGameState(data);
    });

    axios
      .post("/api/pusher/tictactoe/join", { roomName })
      .then((response) => {
        console.log(
          "join tictactoe response: " + JSON.stringify(response.data)
        );
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
    console.log("clicked cell numer " + index);
    if (localGameState.isHostTurn && isHost) {
      updateBoard(Cell.X, index);
    } else if (!localGameState.isHostTurn && !isHost) {
      updateBoard(Cell.O, index);
    }
  };

  return (
    <div>
      {inLobby && (
        <div className="flex flex-col h-screen">
          <h1 className="text-center py-2">Tic Tac Toe</h1>
          <div className=" m-auto flex flex-col items-center gap-2 justify-center">
            <input
              className="border-2 w-60 rounded-2xl py-1 px-4"
              placeholder="Create/Join Room Code"
              value={roomName}
              onChange={room_input_change}
            />
            <button
              className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-700 transition-all text-white w-32"
              onClick={createGame}
            >
              Create Game
            </button>
            <button
              className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-700 transition-all text-white w-32"
              onClick={joinGame}
            >
              Join Game
            </button>
          </div>
          <div className="flex items-center gap-2"></div>
        </div>
      )}
      {!inLobby && (
        <div>
          <button
            className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-700 transition-all text-white w-32 ml-4 mt-4"
            onClick={backToLobby}
          >
            Back
          </button>
          {gameStateToJSX(localGameState, onCellClick)}
        </div>
      )}
      <p
        className={
          "text-center text-2xl font-bold " +
          (localGameState.isHostTurn == isHost
            ? "text-green-700"
            : "text-red-700")
        }
      >
        {gameInProgress &&
          (localGameState.isHostTurn == isHost
            ? "Your Turn"
            : "Opponent's Turn")}
      </p>
    </div>
  );
};

export default TicTacToe;
