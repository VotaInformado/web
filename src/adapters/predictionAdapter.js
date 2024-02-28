import { dbPost } from "./DBFetchers";
import { voteTranslation } from "./projectVotesAdapter";
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

export const votingMapping = {
  legislator_id: (voting) => voting.legislator?.id,
  vote: (voting) => voteTranslation[voting.vote],
  legislator: (voting) => voting.legislator?.name + " " + voting.legislator?.last_name,
};

export async function predictLegislatorVote(legislatorId, projectId) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL("predictions/predict-legislator-vote/", apiUri);
  const response = await dbPost(url.pathname, {
    person_id: legislatorId,
    law_project_id: projectId,
  });
  return response;
}

async function fetchVotes(chamber, projectId) {
  let apiUri = process.env.REACT_APP_API_URI;
  const url = new URL("predictions/predict-chamber-vote/", apiUri);
  const response = await dbPost(url.pathname, {
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
