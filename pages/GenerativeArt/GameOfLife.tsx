import ArtNavBar from "../../components/ArtNavBar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import p5 from "p5";
import vert from "./GameOfLife/shader.vert";
import frag from "./GameOfLife/shader.frag";
import { useState } from "react";

const GameOfLife = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;
    let myShader: p5.Shader;
    let textCanvas: p5.Graphics;

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 1200);
      height = Math.min(p5.windowHeight - 20, 800);
      p5.createCanvas(width, height, p5.WEBGL);
      myShader = p5.createShader(vert, frag);
      p5.pixelDensity(1);
      p5.background(0);
      p5.stroke(255);
      p5.noSmooth();
      p5.shader(myShader);
      myShader.setUniform("pixelSize", [1.0 / width, 1.0 / height]);
    };

    p5.draw = () => {
      if (p5.mouseIsPressed) {
        p5.line(
          p5.pmouseX - width / 2,
          p5.pmouseY - height / 2,
          p5.mouseX - width / 2,
          p5.mouseY - height / 2
        );
      }

      myShader.setUniform("tex", p5.get());
      p5.rect(-width / 2, -height / 2, width, height);
    };
  };

  return (
    <div>
      <ArtNavBar fixed={true} />
      <h1 className="text-center pt-20">Game of Life</h1>
      <div className="flex justify-center mt-4 mb-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default GameOfLife;
