import { dbGet } from "./DBFetchers";
import mapAttrs from "utils/mapAttrs";
import { projectMapping } from "./projectAdapter";

export async function getPartyProyects(id) {
  const projects = await dbGet(`parties/${id}/law-projects`);
  return mapAttrs(projects, projectMapping);
}
