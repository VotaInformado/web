import React from 'react';

// Components
import PageBase from 'pages/PageBase';
import ProfileCard from 'components/Legislator/ProfileCard';

const exampleLegislator = {
  name: 'Bruce Mars',
  party: 'Frente por la Patria',
  lastSeat: 'Senado (2019-2023)',
};

export default function Legislator() {
  return (
    <PageBase>
      <ProfileCard legislator={exampleLegislator} />
    </PageBase>
  );
}
