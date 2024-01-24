import { fCapitalizeWords } from "utils/formatString";
import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";

export const projectMapping = {
  publicationDate: "publication_date",
  title: (project) => fCapitalizeWords(project.title),
};

export async function getLaws({ pagination, columnFilters, globalFilter, sorting }) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL("laws", apiUri);
  if (pagination) {
    url.searchParams.set("page", pagination?.pageIndex + 1);
    url.searchParams.set("page_size", pagination?.pageSize);
  }
  columnFilters?.forEach((filter) => {
    if (filter.id === "authorParty") filter.id = "author_party";
    if (filter.id === "isActive") filter.id = "is_active";
    if (filter.id === "publicationDate") {
      filter.id = "publication_date";
      let [from, to] = filter.value;
      if (from) url.searchParams.set(filter.id + "__gte", from);
      if (to) url.searchParams.set(filter.id + "__lte", to);
      return;
    }
    if (filter.id === "status") {
      url.searchParams.set(filter.id + "__in", filter.value);
      return;
    }
    url.searchParams.set(filter.id, filter.value);
  });
  sorting?.forEach((sort) => {
    if (sort.id === "authorParty") sort.id = "author_party";
    if (sort.id === "isActive") sort.id = "is_active";
    if (sort.id === "publicationDate") sort.id = "publication_date";
    url.searchParams.set("ordering", (sort.desc ? "-" : "") + sort.id);
  });
  if (globalFilter) {
    url.searchParams.set("search", globalFilter);
  }
  const projects = await dbGet(url.pathname + url.search);
  return {
    data: projects.results?.map((project) => mapAttrs(project, projectMapping)),
    totalRows: projects.count,
  };
}
