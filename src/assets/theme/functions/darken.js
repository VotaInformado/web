import chroma from 'chroma-js';

export default function darken(color, amount = 1) {
  return chroma(color).darken(amount).hex();
}
