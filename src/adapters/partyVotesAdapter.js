import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";

const votesMapping = {
  title: "project_title",
  afirmativos: "afirmatives",
  negativos: "negatives",
  abstenciones: "abstentions",
  ausentes: "absents",
};

export async function getPartyVotes(id, maxResults, { pagination } = {}) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL(`parties/${id}/votes`, apiUri);
  pagination = pagination || { pageIndex: 0, pageSize: 25 };
  url.searchParams.set("page", pagination.pageIndex + 1);
  url.searchParams.set("page_size", pagination.pageSize);
  const body = maxResults && {
    max_results: maxResults,
  };
  const votes = await dbGet(url.pathname + url.search, body);
  return {
    data: votes.results?.map((vote) => mapAttrs(vote, votesMapping)),
    totalRows: votes.count,
  };
}
