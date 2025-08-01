import { sections } from "../data/data.json";
import { Typography } from "@mui/material";
import { KTimeLine } from "./KTimeLine";

export const Experience = () => {
  return (
    <>
      <Typography variant="h2" id={sections.experience.label}>
        {sections.experience.label}
      </Typography>
      <KTimeLine items={sections.experience.list} />
    </>
  );
};
