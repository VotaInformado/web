import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import { Stack } from "@mui/material";
import MKTypography from "components/MKTypography";
import ProjectVoteCard from "./ProjectVoteCard";

import { upperFirst } from "lodash";
import { getPartyVotes } from "adapters/partyVotesAdapter";

VotesCard.propTypes = {
  partyId: propTypes.number.isRequired,
  actionLink: propTypes.string,
};

export default function VotesCard({ partyId, actionLink }) {
  const [votes, setVotes] = useState([]);

  const goToVotes = {
    route: actionLink,
    tooltip: "Ver todas las votaciones",
    label: "Ver todas",
    icon: "arrow_forward",
  };

  useEffect(() => {
    if (!partyId) return;
    getPartyVotes(partyId, { pagination: { pageIndex: 0, pageSize: 5 } }).then((res) => {
      setVotes(res.data);
    });
  }, [partyId]);

  return (
    <CardBase title="Votaciones" action={actionLink && goToVotes}>
      <MKTypography variant="body2" align="center" mb={2}>
        Ultimos {votes.length} proyectos votados
      </MKTypography>
      <Stack spacing={2} justifyContent="center" alignContent="center">
        {votes?.map((row, index) => {
          const data = ["afirmativos", "negativos", "abstenciones", "ausentes"].map((key) => ({
            label: upperFirst(key),
            value: row[key],
          }));
          return (
            <ProjectVoteCard
              key={index}
              title={row.title}
              totalVotes={row.afirmativos + row.negativos + row.abstenciones + row.ausentes}
              votes={data}
            />
          );
        })}
      </Stack>
    </CardBase>
  );
}
