import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { P5CanvasInstance, P5WrapperProps, Sketch } from "@p5-wrapper/react";
import BasicNavbar from "../../components/BasicNavbar";
import p5 from "p5";
import { useState } from "react";

const makeRandomMatrix = (numColours: number) => {
  const rows = [];
  for (let i = 0; i < numColours; i++) {
    const row = [];
    for (let j = 0; j < numColours; j++) {
      row.push(Math.random() * 2 - 1);
    }
    rows.push(row);
  }
  return rows;
  // return [
  //   [1, 0, 0, 0, 0, 0],
  //   [0, 1, 0.5, 0, 0, 0],
  //   [0, 0, 1, 0.5, 0, 0],
  //   [0, 0, 0, 1, 0.5, 0],
  //   [0, 0, 0, 0, 1, 0.5],
  //   [0.5, 0, 0, 0, 0, 1],
  // ];
};

const force = (r: number, a: number) => {
  const beta = 0.3;
  if (r < beta) {
    return r / beta - 1;
  } else if (beta < r && r < 1) {
    return a * (1 - Math.abs(2 * r - 1 - beta) / (1 - beta));
  } else {
    return 0;
  }
};

const ParticleLife = () => {
  let width = 1600;
  let height = 1000;
  const [n, setN] = useState(1000);
  const fps = 60;
  const dt = 1 / fps;
  const numColours = 6;
  // Attraction matrix
  const [matrix, setMatrix] = useState(makeRandomMatrix(numColours));
  // Maximum attraction distance (0-1)
  const [rMax, setRMax] = useState(0.2);
  const [forceFactor, setForceFactor] = useState(2);
  const [frictionHalfLife, setFrictionHalfLife] = useState(0.04);
  const frictionFactor = Math.pow(0.5, dt / frictionHalfLife);
  const [particleSize, setParticleSize] = useState(4);

  const colours = new Int32Array(n);
  const positionsX = new Float32Array(n);
  const positionsY = new Float32Array(n);
  const velocitiesX = new Float32Array(n);
  const velocitiesY = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    colours[i] = Math.floor(Math.random() * numColours);
    positionsX[i] = Math.random();
    positionsY[i] = Math.random();
    velocitiesX[i] = 0;
    velocitiesY[i] = 0;
  }

  const updateParticles = () => {
    // update velocities
    for (let i = 0; i < n; i++) {
      let totalForceX = 0;
      let totalForceY = 0;

      for (let j = 0; j < n; j++) {
        if (j === i) continue;
        let rx = positionsX[j] - positionsX[i];
        let ry = positionsY[j] - positionsY[i];

        // Adjust for wrapping around the canvas
        if (Math.abs(rx) > 0.5) {
          rx -= Math.sign(rx);
        }
        if (Math.abs(ry) > 0.5) {
          ry -= Math.sign(ry);
        }

        const r = Math.hypot(rx, ry);
        if (r > 0 && r < rMax) {
          const f = force(r / rMax, matrix[colours[i]][colours[j]]);
          totalForceX += (rx / r) * f;
          totalForceY += (ry / r) * f;
        }
      }

      totalForceX *= rMax * forceFactor;
      totalForceY *= rMax * forceFactor;

      velocitiesX[i] *= frictionFactor;
      velocitiesY[i] *= frictionFactor;

      velocitiesX[i] += totalForceX * dt;
      velocitiesY[i] += totalForceY * dt;
    }

    // update positions
    for (let i = 0; i < n; i++) {
      positionsX[i] += velocitiesX[i] * dt;
      positionsY[i] += velocitiesY[i] * dt;

      // Wrap around the canvas if they go out of it
      if (positionsX[i] <= 0) {
        positionsX[i] = 1;
      } else if (positionsX[i] >= 1) {
        positionsX[i] = 0;
      }
      if (positionsY[i] <= 0) {
        positionsY[i] = 1;
      } else if (positionsY[i] >= 1) {
        positionsY[i] = 0;
      }
    }
  };

  const sketch: Sketch = (p5: P5CanvasInstance) => {
    p5.setup = () => {
      width = Math.min(width, p5.windowWidth - 10);
      height = Math.min(height, p5.windowHeight - 200);
      p5.createCanvas(width, height);

      p5.noStroke();
      p5.colorMode(p5.HSL);
      p5.frameRate(fps);
    };

    p5.mousePressed = () => {};

    p5.draw = () => {
      p5.background(0);

      updateParticles();

      for (let i = 0; i < n; i++) {
        const screenX = positionsX[i] * width;
        const screenY = positionsY[i] * height;
        p5.fill((360 * colours[i]) / numColours, 100, 50);
        p5.circle(screenX, screenY, particleSize);
      }
    };
  };

  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-center pt-20">Particle Life</h1>
      <div className="flex justify-center mt-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default ParticleLife;
