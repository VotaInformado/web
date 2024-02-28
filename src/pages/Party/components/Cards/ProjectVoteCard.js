import React from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import MKTypography from "components/MKTypography";
import CollapsableTypography from "components/Collapsables/CollapsableTypography";
import VotesChart from "pages/Legislator/components/Charts/VotesChart";
import Link from "@mui/material/Link";
// Router
import { Link as RouterLink, generatePath } from "react-router-dom";
import PATHS from "routes/paths";

ProjectVoteCard.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  totalVotes: propTypes.number.isRequired,
  votes: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.number.isRequired,
    })
  ).isRequired,
};

export default function ProjectVoteCard({ id, title, totalVotes, votes }) {
  return (
    <CardBase>
      <CollapsableTypography maxLines={2} variant="h6" fontWeight="bold" textTransform="capitalize">
        <Link component={RouterLink} to={generatePath(PATHS.project, { id })}>
          {title}
        </Link>
      </CollapsableTypography>
      <MKTypography variant="body2">Votos del partido: {totalVotes}</MKTypography>
      <VotesChart data={votes} />
    </CardBase>
  );
}
