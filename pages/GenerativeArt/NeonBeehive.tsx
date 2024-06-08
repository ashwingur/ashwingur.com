import React, { useState } from "react";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import ArtNavBar from "@components/navbars/ArtNavBar";

const NeonBeehive = () => {
  const [speed, setSpeed] = useState(2);
  const [hexagonSize, setHexagonSize] = useState(20);
  const [spawnPeriod, setSpawnPeriod] = useState(20);
  const [particleLife, setParticleLife] = useState(500);
  const [particleSize, setParticleSize] = useState(3);
  const [sparkLife, setSparkLife] = useState(10);
  const [sparkSpread, setSparkSpread] = useState(10);
  const [sparkFrequency, setSparkFrequency] = useState(0.1);
  const [sparkSize, setSparkSize] = useState(2);

  const speedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(event.target.value));
  };
  const hexagonSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHexagonSize(parseInt(event.target.value));
  };
  const spawnPeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpawnPeriod(parseInt(event.target.value));
  };
  const particleLifeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParticleLife(parseInt(event.target.value));
  };
  const particleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParticleSize(parseInt(event.target.value));
  };
  const sparkLifeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSparkLife(parseInt(event.target.value));
  };
  const sparkSpreadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSparkSpread(parseInt(event.target.value));
  };
  const sparkFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSparkFrequency(parseFloat(event.target.value));
  };
  const sparkSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSparkSize(parseInt(event.target.value));
  };

  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;
    let particles: Particle[] = [];
    let sparks: Spark[] = [];
    let timeSinceLastSpawn = 0;
    let frameRate = 180;
    let particle_colour = 0;

    class Spark {
      life: number;

      constructor(public x: number, public y: number, public colour: number) {
        this.life = sparkLife;
      }

      update() {
        this.life--;
      }

      draw() {
        p5.fill(this.colour, 50, 60);
        p5.circle(this.x, this.y, sparkSize);
      }

      isDead() {
        return this.life < 0;
      }
    }

    class Particle {
      life: number;
      distance_travelled: number;
      direction_angle: number;

      constructor(public x: number, public y: number, public colour: number) {
        this.life = particleLife;
        this.distance_travelled = 0;
        this.direction_angle = Math.floor(p5.random(0, 3)) * 240;
      }

      update() {
        // Increment the distance travelled
        this.distance_travelled += speed;
        // If it has reached the hexagon size, then we must make a turn
        if (this.distance_travelled >= hexagonSize) {
          // Update x,y
          this.x += hexagonSize * p5.cos(this.direction_angle);
          this.y += hexagonSize * p5.sin(this.direction_angle);
          // Update direction by +-60 degrees for a hexagon. 120 is for a triangle
          this.direction_angle += Math.random() > 0.5 ? 60 : -60;
          this.direction_angle %= 360; // Keep it between 0 and 360

          // New line started, reset distance travelled
          this.distance_travelled = 0;
        }

        // Create a random spark
        if (Math.random() < sparkFrequency) {
          sparks.push(
            new Spark(
              this.x +
                this.distance_travelled * p5.cos(this.direction_angle) +
                Math.random() * sparkSpread -
                sparkSpread / 2,
              this.y +
                this.distance_travelled * p5.sin(this.direction_angle) +
                Math.random() * sparkSpread -
                sparkSpread / 2,
              this.colour
            )
          );
        }

        this.life--;
      }

      draw() {
        p5.fill(this.colour, 80, 60);
        p5.circle(
          this.x + this.distance_travelled * p5.cos(this.direction_angle),
          this.y + this.distance_travelled * p5.sin(this.direction_angle),
          particleSize
        );
      }

      isDead(): boolean {
        return this.life < 0;
      }
    }

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 1000);
      height = Math.min(p5.windowWidth - 20, 1000);
      p5.createCanvas(width, height);

      p5.angleMode(p5.DEGREES);
      p5.colorMode(p5.HSL);
      p5.noStroke();
      p5.frameRate(frameRate);
      p5.background(0, 0, 0);
    };

    p5.draw = () => {
      p5.background(0, 0, 0, 0.03);
      p5.fill(0, 0, 0);
      p5.rect(0, 0, 50, 20);
      p5.fill(0, 100, 100);
      p5.text(Math.floor(p5.frameRate()), 10, 20);

      particle_colour += 0.15;
      particle_colour %= 360;

      timeSinceLastSpawn++;
      if (timeSinceLastSpawn >= spawnPeriod) {
        particles.push(new Particle(width / 2, width / 2, particle_colour));
        timeSinceLastSpawn = 0;
      }

      // If a particle is dead remove it from the list
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        if (sparks[i].isDead()) {
          sparks.splice(i, 1);
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      sparks.forEach((s) => {
        s.update();
        s.draw();
      });
    };
  };

  return (
    <div>
      <ArtNavBar fixed={true} />
      <h1 className="text-center pt-20">Neon Beehive</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-4 mt-4">
          <div>
            <div>Speed: {speed}</div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={speed}
              onChange={speedChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Hexagon Size: {hexagonSize}</div>
            <input
              type="range"
              min={1}
              max={100}
              step={1}
              value={hexagonSize}
              onChange={hexagonSizeChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Spawn Period: {spawnPeriod}</div>
            <input
              type="range"
              min={0}
              max={300}
              step={5}
              value={spawnPeriod}
              onChange={spawnPeriodChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Lifetime: {particleLife}</div>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={particleLife}
              onChange={particleLifeChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Particle Size: {particleSize}</div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={particleSize}
              onChange={particleSizeChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Spark Lifetime: {sparkLife}</div>
            <input
              type="range"
              min={1}
              max={200}
              step={1}
              value={sparkLife}
              onChange={sparkLifeChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Spark Spread: {sparkSpread}</div>
            <input
              type="range"
              min={1}
              max={100}
              step={1}
              value={sparkSpread}
              onChange={sparkSpreadChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Spark Frequency: {Math.round(sparkFrequency * 100)}</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={sparkFrequency}
              onChange={sparkFrequencyChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
          <div>
            <div>Spark Size: {sparkSize}</div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={sparkSize}
              onChange={sparkSizeChange}
              className="appearance-none w-40 h-2 bg-black rounded-md outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default NeonBeehive;
