import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";
import { fYear } from "utils/formatDate";
import { fCapitalizeWords } from "utils/formatString";

const seatMapping = {
  label: (seat) => seat.chamber + " • " + seat.party_name,
  caption: (seat) => fYear(seat.start_of_term) + " - " + fYear(seat.end_of_term),
  icon: () => "account_balance",
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
  seats: (legislator) => legislator.legislator_seats.map((seat) => mapAttrs(seat, seatMapping)),
};

export async function getLegislator(id) {
  const legislator = await dbGet(`legislators/${id}`);
  const legislatorNews = await dbGet(`legislators/${id}/news`);
  let baseInfo = mapAttrs(legislator, legislatorMapping);
  baseInfo.news = legislatorNews;
  return baseInfo;
}
