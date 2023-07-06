import React from 'react';

import PropTypes from 'prop-types';

// Components
import CardBase from 'components/Cards/CardBase';
import CompactTable from 'components/Tables/CompactTable';

export default function AuthorsCard() {
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

  const data = [
    {
      name: 'Vega , María Clara Del Valle',
      party: 'Cambiemos Fuerza Cívica Riojana',
    },
    {
      name: 'Matute , Julio César',
      party: 'Frente de Naides',
    },
    {
      name: 'Pablo , Juan',
      party: 'Frente de Naides',
    },
    {
      name: 'Cristina , Fernández',
      party: 'Frente de Naides',
    },
    {
      name: 'Alberto , Fernández',
      party: 'Frente de Naides',
    },
    {
      name: 'Mauricio , Macri',
      party: 'Frente de Naides',
    },
    {
      name: 'Néstor , Kirchner',
      party: 'Frente de Naides',
    },
    {
      name: 'Carlos , Meeeee',
      party: 'Frente de Naides',
    },
  ];

  return (
    <CardBase title="Autores">
      <CompactTable columns={columns} data={data} />
    </CardBase>
  );
}
