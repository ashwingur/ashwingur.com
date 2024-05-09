import ArtNavBar from "../../components/ArtNavBar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const SparkPuddle = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 800);
      height = Math.min(p5.windowWidth - 20, 800);
      p5.createCanvas(width, height);
    };

    p5.draw = () => {
      p5.background(0);
    };
  };

  return (
    <div>
      <ArtNavBar fixed={true} />
      <h1 className="text-center pt-20">Spark Puddle</h1>
      <div className="flex justify-center mt-4 mb-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default SparkPuddle;
