export function translateVote(vote) {
  switch (vote) {
    case "AFIRMATIVE":
      return "Afirmativo";
    case "NEGATIVE":
      return "Negativo";
    case "ABSTENTION":
      return "Abstención";
    case "ABSENT":
      return "Ausente";
    default:
      return vote;
  }
}
