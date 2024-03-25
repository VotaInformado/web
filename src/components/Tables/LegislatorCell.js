import { Grid } from "@mui/material";
import MKTypography from "components/MKTypography";
import { Link } from "react-router-dom";
import MKBox from "components/MKBox";

const DEFAULT_PROFILE_IMAGE_URL =
  "https://t3.ftcdn.net/jpg/05/71/08/24/360_F_571082432_Qq45LQGlZsuby0ZGbrd79aUTSQikgcgc.jpg";

export default function getLegislatorCell(row) {
  return (
    <Grid container direction="row" spacing={2} alignItems="center">
      <Grid item>
        <MKBox
          component="img"
          sx={{
            height: 30,
            width: 30,
            marginTop: 0.5,
          }}
          alt={row.fullName}
          src={row.picture_url || row.pictureUrl || DEFAULT_PROFILE_IMAGE_URL}
        />
      </Grid>
      <Grid item>
        {row.id ? (
          <Link relative="path" to={`/legislador/${row.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <MKTypography variant="body2" fontWeight="bold">
              {row.fullName}
            </MKTypography>
          </Link>
        ) : (
          <MKTypography variant="body2" fontWeight="bold">
            {row.fullName}
          </MKTypography>
        )}
      </Grid>
    </Grid>
  );
}
