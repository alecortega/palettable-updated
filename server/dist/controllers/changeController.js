const axios = require('axios');
const _ = require('lodash');
const colornamer = require('color-namer');
const Raven = require('raven');

const formatColors = colors => {
  return colors.map(color => `#${color}`);
};

function getPalettes(params) {
  return axios.get('/', { params }).then(request => request.data);
}

function getNewColorsFromData(palettes, dislikedColors, currentColors) {
  const colorsWithoutDisliked = palettes
  // Flatten data into single array of all returned colors
  .reduce((a, b) => a.concat(b.colors), palettes[0].colors)
  // Remove all colors that have already been disliked or already shown
  .filter(color => dislikedColors.indexOf(`#${color}`) === -1 && currentColors.indexOf(`#${color}`) === -1);
  // Return a palette containing the first 5 in the array
  return _.shuffle(_.uniq(colorsWithoutDisliked)).slice(0, 5);
}

exports.hasExactMatch = (req, res, next) => {
  const currentColors = req.body.colors;
  const dislikedColors = req.body.dislikedColors || [];

  // Color to search for is second to last since the last is the one being changed.
  const searchColor = currentColors.length === 1 ? currentColors[currentColors.length - 1] : currentColors[currentColors.length - 2];
  const { hexCode } = searchColor;

  getPalettes({ hex: hexCode }).then(palettes => {
    if (!palettes.length) {
      return next();
    }

    const newColors = getNewColorsFromData(palettes, dislikedColors, currentColors);

    if (newColors.length < 5) return next();

    return res.json(formatColors(newColors));
  }).catch(next);
};

exports.hasClosestHexMatch = (req, res, next) => {
  // Transforms HEX code into a search term then queries the API with term
  const currentColors = req.body.colors;
  const dislikedColors = req.body.dislikedColors || [];
  // Color to search for is second to last since the last is the one being changed
  const { hexCode } = currentColors[currentColors.length - 2];
  const searchTerm = colornamer(hexCode).html[0].hex;

  getPalettes({ hex: searchTerm }).then(palettes => {
    const newColors = getNewColorsFromData(palettes, dislikedColors, currentColors);

    if (newColors.length < 5) return next();

    return res.json(formatColors(newColors));
  }).catch(next);
};