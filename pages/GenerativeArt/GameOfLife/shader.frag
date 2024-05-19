precision highp float;

varying vec2 pos;
uniform sampler2D tex;
uniform vec2 pixelSize;

void main() {
  // now because of the varying vTexCoord, we can access the current texture coordinate
  vec2 uv = pos;
  uv.y = 1. - uv.y;
  vec4 col = texture2D(tex, uv);
  float alive = col.r;

  // Count how many neighbours are alive, but subtract the cell itself because we iterate over it
  float neighbours = -alive;
  for (float i = -1.; i < 2.; i++){
    for (float j = -1.; j < 2. ; j++){
        float x = uv.x + i*pixelSize.x;
        float y = uv.y + j*pixelSize.y;

        neighbours += texture2D(tex, vec2(x, y)).r;
    }
  }

  if (alive > 0.5){
    // If we are alive and we have <= 2 neighbours or >= 4 neighbours, die
    if (neighbours < 1.5) {
      alive = 0.;
    } else if (neighbours > 3.5){
      alive = 0.;
    }
  } else if (neighbours > 2.5 && neighbours < 3.5) {
    alive = 1.;
  }


  // and now these coordinates are assigned to the color output of the shader
  gl_FragColor = vec4(vec3(alive),1.0);
}