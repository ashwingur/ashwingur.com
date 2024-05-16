import ArtNavBar from "../../components/ArtNavBar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import p5 from "p5";
// import vert from "assets/shaders/shader.vert";
import vert from "./ShaderTest/shader.vert";
import frag from "./ShaderTest/shader.frag";

let vertSrc = `
precision highp float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
`;

// Create a string with the fragment shader program.
// The fragment shader is called for each pixel.
let fragSrc = `
precision highp float;
uniform vec2 p;
uniform float r;
const int numIterations = 500;
varying vec2 vTexCoord;

void main() {
  vec2 c = p + gl_FragCoord.xy * r;
  vec2 z = c;
  float n = 0.0;

  for (int i = numIterations; i > 0; i--) {
    if (z.x * z.x + z.y * z.y > 4.0) {
      n = float(i) / float(numIterations);
      break;
    }
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
  }

  gl_FragColor = vec4(
    0.5 - cos(n * 17.0) / 2.0,
    0.5 - cos(n * 13.0) / 2.0,
    0.5 - cos(n * 23.0) / 2.0,
    1.0
  );
}
`;

const ShaderTest = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;
    let mandelbrot: p5.Shader;

    p5.preload = () => {};

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 800);
      height = Math.min(p5.windowWidth - 20, 800);
      p5.createCanvas(width, height, p5.WEBGL);
      mandelbrot = p5.createShader(vert, frag);
      p5.shader(mandelbrot);
      // Set the shader uniform p to an array.
      // p is the center point of the Mandelbrot image.
      mandelbrot.setUniform("p", [-1.84364388703, -1.13182590421]);

      // Set the shader uniform r to 0.005.
      // r is the size of the image in Mandelbrot-space.
      mandelbrot.setUniform("r", 0.005);

      p5.noStroke();

      p5.plane(width, height);
    };

    p5.draw = () => {
      //   p5.rect(0, 0, width, height);
      let radius = 0.005 * (p5.sin(p5.frameCount * 0.01) + 1);
      mandelbrot.setUniform("r", radius);

      //   // Style the drawing surface.
      //   noStroke();

      // Add a plane as a drawing surface.
      p5.plane(width, height);
    };
  };

  return (
    <div>
      <ArtNavBar fixed={true} />
      <h1 className="text-center pt-20">Shader Test</h1>
      <div className="flex justify-center mt-4 mb-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default ShaderTest;
