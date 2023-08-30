import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";

const legislatorMapping = {
  fullName: (legislator) => legislator.name + " " + legislator.last_name,
  party: () => "El Partido", //TODO: change to "party",
  lastSeat: "last_seat",
  isActive: "is_active",
};

export async function getLegislators({ pagination, columnFilters, globalFilter, sorting }) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL("legislators", apiUri);
  url.searchParams.set("page", pagination.pageIndex + 1);
  url.searchParams.set("page_size", pagination.pageSize);
  columnFilters?.forEach((filter) => {
    if (filter.id === "lastSeat") filter.id = "last_seat";
    if (filter.id === "isActive") filter.id = "is_active";
    if (filter.id === "fullName") return;
    url.searchParams.set(filter.id, filter.value);
  });
  sorting?.forEach((sort) => {
    if (sort.id === "lastSeat") sort.id = "last_seat";
    if (sort.id === "isActive") sort.id = "is_active";
    if (sort.id === "fullName") sort.id = "name,last_name";
    url.searchParams.set("ordering", (sort.desc ? "" : "-") + sort.id);
  });
  if (globalFilter) {
    url.searchParams.set("search", globalFilter);
  }
  const legislators = await dbGet(url.pathname + url.search);
  return {
    data: legislators.results?.map((legislator) => mapAttrs(legislator, legislatorMapping)),
    totalRows: legislators.count,
  };
}
