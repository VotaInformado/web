import React from "react";
import PropTypes from "prop-types";

// components
import CardBase from "components/Cards/CardBase";
import TimelineChart from "components/Charts/TimelineChart/TimelineChart";
import { Stack, Icon, Tooltip, Link } from "@mui/material";
import MKTypography from "components/MKTypography";
// Router
import { Link as RouterLink, generatePath } from "react-router-dom";
import PATHS from "routes/paths";
// Utils
import { fYear } from "utils/formatDate";

ActivityCard.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      chamber: PropTypes.string,
      party_name: PropTypes.string,
      party: PropTypes.number,
      startOfTerm: PropTypes.string,
      endOfTerm: PropTypes.string,
    })
  ),
};

ActivityCard.defaultProps = {
  events: [],
};

export default function ActivityCard({ events }) {
  function formatLabel(seat) {
    return (
      <Stack direction="row" spacing={1}>
        <MKTypography variant="body2">{`${seat.chamber}`}</MKTypography>
        <MKTypography variant="body2">•</MKTypography>
        <Link component={RouterLink} to={generatePath(PATHS.party, { id: seat.party })} underline="hover">
          <MKTypography variant="body2">{seat.party_name}</MKTypography>
        </Link>
      </Stack>
    );
  }

  function formatEvents(seats) {
    return seats.map((seat) => ({
      labelNode: formatLabel(seat),
      caption: fYear(seat.startOfTerm) + " - " + fYear(seat.endOfTerm),
      icon: "account_balance",
    }));
  }

  return (
    <CardBase title="Trayectoria" style={{ height: "100%" }}>
      <TimelineChart data={formatEvents(events)} orientation="vertical" />
    </CardBase>
  );
}
