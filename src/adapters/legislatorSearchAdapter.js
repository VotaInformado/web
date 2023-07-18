import { dbGet } from "./DBFetchers";

export async function getLegislators() {
  const legislators = await dbGet("deputies/active");
  return legislators.map((legislator) => ({
    full_name: legislator.person?.name + " " + legislator.person?.last_name,
    ...legislator,
  }));
}
