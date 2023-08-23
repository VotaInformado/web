import { dbGet } from "./DBFetchers";
import { toast } from "react-toastify";

const legislatorMapping = {
  fullName: (legislator) => legislator.name + " " + legislator.last_name,
  lastName: "last_name",
  party: "party",
  lastSeat: "last_seat",
  isActive: "is_active",
};

export function mapLegislator(legislator) {
  for (const [key, value] of Object.entries(legislatorMapping)) {
    if (typeof value === "function") {
      legislator[key] = value(legislator);
    } else {
      legislator[key] = legislator[value];
      delete legislator[value];
    }
  }
  return legislator;
}


export async function getLegislator(id) {
  const legislator = await dbGet(`legislators/${id}`).catch((err) => {
    console.log(err);
    toast.error("Error al obtener el legislador");
  });
  return mapLegislator(legislator);
}
