// Utils and theme
import { votesColor } from "assets/theme/base/colorsMapping";

export default function formatParliamentChartData(afirmative, abstention, negative, absent) {
  return [
    {
      name: "Afirmativos",
      y: afirmative,
      color: votesColor["afirmativos"],
    },
    {
      name: "Abstenciones",
      y: abstention,
      color: votesColor["abstenciones"],
    },
    {
      name: "Negativos",
      y: negative,
      color: votesColor["negativos"],
    },
    {
      name: "Ausentes",
      y: absent,
      color: votesColor["ausentes"],
    },
  ];
}