import { fCapitalizeWords } from "utils/formatString";
import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";

const statusTranslation = {
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
  WITHDRAWN: "Retirado",
  ORIGIN_CHAMBER_COMISSION: "Cámara de origen",
  ORIGIN_CHAMBER_SENTENCE: "Cámara de origen",
  HALF_SANCTION: "Cámara revisora",
  REVISION_CHAMBER_COMISSION: "Cámara revisora",
  REVISION_CHAMBER_SENTENCE: "Cámara revisora",
};

const projectMapping = {
  authorParty: () => "El Partido", //TODO: change to "author_party",
  publicationDate: "publication_date",
  status: (project) => statusTranslation[project.status],
  title: (project) => fCapitalizeWords(project.title),
};

export async function getProjects(page, pageSize) {
  const projects = await dbGet(`law-projects?page=${page + 1}&page_size=${pageSize}`);
  return {
    data: projects.results?.map((project) => mapAttrs(project, projectMapping)),
    totalRows: projects.count,
  };
}
