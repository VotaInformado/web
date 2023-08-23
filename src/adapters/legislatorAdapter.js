import { dbGet } from "./DBFetchers";
import { toast } from "react-toastify";
import mapAttrs from "utils/mapAttrs";
import { fYear } from "utils/formatDate";

const seatMapping = {
  label: (seat) => seat.chamber + " • " + seat.party,
  caption: (seat) => fYear(seat.start_of_term) + " - " + fYear(seat.end_of_term),
  icon: () => "account_balance",
};

const legislatorMapping = {
  fullName: (legislator) => legislator.name + " " + legislator.last_name,
  party: "party",
  lastSeat: "last_seat",
  isActive: "is_active",
  seats: (legislator) => legislator.legislator_seats.map((seat) => mapAttrs(seat, seatMapping)),
};

export async function getLegislator(id) {
  const legislator = await dbGet(`legislators/${id}`).catch((err) => {
    console.log(err);
    toast.error("Error al obtener el legislador");
  });
  return mapAttrs(legislator, legislatorMapping);
}
