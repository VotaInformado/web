import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";
import { fCapitalizeWords } from "utils/formatString";

const seatMapping = {
  chamber: "chamber",
  party_name: "party_name",
  party: "party",
  startOfTerm: "start_of_term",
  endOfTerm: "end_of_term",
};

export const lastSeatMapping = {
  Senador: "Senador/a",
  Diputado: "Diputado/a",
};

export const legislatorMapping = {
  fullName: (legislator) => fCapitalizeWords(legislator.name + " " + legislator.last_name),
  pictureUrl: "picture_url",
  party: "party",
  lastSeat: (legislator) => lastSeatMapping[legislator.last_seat],
  isActive: "is_active",
  seats: (legislator) => legislator.legislator_seats?.map((seat) => mapAttrs(seat, seatMapping)),
};

export async function getLegislator(id) {
  const legislator = await dbGet(`legislators/${id}`);
  return mapAttrs(legislator, legislatorMapping);
}

export async function getLegislatorNews(id) {
  return dbGet(`legislators/${id}/news`);
}
