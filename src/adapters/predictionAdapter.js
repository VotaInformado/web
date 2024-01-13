import { dbPost } from "./DBFetchers";

function translateChamber(chamber) {
  switch (chamber) {
    case "diputados":
      return "DEPUTY";
    case "senadores":
      return "SENATOR";
    default:
      return null;
  }
}

export async function predictLegislatorVote(legislatorId, projectId) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL("predictions/predict-legislator-vote/", apiUri);
  const response = await dbPost(url.pathname + url.search, {
    person_id: legislatorId,
    law_project_id: projectId,
  });
  return response;
}

async function fetchVotes(chamber, projectId) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL("predictions/predict-chamber-vote/", apiUri);
  const response = await dbPost(url.pathname + url.search, {
    chamber: translateChamber(chamber),
    law_project_id: projectId,
  });
  return response;
}

export async function predictChamberVote(chamber, projectId) {
  const response = {};
  if (chamber === "diputados" || chamber === "ambas") {
    const deputies_response = await fetchVotes("diputados", projectId);
    response.deputiesVotes = deputies_response;
  }
  if (chamber === "senadores" || chamber === "ambas") {
    const senators_response = await fetchVotes("senadores", projectId);
    response.senatorsVotes = senators_response;
  }
  return response;
}
