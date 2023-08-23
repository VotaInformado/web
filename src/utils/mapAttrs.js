export default function mapAttrs(obj, mapping) {
  for (const [key, value] of Object.entries(mapping)) {
    if (typeof value === "function") {
      obj[key] = value(obj);
    } else if (typeof value === "string") {
      obj[key] = obj[value];
      delete obj[value];
    }
  }
  return obj;
}
