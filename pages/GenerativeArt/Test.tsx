import ArtNavBar from "../../components/ArtNavBar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { useState } from "react";

type MySketchProps = {
  speed: number;
};

const sketch: Sketch = (p5: P5CanvasInstance<MySketchProps>) => {
  let width: number;
  let height: number;
  let currentSpeed = 0.01;

  p5.setup = () => {
    width = Math.min(p5.windowWidth - 20, 800);
    height = Math.min(p5.windowWidth - 20, 800);
    p5.createCanvas(width, height);
  };

  p5.updateWithProps = (props) => {
    if (props.speed !== undefined) {
      currentSpeed = props.speed;
    }
  };

  p5.draw = () => {
    p5.background(0);
    p5.circle(400 + 100 * p5.sin(p5.millis() * currentSpeed), 400, 10);
  };
};

const Test = () => {
  const [speed, setSpeed] = useState(0.01);

  return (
    <div>
      <ArtNavBar fixed={true} />
      <h1 className="text-center pt-20">Test</h1>
      <button
        className="p-4 bg-black text-white"
        onClick={() => setSpeed((prev) => prev + 0.01)}
      >
        Increase
      </button>
      <button
        className="p-4 bg-black text-white"
        onClick={() => setSpeed((prev) => prev - 0.01)}
      >
        Decrease
      </button>
      <div className="flex justify-center mt-4 mb-8">
        <NextReactP5Wrapper sketch={sketch} speed={speed} />
      </div>
      <div className="text-center">{speed.toFixed(2)}</div>
    </div>
  );
};

export default Test;
