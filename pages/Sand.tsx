import { P5CanvasInstance, SketchProps, type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import BasicNavbar from "../components/BasicNavbar";

const sketch: Sketch = (p5: P5CanvasInstance) => {
  let grid: number[][];
  // size of each square
  let w = 2;
  let cols: number, rows: number;

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
    p5.createCanvas(600, 400);
    rows = p5.height / w;
    cols = p5.width / w;
    grid = make2DArray(rows, cols);
  };

  const withinCols = (x: number) => x >= 0 && x < cols;
  const withinRows = (y: number) => y >= 0 && y < rows;

  p5.mouseDragged = () => {
    console.log("dragged");
    console.log(p5.mouseX, p5.mouseY);

    let mouseCol = p5.floor(p5.mouseX / w);
    let mouseRow = p5.floor(p5.mouseY / w);

    if (withinRows(mouseRow) && withinCols(mouseCol))
      grid[mouseRow][mouseCol] = 1;
  };

  p5.draw = () => {
    p5.background(0);

    // Draw the sand
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        p5.noStroke();
        if (grid[i][j] > 0) {
          p5.fill(255, 255, 255);
          let y = i * w;
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
          // If we are at the bottom most row or there is sand underneath, we can't go down
          if (i === rows - 1 || grid[i + 1][j] === 1) {
            next_grid[i][j] = 1;
          } else {
            next_grid[i + 1][j] = 1;
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
      <h1 className="text-center mt-20">Sand</h1>
      <div className="flex justify-center mt-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default Sand;
