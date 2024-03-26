import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";

const personMapping = {
  name: (person) => person.name?.split(" ")[0] + " " + person?.last_name,
};

const authorshipsMapping = {
  person: (authorship) => mapAttrs(authorship.person, personMapping),
  authorshipCount: "authorship_count",
};

export async function getPartyAuthorships(id, { pagination = { pageIndex: 0, pageSize: 25 } }) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL(`parties/${id}/authorships`, apiUri);
  url.searchParams.set("page", pagination.pageIndex + 1);
  url.searchParams.set("page_size", pagination.pageSize);
  const authorships = await dbGet(`${url.pathname}/${url.search}`);
  return {
    data: authorships.results?.map((authorship) => mapAttrs(authorship, authorshipsMapping)),
    totalRows: authorships.count,
  };
}
