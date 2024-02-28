import { dbGet } from "./DBFetchers";
import { toast } from "react-toastify";
import mapAttrs from "utils/mapAttrs";
import { fCapitalizeWords } from "utils/formatString";
import { legislatorMapping } from "adapters/legislatorSearchAdapter";

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

const chamberTranslation = {
  Diputados: "DEPUTIES",
  Senado: "SENATORS",
};

export const voteTranslation = {
  ABSENT: "Ausente",
  ABSTENTION: "Abstención",
  POSITIVE: "Afirmativo",
  NEGATIVE: "Negativo",
  PRESIDENT: "Presidente",
};

const votingsMapping = {
  party_name: "party_name",
  date: "date",
  person: (voting) => voting.person && mapAttrs(voting.person, legislatorMapping),
  vote: (voting) => voteTranslation[voting.vote],
};

export async function getProjectVotes(
  id,
  chamber = "",
  date = "",
  { pagination, columnFilters, globalFilter, sorting }
) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL(`law-projects/${id}/votings`, apiUri);
  url.searchParams.set("page", pagination.pageIndex + 1);
  url.searchParams.set("page_size", pagination.pageSize);
  url.searchParams.set("chamber", chamberTranslation[chamber]);
  url.searchParams.set("date", date);
  columnFilters?.forEach((filter) => {
    if (filter.id === "person.fullName") return;
    if (filter.id === "party_name") filter.id = "party_name__icontains";
    url.searchParams.set(filter.id, filter.value);
  });
  sorting?.forEach((sort) => {
    if (sort.id === "person.fullName") sort.id = "person__name,person__last_name";
    url.searchParams.set("ordering", (sort.desc ? "-" : "") + sort.id);
  });
  if (globalFilter) {
    url.searchParams.set("search", globalFilter);
  }
  const votings = await dbGet(`${url.pathname}/${url.search}`).catch((err) => {
    console.log(err);
    toast.error("Error al obtener los votos del proyecto");
  });
  return {
    data: votings.results.map((voting) => mapAttrs(voting, votingsMapping)),
    totalRows: votings.count,
  };
}
