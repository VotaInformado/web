import React from "react";

import PropTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import LineChart from "components/Charts/LineChart/LineChart";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import CounterCard from "components/Cards/CounterCard";

FinancialCard.propTypes = {
  affidavits: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      year: PropTypes.number,
    })
  ),
};

FinancialCard.defaultProps = {
  affidavits: [],
};

export default function FinancialCard({ affidavits }) {
  const sortedAffidavits = affidavits?.sort((a, b) => a.year - b.year);
  const lastAffidadvit = sortedAffidavits[sortedAffidavits.length - 1];
  return (
    <CardBase title="Información Patrimonial">
      {affidavits.length > 0 ? (
        <>
          <CounterCard
            title="Patrimonio declarado"
            count={lastAffidadvit?.value}
            color="primary"
            prefix="$"
            endIcon="attach_money"
          />
          <MKBox width="100%" mt={5}>
            <LineChart
              data={sortedAffidavits.map((affidavit) => ({
                label: affidavit.year?.toString(),
                value: Number(affidavit.value),
              }))}
            />
          </MKBox>
        </>
      ) : (
        <MKTypography variant="body2" sx={{ fontStyle: "italic" }}>
          Sin datos
        </MKTypography>
      )}
    </CardBase>
  );
}
