import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";

const votesMapping = {
  title: "title",
  afirmativos: "afirmatives",
  negativos: "negatives",
  abstenciones: "abstentions",
  ausentes: "absents",
  date: "date",
};

export async function getPartyVotes(id, { pagination, columnFilters, globalFilter, sorting } = {}) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL(`parties/${id}/votes`, apiUri);
  pagination = pagination || { pageIndex: 0, pageSize: 25 };
  url.searchParams.set("page", pagination.pageIndex + 1);
  url.searchParams.set("page_size", pagination.pageSize);
  columnFilters?.forEach((filter) => {
    if (filter.id === "title") filter.id = "title__icontains";
    if (filter.id === "date") {
      let [from, to] = filter.value;
      if (from) url.searchParams.set("date__gte", from);
      if (to) url.searchParams.set("date__lte", to);
      return;
    }
    url.searchParams.set(filter.id, filter.value);
  });
  sorting?.forEach((sort) => {
    if (sort.id === "title") sort.id = "title";
    url.searchParams.set("ordering", (sort.desc ? "-" : "") + sort.id);
  });
  if (globalFilter) {
    url.searchParams.set("search", globalFilter);
  }
  const votes = await dbGet(`${url.pathname}/${url.search}`);
  return {
    data: votes.results?.map((vote) => mapAttrs(vote, votesMapping)),
    totalRows: votes.count,
  };
}
