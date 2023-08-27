import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";

const legislatorMapping = {
  fullName: (legislator) => legislator.name + " " + legislator.last_name,
  party: () => "El Partido", //TODO: change to "party",
  lastSeat: "last_seat",
  isActive: "is_active",
};

export async function getLegislators(page, pageSize) {
  const legislators = await dbGet(`legislators?page=${page + 1}&page_size=${pageSize}`);
  return {
    data: legislators.results?.map((legislator) => mapAttrs(legislator, legislatorMapping)),
    totalRows: legislators.count,
  };
}
