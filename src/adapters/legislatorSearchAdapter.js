import { dbGet } from "./DBFetchers";
import { mapLegislator } from "./legislatorAdapter";

export async function getLegislators() {
  const legislators = await dbGet("legislators");
  return legislators.map((legislator) => mapLegislator(legislator));
}
