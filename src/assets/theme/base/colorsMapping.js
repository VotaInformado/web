import darken from 'assets/theme/functions/darken';

const voteColor = {
  afirmativos: '#4caf50',
  negativos: '#f44336',
  abstenciones: '#2196f3',
  ausentes: '#ffc107',
};

const voteBorderColor = {
  afirmativos: darken(voteColor['afirmativos']),
  negativos: darken(voteColor['negativos']),
  abstenciones: darken(voteColor['abstenciones']),
  ausentes: darken(voteColor['ausentes']),
};

export { voteColor, voteBorderColor };
