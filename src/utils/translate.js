export function translateVote(vote) {
  switch (vote) {
    case "POSITIVE":
      return "Afirmativo";
    case "PRESIDENT":
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
