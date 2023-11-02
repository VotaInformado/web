import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";
import { fYear } from "utils/formatDate";
import { fCapitalizeWords } from "utils/formatString";

const seatMapping = {
  label: (seat) => seat.chamber + " • " + seat.party,
  caption: (seat) => fYear(seat.start_of_term) + " - " + fYear(seat.end_of_term),
  icon: () => "account_balance",
};

const legislatorMapping = {
  fullName: (legislator) => fCapitalizeWords(legislator.name + " " + legislator.last_name),
  party: "party",
  lastSeat: "last_seat",
  isActive: "is_active",
  seats: (legislator) => legislator.legislator_seats.map((seat) => mapAttrs(seat, seatMapping)),
};

export async function getLegislator(id) {
  const legislator = await dbGet(`legislators/${id}`);
  return mapAttrs(legislator, legislatorMapping);
}
