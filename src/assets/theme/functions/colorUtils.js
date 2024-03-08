import chroma from "chroma-js";

export function darken(color, amount = 1) {
  return chroma(color).darken(amount).hex();
}

export function lighten(color, amount = 1) {
  return chroma(color).brighten(amount).hex();
}
