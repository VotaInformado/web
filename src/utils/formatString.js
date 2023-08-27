import _ from "lodash";

function capitalizeFirstLetter(str) {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function fSentence(str) {
  return capitalizeFirstLetter(str.toLowerCase());
}

function fCapitalizeWords(str) {
  return _.startCase(_.toLower(str));
}

export { fSentence, fCapitalizeWords, capitalizeFirstLetter };
