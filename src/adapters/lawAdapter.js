import { dbGet } from "./DBFetchers";
import { toast } from "react-toastify";
import mapAttrs from "utils/mapAttrs";

export const lawMapping = {
  publicationDate: "publication_date",
  title: (law) => `Ley ${law.law_number} - ${law.title}`,
  votings: (law) => law.votings?.map((voting) => mapAttrs(voting, votingMapping)),
};

export async function getLaw(id) {
  const law = await dbGet(`laws/${id}`).catch((err) => {
    console.log(err);
    toast.error("Error al obtener la ley");
  });
  return mapAttrs(law, lawMapping);
}

export async function createLawSummary(id) {
  const summary = await dbGet(`laws/${id}/summary`).catch((err) => {
    console.log(err);
    toast.error("Error al intentar generar el resumen de la ley");
  });
  return summary.summary;
}
