// module.exports = {
//   "plugins": {
//     "postcss-px-to-viewport": {
//       viewportWidth: 750,
//       unitPrecision: 3,
//       viewportUnit: 'vw',
//       selectorBlackList: ['.ignore', '.hairlines'],
//       minPixelValue: 1,
//       mediaQuery: false
//     },
//   }
// }

const path = require('path')

module.exports = ({ file }) => {
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750

  return {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        unitToConvert: "px",
        viewportWidth: designWidth,
        unitPrecision: 6,
        propList: ["*"],
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],
        landscape: false
      }
    }
  }

}
