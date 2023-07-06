import React from 'react';

import PropTypes from 'prop-types';

// Components
import CardBase from 'components/Cards/CardBase';
import CompactTable from 'components/Tables/CompactTable';

AuthorsCard.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired,
    })
  ),
};

export default function AuthorsCard({ authors }) {
  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'name',
      size: 40,
    },
    {
      header: 'Partido',
      accessorKey: 'party',
      size: 40,
    },
  ];

  return (
    <CardBase title="Autores">
      <CompactTable columns={columns} data={authors} />
    </CardBase>
  );
}
