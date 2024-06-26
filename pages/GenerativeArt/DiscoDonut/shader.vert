// position information that is used with gl_Position
attribute vec3 aPosition;
// texture coordinates
attribute vec2 aTexCoord;
// the varying variable will pass the texture coordinate to our fragment shader
varying vec2 pos;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

// Additional uniform for shape dimensions
uniform vec2 uShapeDimensions;

void main() {
  // assign attribute to varying, so it can be used in the fragment
  pos = aTexCoord * uShapeDimensions;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  // gl_Position = positionVec4;
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}