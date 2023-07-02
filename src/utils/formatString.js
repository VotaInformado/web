function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function fSentence(str) {
  return capitalizeFirstLetter(str.toLowerCase());
}

export { fSentence, capitalizeFirstLetter };
