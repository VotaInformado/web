import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";
import { fYear } from "utils/formatDate";
import { fCapitalizeWords } from "utils/formatString";

const partyMapping = {
  name: "main_denomination",
  subParties: "sub_party",
  totalLegislators: "tota_legislators",
  countryRepresentation: "country_representation",
};

export async function getParty(id) {
  const party = await dbGet(`parties/${id}`);
  return mapAttrs(party, partyMapping);
}
