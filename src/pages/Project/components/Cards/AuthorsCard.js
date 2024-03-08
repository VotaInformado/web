import React from "react";

import PropTypes from "prop-types";

// Components
import mapAttrs from "utils/mapAttrs";
import CardBase from "components/Cards/CardBase";
import CompactTable from "components/Tables/CompactTable";
import getLegislatorCell from "components/Tables/LegislatorCell";
import MKTypography from "components/MKTypography";
import Link from "@mui/material/Link";
// Router
import { Link as RouterLink, generatePath } from "react-router-dom";
import PATHS from "routes/paths";

AuthorsCard.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired,
      last_party: PropTypes.number.isRequired,
    })
  ),
};

export const authorMapping = {
  fullName: (author) => author.name + " " + author.last_name,
  party: "party",
  party_name: "party_name",
};

export default function AuthorsCard({ authors }) {
  const columns = [
    {
      header: "Legislador",
      accessorKey: "fullName",
      size: 40,
      accessorFn: (row) => {
        return getLegislatorCell(row);
      },
    },
    {
      header: "Partido",
      size: 40,
      accessorFn: (row) => (
        <Link component={RouterLink} to={generatePath(PATHS.party, { id: row.last_party })} underline="hover">
          <MKTypography variant="body2">{row.party}</MKTypography>
        </Link>
      ),
    },
  ];
  return (
    <CardBase title="Autores">
      <CompactTable columns={columns} data={authors?.map((author) => mapAttrs(author, authorMapping))} />
    </CardBase>
  );
}
