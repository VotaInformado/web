import _ from "lodash";

function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function fSentence(str) {
  if (!str) return "";
  return capitalizeFirstLetter(str.toLowerCase());
}

function fCapitalizeWords(str) {
  return _.words(str).map(_.capitalize).join(" ");
}

export { fSentence, fCapitalizeWords, capitalizeFirstLetter };
