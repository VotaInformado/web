import { dbPost } from "./DBFetchers";

export async function predict(legislatorId, projectId) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL("neural-network/predict/", apiUri);
  const response = await dbPost(url.pathname + url.search, {
    person_id: legislatorId,
    law_project_id: projectId,
  });
  return response;
}
