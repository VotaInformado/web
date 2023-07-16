import React from "react";

import MKTypography from "components/MKTypography";
import PageBase from "./PageBase";

export default function Home() {
  return (
    <PageBase breadcrumb>
      <MKTypography variant="h3" mb={2}>
        Home
      </MKTypography>
    </PageBase>
  );
}
