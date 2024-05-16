import ArtNavBar from "../../components/ArtNavBar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import p5 from "p5";
import vert from "./DiscoDonut/shader.vert";
import frag from "./DiscoDonut/shader.frag";

const DiscoDonut = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;
    let gradientShader: p5.Shader;

    p5.preload = () => {};

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 800);
      height = Math.min(p5.windowWidth - 20, 800);
      p5.createCanvas(width, height, p5.WEBGL);
      gradientShader = p5.createShader(vert, frag);
      p5.noStroke();
      p5.ellipseMode(p5.CORNER);
    };

    p5.draw = () => {
      p5.shader(gradientShader);
      gradientShader.setUniform("uShapeDimensions", [width, height]);
      gradientShader.setUniform("millis", p5.millis());
      p5.rect(0, 0, width, height);

      gradientShader.setUniform("uShapeDimensions", [300.4, 300.4]);
      p5.ellipse(0, 0, 300, 300, 100);
      gradientShader.setUniform("uShapeDimensions", [200.7, 200.7]);
      p5.ellipse(0, 0, 200, 200, 100);
      gradientShader.setUniform("uShapeDimensions", [100.3, 100.3]);
      p5.ellipse(0, 0, 100, 100, 100);
    };
  };

  return (
    <div>
      <ArtNavBar fixed={true} />
      <h1 className="text-center pt-20">Disco Donut</h1>
      <div className="flex justify-center mt-4 mb-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default DiscoDonut;
