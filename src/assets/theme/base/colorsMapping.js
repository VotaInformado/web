import { darken } from "assets/theme/functions/colorUtils";

const votesColor = {
  afirmativos: "#4caf50",
  negativos: "#f44336",
  abstenciones: "#2196f3",
  ausentes: "#ffc107",
};

// const voteColor = {
//   afirmativo: votesColor["afirmativos"],
//   negativo: votesColor["negativos"],
//   abstencion: votesColor["abstenciones"],
//   ausente: votesColor["ausentes"],
// };

const voteColor = {
  afirmativo: "success",
  negativo: "error",
  abstencion: "info",
  ausente: "warning",
};

const voteBorderColor = {
  afirmativos: darken(votesColor["afirmativos"]),
  negativos: darken(votesColor["negativos"]),
  abstenciones: darken(votesColor["abstenciones"]),
  ausentes: darken(votesColor["ausentes"]),
};

const projectsColor = {
  pendientes: "#2196f3",
  aprobados: "#4caf50",
};

const projectsBorderColor = {
  pendientes: darken(projectsColor["pendientes"]),
  aprobados: darken(projectsColor["aprobados"]),
};

const projectStatusColor = {
  aprobado: "success",
  rechazado: "error",
  default: "warning",
  unkown: "dark",
};

export { voteColor, votesColor, voteBorderColor, projectsColor, projectsBorderColor, projectStatusColor };
