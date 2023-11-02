import React from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import VotesChart from "pages/Legislator/components/Charts/VotesChart";

ProjectVoteCard.propTypes = {
  title: propTypes.string.isRequired,
  totalVotes: propTypes.number.isRequired,
  votes: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.number.isRequired,
    })
  ).isRequired,
};

export default function ProjectVoteCard({ title, totalVotes, votes }) {
  return (
    <CardBase>
      <MKTypography variant="h6" fontWeight="bold" textTransform="capitalize">
        {title}
      </MKTypography>
      <MKTypography variant="body2">Votos del partido: {totalVotes}</MKTypography>
      <VotesChart data={votes} />
    </CardBase>
  );
}
