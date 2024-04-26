import { useState } from "react";
import BasicNavbar from "../../components/BasicNavbar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const CellularAutomata = () => {
  const [rule, setRule] = useState<number | "">(30);
  const [nPixels, setNPixels] = useState<number | "">(100);
  const [nLevels, setNLevels] = useState<number | "">(100);
  // Keep this odd for easy centre
  //   const n = 100;
  const n = nPixels === "" ? 10 : nPixels;
  const h = nLevels === "" ? 100 : nLevels;
  console.log(nLevels);

  const ruleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value);
    if (numericValue >= 1 && numericValue <= 255) {
      setRule(numericValue);
    } else {
      setRule("");
    }
  };

  const nPixelsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value);
    if (numericValue >= 1 && numericValue <= 2000) {
      setNPixels(numericValue);
    } else {
      setNPixels("");
    }
  };

  const nLevelsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value);
    if (numericValue >= 1 && numericValue <= 2000) {
      setNLevels(numericValue);
    } else {
      setNLevels("");
    }
  };

  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let row: number[];
    let level = 0;
    let width: number, height: number;
    let max_level: number;
    let rule_array: number[];
    let padding = 20;

    const ruleToArray = (rule: number): number[] => {
      const arr = Array();
      for (let i = 7; i >= 0; i--) {
        arr.push((rule >> i) & 1);
      }
      return arr;
    };

    const setPadding = () => {
      // If we are on moble, use a low padding value
      if (p5.windowWidth < 1000) {
        padding = 0;
      }
    };

    const pixelSize = (): number => {
      return width / n;
    };

    const setHeight = () => {
      if (h * pixelSize() > 10000) {
        height = 10000;
      } else {
        height = h * pixelSize();
      }
    };

    p5.setup = () => {
      setPadding();
      // Make it so the width divides nicely into the number of pixels per row
      width = Math.floor((p5.windowWidth - padding) / n) * n;
      height = h * pixelSize();
      p5.createCanvas(width, height);

      max_level = h;
      row = new Array(n).fill(0);
      row[Math.floor(row.length / 2)] = 1;
      rule_array = ruleToArray(rule === "" ? 0 : rule);

      p5.noStroke();
      p5.background(255);
    };
    p5.draw = () => {
      // We have covered the whole canvas or there is no rule entered, no point computing more
      if (level > max_level || rule === "") {
        return;
      }

      const pixelWidth = width / n;

      const next_row = Array(n);
      // Draw the row
      for (let i = 0; i < row.length; i++) {
        const x = i * pixelWidth;
        const y = level * pixelWidth;
        const colour = row[i] === 1 ? 0 : 255;
        p5.fill(colour);
        p5.rect(x, y, pixelWidth);

        // Also calculate the next row cell
        const left = i - 1 < 0 ? row[n - 1] : row[i - 1];
        const right = i + 1 >= n ? row[0] : row[i + 1];

        next_row[i] = calculateCell(left, row[i], right);
      }
      row = next_row;
      level++;
    };

    const calculateCell = (
      left: number,
      centre: number,
      right: number
    ): number => {
      return rule_array[7 - ((left << 2) + (centre << 1) + right)];
    };

    p5.windowResized = () => {
      // Reset everything
      width = Math.floor((p5.windowWidth - padding) / n) * n;
      height = h * pixelSize();
      p5.resizeCanvas(width, height);
      max_level = height / (width / n);
      level = 0;
      p5.background(255);
      row = new Array(n).fill(0);
      row[Math.floor(row.length / 2)] = 1;
    };
  };

  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-center pt-20">Cellular Automata</h1>
      <div className="flex justify-center items-center mt-4 gap-4">
        <div className="w-24 text-end">Rule (1-255)</div>
        <input
          className="rounded-md py-1 px-2 w-24"
          value={rule}
          onChange={ruleChange}
        />
      </div>
      <div className="flex justify-center items-center mt-4 gap-4">
        <div className="w-24 text-end">Width</div>
        <input
          className="rounded-md py-1 px-2 w-24"
          value={nPixels}
          onChange={nPixelsChange}
        />
      </div>
      <div className="flex justify-center items-center mt-4 gap-4">
        <div className="w-24 text-end">Height</div>
        <input
          className="rounded-md py-1 px-2 w-24"
          value={nLevels}
          onChange={nLevelsChange}
        />
      </div>
      <div className="flex justify-center mt-4 -z-10">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default CellularAutomata;
