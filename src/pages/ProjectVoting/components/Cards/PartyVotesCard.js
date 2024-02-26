import React, { useEffect, useState } from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MKTypography from "components/MKTypography";
import VotesChart from "pages/Legislator/components/Charts/VotesChart";
// Utils
import { upperFirst } from "lodash";
// Adapters
import { getProjectVotes, voteTranslation } from "adapters/projectVotesAdapter";

PartyVotesCard.propTypes = {
  projectId: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  chamber: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
};

export default function PartyVotesCard({ projectId, chamber, date }) {
  const [parties, setParties] = useState([]);
  const [party, setParty] = useState("");
  const [votes, setVotes] = useState(null);

  function countVotesByParty(votes) {
    return votes.reduce(
      (acc, vote) => {
        switch (vote.vote) {
          case voteTranslation.POSITIVE:
            acc.afirmativos++;
            break;
          case voteTranslation.NEGATIVE:
            acc.negativos++;
            break;
          case voteTranslation.ABSTENTION:
            acc.abstenciones++;
            break;
          case voteTranslation.ABSENT:
            acc.ausentes++;
            break;
          case voteTranslation.PRESIDENT:
            acc.presidente++;
            break;
        }
        return acc;
      },
      {
        afirmativos: 0,
        negativos: 0,
        abstenciones: 0,
        ausentes: 0,
        presidente: 0,
      }
    );
  }

  function makeVotesChartData(votes) {
    return ["afirmativos", "negativos", "abstenciones", "ausentes", "presidente"].map((key) => ({
      label: upperFirst(key),
      value: votes[key],
    }));
  }

  useEffect(() => {
    if (!projectId || !chamber || !date) return;
    const params = {
      columnFilters: [{ id: "party_name", value: party }],
      pagination: { pageIndex: 0, pageSize: 500 }, // 500 should be more than enough
    };
    getProjectVotes(projectId, chamber, date, params).then((response) => {
      const aggVotes = countVotesByParty(response.data);
      const chartVotes = makeVotesChartData(aggVotes);
      setVotes(chartVotes);
      if (parties.length === 0) {
        const partyNames = response.data.reduce((acc, row) => {
          if (!acc.includes(row.party_name)) {
            acc.push(row.party_name);
          }
          return acc;
        }, []);
        const sortedParties = partyNames.sort();
        setParties(sortedParties);
      }
    });
  }, [party, projectId, chamber, date]);

  const totalVotes = votes?.reduce((acc, vote) => acc + vote.value, 0);

  return (
    <CardBase title={"Votos por partido"}>
      <Autocomplete
        options={parties}
        value={party}
        onChange={(e, newValue) => setParty(newValue)}
        noOptionsText="No se encotraron partidos con ese nombre"
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Seleccione un partido" placeholder="Ingrese el nombre del partido" />
        )}
      />
      {party && votes && (
        <>
          <MKTypography variant="body2" align="center" sx={{ mt: 2 }}>
            Votos del partido: {totalVotes}
          </MKTypography>
          <VotesChart data={votes} />
        </>
      )}
    </CardBase>
  );
}
