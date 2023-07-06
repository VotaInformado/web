import PropTypes from 'prop-types';

import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

TableBase.propTypes = {
  props: PropTypes.object.isRequired,
};

export default function TableBase({ ...props }) {
  return <MaterialReactTable {...props} localization={MRT_Localization_ES} />;
}
