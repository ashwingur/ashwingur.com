import axios from "axios";
import Pusher from "pusher-js";
import Callback from "pusher-js/types/src/core/events/callback";
import React, { useEffect, useState } from "react";

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

const newGameState = (): GameState => {
  return {
    board: Array(9).fill(Cell.Blank),
    isHostTurn: true,
  };
};

const gameStateToJSX = (
  gamestate: GameState,
  onCellClick: (index: number) => void
) => {
  return (
    <div className="grid grid-cols-3 bg-black gap-1 m-16">
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
      return <div className="bg-white text-center h-20"> </div>;
    case Cell.O:
      return <div className="bg-white text-center h-20"> O </div>;
    case Cell.X:
      return <div className="bg-white text-center h-20"> X </div>;
  }
};

const TicTacToe = () => {
  const [inLobby, setInLobby] = useState(true);
  const [isHost, setIsHost] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [pusher, setPusher] = useState<Pusher>();
  const [localGameState, setLocalGameState] = useState(newGameState);

  useEffect(() => {
    const pusher_ = new Pusher("71a7b422dcc29a66021c", {
      cluster: "ap4",
    });
    setPusher(pusher_);
  }, []);

  const room_input_change = (event: any) => {
    setRoomName(event.target.value);
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

    channel?.bind("guest-joined", (data: any) => {
      console.log("Guest has joined");
      // Guest has now joined, so we can start the game
      // Initialise gamestate

      // Later on add randomisation on who starts first
      axios
        .post("/api/pusher/tictactoe/turn", {
          roomName: roomName,
          gameState: newGameState(),
        })
        .then((response) =>
          console.log(
            "tictactoe turn response:" + JSON.stringify(response.data)
          )
        )
        .catch((error) => console.log("turn error: " + error));
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
      .then((response) =>
        console.log("join tictactoe response: " + JSON.stringify(response.data))
      )
      .catch((error) => console.log("error: " + error));
  };

  const backToLobby = () => {
    pusher?.unsubscribe(roomName);
    setInLobby(true);
    setRoomName("");
  };

  const onCellClick = (index: number) => {
    console.log("clicked cell numer " + index);
    if (localGameState.isHostTurn && isHost) {
      const updatedGameState: GameState = {
        board: [...localGameState.board],
        isHostTurn: !localGameState.isHostTurn,
      };
      updatedGameState.board[index] = Cell.X;
      setLocalGameState(updatedGameState);
      axios
        .post("/api/pusher/tictactoe/turn", {
          roomName,
          gameState: updatedGameState,
        })
        .then((response) =>
          console.log(
            "tictactoe turn response:" + JSON.stringify(response.data)
          )
        )
        .catch((error) => console.log("turn error: " + error));
    } else if (!localGameState.isHostTurn && !isHost) {
      const updatedGameState: GameState = {
        board: [...localGameState.board],
        isHostTurn: !localGameState.isHostTurn,
      };
      updatedGameState.board[index] = Cell.O;
      setLocalGameState(updatedGameState);
      axios
        .post("/api/pusher/tictactoe/turn", {
          roomName,
          gameState: updatedGameState,
        })
        .then((response) =>
          console.log(
            "tictactoe turn response:" + JSON.stringify(response.data)
          )
        )
        .catch((error) => console.log("turn error: " + error));
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
            className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-700 transition-all text-white w-32"
            onClick={backToLobby}
          >
            Back
          </button>
          {gameStateToJSX(localGameState, onCellClick)}
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
