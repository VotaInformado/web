import { dbGet } from "./DBFetchers";
import { toast } from "react-toastify";
import mapAttrs from "utils/mapAttrs";
import { fCapitalizeWords } from "utils/formatString";

export const statusTranslation = {
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
  WITHDRAWN: "Retirado",
  ORIGIN_CHAMBER_COMISSION: "Cámara de origen",
  ORIGIN_CHAMBER_SENTENCE: "Cámara de origen",
  HALF_SANCTION: "Cámara revisora",
  REVISION_CHAMBER_COMISSION: "Cámara revisora",
  REVISION_CHAMBER_SENTENCE: "Cámara revisora",
};

const originChamberTranslation = {
  DEPUTIES: "Diputados",
  SENATE: "Senado",
};

const projectMapping = {
  authorParty: () => "El Partido", //TODO: change to "author_party",
  publicationDate: "publication_date",
  status: (project) => statusTranslation[project.status],
  title: (project) => fCapitalizeWords(project.title),
  originChamber: (project) => originChamberTranslation[project.origin_chamber],
  deputiesProjectId: "deputies_project_id",
  senateProjectId: "senate_project_id",
};

export async function getProject(id) {
  const project = await dbGet(`law-projects/${id}`).catch((err) => {
    console.log(err);
    toast.error("Error al obtener el legislador");
  });
  return mapAttrs(project, projectMapping);
}
