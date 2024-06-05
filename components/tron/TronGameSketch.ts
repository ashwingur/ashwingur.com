import { GameTickEvent, Player } from "@interfaces/tron.interface";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";

type MySketchProps = {
  players: Player[];
  colours?: string[];
  positions: Record<string, [number, number]>;
};

const sketch: Sketch = (p5: P5CanvasInstance<MySketchProps>) => {
  let width: number;
  let height: number;
  let players: Player[] = [];
  let colours: string[] = [];
  let positions: Record<string, [number, number]> = {};

  p5.setup = () => {
    width = Math.min(p5.windowWidth - 20, 800);
    height = Math.min(p5.windowWidth - 20, 800);
    p5.createCanvas(width, height);
    p5.background(0);
    p5.noStroke();
  };

  p5.updateWithProps = (props) => {
    if (props.players !== undefined) {
      players = props.players;
    }
    if (props.colours !== undefined) {
      colours = props.colours;
    }
    if (props.positions !== undefined) {
      positions = props.positions;
    }
  };

  p5.draw = () => {
    // p5.circle(400 + 100 * p5.sin(p5.millis() * currentSpeed), 400, 10);

    players.forEach((p) => {
      if (p.sid in positions) {
        p5.fill(p.colour);
        p5.square(positions[p.sid][0] * 4, positions[p.sid][1] * 4, 4);
      }
    });
  };
};

export default sketch;
