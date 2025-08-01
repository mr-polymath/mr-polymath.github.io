import { sections } from "../data/data.json";
import { Typography } from "@mui/material";
import { KTimeLine } from "./KTimeLine";

export const Certificates = () => {
  return (
    <>
      <Typography variant="h2" id={sections.certificates.label}>
        {sections.certificates.label}
      </Typography>
      <KTimeLine items={sections.certificates.list} />
    </>
  );
};
