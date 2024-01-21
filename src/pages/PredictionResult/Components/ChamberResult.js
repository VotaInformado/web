import React from "react";

import propTypes from "prop-types";

// Components
import Grid from "@mui/material/Grid";
import ParliamentsVotesCard from "components/Cards/ParliamentVotesCard";
// Routes
import PATHS from "routes/paths";
import { makePath } from "utils/pathGeneration";

export function countVotes(votes) {
  const result = {
    afirmative: 0,
    negative: 0,
    abstention: 0,
    absent: 0,
  };
  votes?.forEach((vote) => {
    if (vote.vote === "POSITIVE") result.afirmative++;
    else if (vote.vote === "NEGATIVE") result.negative++;
    else if (vote.vote === "ABSTENTION") result.abstention++;
    else if (vote.vote === "ABSENT") result.absent++;
  });
  return result;
}

ChamberResult.propTypes = {
  senatorsVotes: propTypes.arrayOf(
    propTypes.shape({
      vote: propTypes.string.isRequired,
    })
  ),
  deputiesVotes: propTypes.arrayOf(
    propTypes.shape({
      vote: propTypes.string.isRequired,
    })
  ),
};
export default function ChamberResult({ senatorsVotes, deputiesVotes }) {
  return (
    <Grid container spacing={4} alignItems="center" justifyContent="center">
      {senatorsVotes && (
        <Grid item xs={12} md1={6}>
          <ParliamentsVotesCard
            actionLink={makePath(PATHS.predictionVoting, { searchParams: { camara: "senadores" } })}
            actionState={{ votesData: senatorsVotes }}
            house="Senadores"
            {...countVotes(senatorsVotes)}
          />
        </Grid>
      )}
      {deputiesVotes && (
        <Grid item xs={12} md1={6}>
          <ParliamentsVotesCard
            actionLink={makePath(PATHS.predictionVoting, { searchParams: { camara: "diputados" } })}
            actionState={{ votesData: deputiesVotes }}
            house="Diputados"
            {...countVotes(deputiesVotes)}
          />
        </Grid>
      )}
    </Grid>
  );
}
