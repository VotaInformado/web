import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";

const partyMapping = {
  name: "main_denomination",
  subParties: "sub_parties",
};

export async function getParties({ pagination, columnFilters, globalFilter, sorting }) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL("parties", apiUri);
  url.searchParams.set("page", pagination.pageIndex + 1);
  url.searchParams.set("page_size", pagination.pageSize);
  columnFilters?.forEach((filter) => {
    if (filter.id === "name") filter.id = "main_denomination";
    url.searchParams.set(filter.id, filter.value);
  });
  sorting?.forEach((sort) => {
    if (sort.id === "name") sort.id = "main_denomination";
    url.searchParams.set("ordering", (sort.desc ? "-" : "") + sort.id);
  });
  if (globalFilter) {
    url.searchParams.set("search", globalFilter);
  }
  const parties = await dbGet(`${url.pathname}/${url.search}`);
  debugger;
  return {
    data: parties.results?.map((party) => mapAttrs(party, partyMapping)),
    totalRows: parties.count,
  };
}
