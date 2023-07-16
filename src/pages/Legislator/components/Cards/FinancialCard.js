import React from "react";

// Components
import CardBase from "components/Cards/CardBase";
import LineChart from "components/Charts/LineChart/LineChart";
import MKBox from "components/MKBox";
import CounterCard from "components/Cards/CounterCard";

export default function FinancialCard() {
  return (
    <CardBase title="Información Patrimonial">
      <CounterCard title="Patrimonio" count={1000000} color="primary" prefix="$" endIcon="attach_money" />
      <MKBox width="100%" mt={5}>
        <LineChart
          data={[
            { label: "2010", value: 110 },
            { label: "2011", value: 120 },
            { label: "2012", value: 130 },
            { label: "2013", value: 140 },
            { label: "2014", value: 150 },
            { label: "2015", value: 156 },
            { label: "2016", value: 160 },
            { label: "2017", value: 170 },
            { label: "2018", value: 180 },
            { label: "2019", value: 190 },
            { label: "2020", value: 150 },
            { label: "2021", value: 200 },
            { label: "2022", value: 170 },
            { label: "2023", value: 210 },
          ]}
        />
      </MKBox>
    </CardBase>
  );
}
