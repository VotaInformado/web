import React from "react";

import PropTypes from "prop-types";

// Components
import mapAttrs from "utils/mapAttrs";
import CardBase from "components/Cards/CardBase";
import CompactTable from "components/Tables/CompactTable";

AuthorsCard.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired,
    })
  ),
};

export const authorMapping = {
  fullName: (author) => author.name + " " + author.last_name,
  party: (author) => author.party || "-",
};

export default function AuthorsCard({ authors }) {
  const columns = [
    {
      header: "Nombre",
      accessorKey: "full_name",
      size: 40,
    },
    {
      header: "Partido",
      accessorKey: "party",
      size: 40,
    },
  ];

  return (
    <CardBase title="Autores">
      <CompactTable columns={columns} data={authors.map((author) => mapAttrs(author, authorMapping))} />
    </CardBase>
  );
}
