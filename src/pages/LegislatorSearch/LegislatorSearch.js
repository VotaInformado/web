import React from 'react';

// Components
import PageBase from 'pages/PageBase';
import TableBase from 'components/Tables/TableBase';
import CardBase from 'components/Cards/CardBase';
import MKInput from 'components/MKInput';
import MKButton from 'components/MKButton';
import MKBadge from 'components/MKBadge';
import MKBox from 'components/MKBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Icon, Stack } from '@mui/material';

import { Link, generatePath } from 'react-router-dom';
import PATHS from 'routes/paths';
import ProfileCard from 'components/Cards/ProfileCard';

const exampleData = [
  {
    id: 1,
    name: 'Bruce Mars',
    party: 'Partido de la U',
    lastSeat: 'Senador (2019-2023)',
    status: 'active',
  },
  {
    id: 2,
    name: 'Carlitos perez',
    party: 'FIT',
    lastSeat: 'Diputado (2019-2023)',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Rodrigo Albornoz',
    party: 'Frente de todos',
    lastSeat: 'Senador (2019-2023)',
    status: 'active',
  },
];

const legislatorColumns = [
  {
    header: 'Nombre',
    accessorKey: 'name',
    size: 120,
  },
  {
    header: 'Partido',
    accessorKey: 'party',
    size: 120,
  },
  {
    header: 'Último cargo',
    accessorKey: 'lastSeat',
    size: 70,
  },
  {
    header: 'Estado',
    id: 'status',
    accessorFn: (row) => (
      <MKBox display="flex" justifyContent="center">
        <MKBadge
          badgeContent={row.status === 'active' ? 'Activo' : 'Inactivo'}
          color={row.status === 'active' ? 'success' : 'error'}
        />
      </MKBox>
    ),
    size: 40,
  },
];

export default function LegislatorSearch() {
  return (
    <PageBase>
      <ProfileCard title="Buscar legislador" sx={{ stack: { mb: 2 } }} />
      <CardBase title="">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 2 }}
          mt={{ xs: 0, sm: 4 }}
          mb={{ xs: 2, sm: 6 }}>
          <MKInput
            placeholder="Ingrese el nombre del legislador"
            sx={{ width: { xs: '100%', md2: '65%' } }}
            InputProps={{
              endAdornment: (
                <IconButton color="primary">
                  <Icon fontSize="medium">search_icon</Icon>
                </IconButton>
              ),
            }}
          />
        </Stack>
        <TableBase
          enableRowActions
          displayColumnDefOptions={{ 'mrt-row-actions': { size: 20, header: 'Ver' } }}
          renderRowActions={({ row }) => (
            <IconButton component={Link} to={generatePath(PATHS.legislator, { id: row.id })} color="primary">
              <VisibilityIcon />
            </IconButton>
          )}
          columns={legislatorColumns}
          data={exampleData}
        />
      </CardBase>
    </PageBase>
  );
}
