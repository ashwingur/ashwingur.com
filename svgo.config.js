/**
 * SVGO is a tool that optimizes SVG files. It is used by SVGR to optimize SVG files before they are
 * transformed into React components.
 *
 * For configuration options, @see {@link https://github.com/svg/svgo/blob/main/README.md}
 * @type {import('svgo').Config}
 */
module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // Removing viewBox attribute causes CSS scaling to break.
          removeViewBox: false,
          cleanupIds: false,
        },
      },
    },
  ],
};
