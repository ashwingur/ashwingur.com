precision mediump float;

varying vec2 pos;

uniform float millis;

void main() {
  // now because of the varying vTexCoord, we can access the current texture coordinate
  vec2 uv = pos;
  float dist = smoothstep(0., 1., length(uv));
  float c = (sin(100.*uv.x+millis/100.)+1.)/2.;
  float g = (sin(100.*uv.y+millis/100.)+1.)/2.;
  float b = (sin(millis/1000.)+1.)/2.;

  // and now these coordinates are assigned to the color output of the shader
  gl_FragColor = vec4(c, g, b, 1.0);
}