import { P5CanvasInstance, SketchProps, type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import BasicNavbar from "../components/BasicNavbar";

const sketch: Sketch = (p5: P5CanvasInstance) => {
  let grid: number[][];
  // size of each square
  let w = 4;
  let cols: number, rows: number;
  const acceleration = 1.05;
  const start_speed = 2;

  const make2DArray = (rows: number, cols: number) => {
    let arr: number[][] = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(cols);
      // Fill the array with 0s
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  };

  p5.setup = () => {
    p5.createCanvas(1000, 800);
    rows = p5.height / w;
    cols = p5.width / w;
    grid = make2DArray(rows, cols);
  };

  const withinCols = (x: number) => x >= 0 && x < cols;
  const withinRows = (y: number) => y >= 0 && y < rows;

  const generateSand = () => {
    // Generate sand randomly in this matrix
    let matrix_half = 4;

    let mouseCol = p5.floor(p5.mouseX / w);
    let mouseRow = p5.floor(p5.mouseY / w);
    for (let i = mouseRow - matrix_half; i < mouseRow + matrix_half; i++) {
      for (let j = mouseCol - matrix_half; j < mouseCol + matrix_half; j++) {
        if (Math.random() < 0.5 && withinRows(i) && withinCols(j)) {
          grid[i][j] = start_speed;
        }
      }
    }
  };

  p5.draw = () => {
    p5.background(0);

    if (p5.mouseIsPressed) {
      generateSand();
    }

    // Draw the sand
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        p5.noStroke();
        if (grid[i][j] > 0) {
          //   console.log("square");
          p5.fill(255, 255, 255);
          let y = (i + 1) * w;
          let x = j * w;
          p5.square(x, y, w);
        }
      }
    }

    // Simulate the next frame
    let next_grid = make2DArray(rows, cols);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // If it is a grain of sand then have it fall down
        let state = grid[i][j];

        if (state > 0) {
          // State represents the velocity if its > 0, go down by that many pixels. if something is already there then go back up to find the nearest unfilled pixel
          let next_row = Math.floor(i + state);

          // If there is something directly below, then see if you can go left or right
          if (i + 1 < rows && grid[i + 1][j] > 0) {
            // See if you can go left or right
            let dir = Math.random() < 0.5 ? -1 : 1;
            if (grid[i + 1][j + dir] === 0) {
              next_grid[i + 1][j + dir] = state * acceleration;
              continue;
            } else if (grid[i + 1][j - dir] === 0) {
              next_grid[i + 1][j - dir] = state * acceleration;
              continue;
            }
          }

          if (i + 1 < rows && grid[i + 1][j] > 0) {
            next_grid[i][j] = state * acceleration;
          } else {
            // Search for the next empty spot
            if (!withinRows(next_row + 1)) {
              next_row = rows - 2;
            }
            for (let d = i; d <= next_row; d++) {
              if (grid[d + 1][j] > 0 || d == next_row) {
                next_grid[d][j] = state * acceleration;
                break;
              }
            }
          }
        }
      }
    }

    grid = next_grid;
  };
};

const Sand = () => {
  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-center mt-20">Dune</h1>
      <div className="flex justify-center mt-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default Sand;
