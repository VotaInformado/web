import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";

const legislatorMapping = {
  fullName: (legislator) => legislator.name + " " + legislator.last_name,
  party: "party",
  lastSeat: "last_seat",
  isActive: "is_active",
};

export async function getLegislators() {
  const legislators = await dbGet("legislators");
  return legislators.map((legislator) => mapAttrs(legislator, legislatorMapping));
}
