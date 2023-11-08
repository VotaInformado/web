import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";
import { projectMapping } from "./projectAdapter";

export async function getPartyProjects(id, { pagination, columnFilters, globalFilter, sorting } = {}) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL(`parties/${id}/law-projects`, apiUri);
  if (pagination) {
    url.searchParams.set("page", pagination.pageIndex + 1);
    url.searchParams.set("page_size", pagination.pageSize);
  }
  columnFilters?.forEach((filter) => {
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
    if (sort.id === "publicationDate") sort.id = "publication_date";
    url.searchParams.set("ordering", (sort.desc ? "-" : "") + sort.id);
  });
  if (globalFilter) {
    url.searchParams.set("search", globalFilter);
  }
  const projects = await dbGet(url.pathname + url.search);
  if (pagination) {
    return {
      data: projects.results?.map((project) => mapAttrs(project, projectMapping)),
      totalRows: projects.count,
    };
  }
  return mapAttrs(projects, projectMapping);
}
