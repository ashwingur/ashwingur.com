import React, { useState } from "react";
import BasicNavbar from "../../components/BasicNavbar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { QueriesObserver } from "react-query";

const RainbowSmoke = () => {
  const [branching, setBranching] = useState(0.3);
  const [rgbResolution, setRgbResolution] = useState(48);
  const [boardSizeIndex, setBoardSizeIndex] = useState(4);
  const [queueReset, setQueueReset] = useState(true);
  const [binSize, setBinSize] = useState(10);
  const [speed, setSpeed] = useState(10);
  const boardSizes = [8, 16, 32, 64, 128, 256, 512, 1024];
  const boardSize = boardSizes[boardSizeIndex];

  const branchingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBranching(parseFloat(event.target.value));
  };
  const rgbResolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRgbResolution(parseInt(event.target.value));
  };
  const boardSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardSizeIndex(parseInt(event.target.value));
  };
  const binSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBinSize(parseInt(event.target.value));
  };
  const speedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(event.target.value));
  };

  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;
    let pixel_size: number;
    const rgb_scale = 256 / rgbResolution;
    let rgbSpace: RGBSpace;
    let board: Pixel[][];
    let previousPixel: Pixel;

    let to_visit: Pixel[] = [];

    class Pixel {
      x: number;
      y: number;
      R: number;
      G: number;
      B: number;
      filled: boolean;

      constructor(
        x: number,
        y: number,
        r: number = 0,
        g: number = 0,
        b: number = 0
      ) {
        this.x = x;
        this.y = y;
        this.R = r;
        this.G = g;
        this.B = b;
        this.filled = false;
      }

      fill(r: number, g: number, b: number) {
        this.R = r;
        this.G = g;
        this.B = b;
        this.filled = true;
      }
    }

    class Cell {
      x: number;
      y: number;
      z: number;

      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }

    class RGBSpace {
      rgb_used: boolean[][][];
      resolution: number;
      visited: boolean[][][];
      queue: Cell[];
      constructor(resolution: number) {
        this.resolution = resolution;
        // Initialize the 3D RGB array to keep track of what colour has been used
        // 0 will represent unused, 1 represents used
        this.rgb_used = [];
        // Fill the array with 1s
        for (let i = 0; i < rgbResolution; i++) {
          this.rgb_used[i] = [];
          for (let j = 0; j < rgbResolution; j++) {
            this.rgb_used[i][j] = [];
            for (let k = 0; k < rgbResolution; k++) {
              this.rgb_used[i][j][k] = false;
            }
          }
        }

        this.queue = [];

        this.visited = new Array(this.resolution)
          .fill(null)
          .map(() =>
            new Array(this.resolution)
              .fill(null)
              .map(() => new Array(this.resolution).fill(false))
          );
      }

      // Given an rgb number, find the closest unused value
      findClosestUnusedColour(
        x: number,
        y: number,
        z: number
      ): [number, number, number] {
        if (queueReset) {
          this.queue = [];
        }
        this.queue.push(new Cell(x, y, z));
        // console.log(x, y, z);
        this.visited[x][y][z] = true;

        const dx = [1, -1, 0, 0, 0, 0];
        const dy = [0, 0, 1, -1, 0, 0];
        const dz = [0, 0, 0, 0, 1, -1];

        while (this.queue.length > 0) {
          const currentCell = this.queue.shift() as Cell;

          // Check if this is an unused RGB value
          // If its unused then we have successfully found the next colour to use
          if (!this.rgb_used[currentCell.x][currentCell.y][currentCell.z]) {
            this.rgb_used[currentCell.x][currentCell.y][currentCell.z] = true;
            return [currentCell.x, currentCell.y, currentCell.z];
          }

          for (let i = 0; i < 6; i++) {
            const nextX = currentCell.x + dx[i];
            const nextY = currentCell.y + dy[i];
            const nextZ = currentCell.z + dz[i];

            const nextCell = new Cell(nextX, nextY, nextZ);

            if (
              this.isValidCell(nextCell) &&
              !this.visited[nextX][nextY][nextZ]
            ) {
              this.queue.push(nextCell);

              this.visited[nextX][nextY][nextZ] = true;
            }
          }
        }

        return [0, 0, 0];
      }

      isValidCell(cell: Cell): boolean {
        return (
          cell.x >= 0 &&
          cell.x < this.resolution &&
          cell.y >= 0 &&
          cell.y < this.resolution &&
          cell.z >= 0 &&
          cell.z < this.resolution
        );
      }
    }

    p5.mouseClicked = () => {
      if (
        p5.mouseX > 0 &&
        p5.mouseX < width &&
        p5.mouseY > 0 &&
        p5.mouseY <= height &&
        width > 1000
      ) {
        console.log(p5.mouseX);
        console.log(p5.mouseY);
        p5.saveCanvas("painting.png");
      }
    };

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 1024);
      height = width;
      p5.createCanvas(width, height);

      pixel_size = width / boardSize;

      // Initialise 2D board on which to paint. The third dimension will be the RGB value
      board = new Array();
      for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
          board[i][j] = new Pixel(i, j);
        }
      }

      rgbSpace = new RGBSpace(rgbResolution);

      const first_pixel = new Pixel(
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize)
      );
      first_pixel.fill(
        Math.floor(Math.random() * rgbResolution),
        Math.floor(Math.random() * rgbResolution),
        Math.floor(Math.random() * rgbResolution)
      );
      rgbSpace.rgb_used[first_pixel.R][first_pixel.G][first_pixel.B] = true;
      previousPixel = first_pixel;
      addPixelToVisit(first_pixel.x + 1, first_pixel.y, true);
      addPixelToVisit(first_pixel.x - 1, first_pixel.y, true);
      addPixelToVisit(first_pixel.x, first_pixel.y + 1, true);
      addPixelToVisit(first_pixel.x, first_pixel.y - 1, true);
      //   p5.frameRate(1);
      p5.background(255);
      p5.noStroke();
    };

    function addPixelToVisit(x: number, y: number, atStart: boolean) {
      if (
        x >= 0 &&
        y >= 0 &&
        x < boardSize &&
        y < boardSize &&
        !board[x][y].filled &&
        !to_visit.includes(board[x][y])
      ) {
        if (atStart) {
          to_visit.unshift(board[x][y]);
        } else {
          to_visit.push(board[x][y]);
        }
      }
    }

    p5.draw = () => {
      if (to_visit.length > 0) {
        for (let a = 0; a < speed && to_visit.length > 0; a++) {
          const isDFS = Math.random() > 1 - branching;

          for (let c = 0; c < binSize && to_visit.length > 0; c++) {
            // Pop the first pixel and colour it in
            const pixel = to_visit.shift() as Pixel;

            // Find the closest unused colour
            const [r, g, b] = rgbSpace.findClosestUnusedColour(
              previousPixel.R,
              previousPixel.G,
              previousPixel.B
            );
            pixel.fill(r, g, b);
            previousPixel = pixel;

            // Add unfilled neighbours
            addPixelToVisit(pixel.x + 1, pixel.y, isDFS);
            addPixelToVisit(pixel.x - 1, pixel.y, isDFS);
            addPixelToVisit(pixel.x, pixel.y + 1, isDFS);
            addPixelToVisit(pixel.x, pixel.y - 1, isDFS);
          }
        }

        // Draw the board
        for (let i = 0; i < boardSize; i++) {
          for (let j = 0; j < boardSize; j++) {
            if (board[i][j].filled) {
              p5.fill(
                board[i][j].R * rgb_scale,
                board[i][j].G * rgb_scale,
                board[i][j].B * rgb_scale
              );
              p5.rect(i * pixel_size, j * pixel_size, pixel_size, pixel_size);
            }
          }
        }
      }
    };
  };
  const [sketchWrapper, setSketchWrapper] = useState(
    <NextReactP5Wrapper sketch={sketch} />
  );

  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-center pt-20">Rainbow Smoke</h1>
      <div className="flex flex-col justify-center items-center">
        <button
          className="text-center p-2 bg-blue-600 text-white rounded-md my-4"
          onClick={() => {
            setQueueReset(!queueReset);
          }}
        >
          {queueReset ? "Queue Reset Enabled" : "Queue Reset Disabled"}
        </button>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center items-center gap-4">
          <div>
            <div>Branching: {branching}</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={branching}
              onChange={branchingChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>RGB Resolution: {rgbResolution}</div>
            <input
              type="range"
              min={8}
              max={256}
              step={8}
              value={rgbResolution}
              onChange={rgbResolutionChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Resolution: {boardSizes[boardSizeIndex]}</div>
            <input
              type="range"
              min={0}
              max={7}
              step={1}
              value={boardSizeIndex}
              onChange={boardSizeChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Bin Size: {binSize}</div>
            <input
              type="range"
              min={1}
              max={80}
              step={1}
              value={binSize}
              onChange={binSizeChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Speed: {speed}</div>
            <input
              type="range"
              min={1}
              max={200}
              step={1}
              value={speed}
              onChange={speedChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default RainbowSmoke;
