import React from "react";
import BasicNavbar from "../../components/BasicNavbar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const RainbowSmoke = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;
    let pixel_size: number;
    const rgb_resolution = 16;
    const rgb_scale = 256 / rgb_resolution;
    let rgbSpace: RGBSpace;
    const board_size = 64;
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
      constructor(resolution: number) {
        this.resolution = resolution;
        // Initialize the 3D RGB array to keep track of what colour has been used
        // 0 will represent unused, 1 represents used
        this.rgb_used = [];
        // Fill the array with 1s
        for (let i = 0; i < rgb_resolution; i++) {
          this.rgb_used[i] = [];
          for (let j = 0; j < rgb_resolution; j++) {
            this.rgb_used[i][j] = [];
            for (let k = 0; k < rgb_resolution; k++) {
              this.rgb_used[i][j][k] = false;
            }
          }
        }
      }

      // Given an rgb number, find the closest unused value
      findClosestUnusedColour(
        x: number,
        y: number,
        z: number
      ): [number, number, number] {
        const visited: boolean[][][] = new Array(this.resolution)
          .fill(null)
          .map(() =>
            new Array(this.resolution)
              .fill(null)
              .map(() => new Array(this.resolution).fill(false))
          );

        const queue: Cell[] = [];
        queue.push(new Cell(x, y, z));
        // console.log(x, y, z);
        visited[x][y][z] = true;

        const dx = [1, -1, 0, 0, 0, 0];
        const dy = [0, 0, 1, -1, 0, 0];
        const dz = [0, 0, 0, 0, 1, -1];

        while (queue.length > 0) {
          const currentCell = queue.shift() as Cell;
          //   console.log(
          //     `Visiting cell (${currentCell.x}, ${currentCell.y}, ${currentCell.z})`
          //   );

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

            if (this.isValidCell(nextCell) && !visited[nextX][nextY][nextZ]) {
              //   Math.random() > 0.5
              //     ? queue.push(nextCell)
              //     : queue.unshift(nextCell);
              queue.push(nextCell);
              //   queue.unshift(nextCell);
              visited[nextX][nextY][nextZ] = true;
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

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 640);
      height = width;
      p5.createCanvas(width, height);

      pixel_size = width / board_size;

      // Initialise 2D board on which to paint. The third dimension will be the RGB value
      board = new Array();
      for (let i = 0; i < board_size; i++) {
        board[i] = [];
        for (let j = 0; j < board_size; j++) {
          board[i][j] = new Pixel(i, j);
        }
      }

      rgbSpace = new RGBSpace(rgb_resolution);

      const first_pixel = new Pixel(16, 16);
      first_pixel.fill(
        Math.floor(Math.random() * rgb_resolution),
        Math.floor(Math.random() * rgb_resolution),
        Math.floor(Math.random() * rgb_resolution)
      );
      rgbSpace.rgb_used[first_pixel.R][first_pixel.G][first_pixel.B] = true;
      previousPixel = first_pixel;
      addPixelToVisit(first_pixel.x + 1, first_pixel.y);
      addPixelToVisit(first_pixel.x - 1, first_pixel.y);
      addPixelToVisit(first_pixel.x, first_pixel.y + 1);
      addPixelToVisit(first_pixel.x, first_pixel.y - 1);
      //   p5.frameRate(1);
      p5.noStroke();
    };

    function addPixelToVisit(x: number, y: number, atStart: boolean) {
      if (
        x >= 0 &&
        y >= 0 &&
        x < board_size &&
        y < board_size &&
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
      p5.background(255);

      for (let a = 0; a < 5; a++) {
        const isDFS = Math.random() > 0.5;

        for (let c = 0; c < 5 && to_visit.length > 0; c++) {
          // Pop the first pixel and colour it in
          const pixel = to_visit.shift() as Pixel;
          // const pixel = to_visit.shift() as Pixel;
          //   const randomIndex = Math.floor(Math.random() * to_visit.length * 0.2);
          //   const pixel = to_visit.splice(randomIndex, 1)[0];

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
      for (let i = 0; i < board_size; i++) {
        for (let j = 0; j < board_size; j++) {
          board[i][j].filled
            ? p5.fill(
                board[i][j].R * rgb_scale,
                board[i][j].G * rgb_scale,
                board[i][j].B * rgb_scale
              )
            : p5.fill(255);

          p5.rect(i * pixel_size, j * pixel_size, pixel_size, pixel_size);
        }
      }
    };
  };

  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-center pt-20">Rainbow Smoke</h1>
      <div className="flex justify-center my-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default RainbowSmoke;
