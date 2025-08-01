import {
  Grid,
  Paper,
  Typography,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import { sections } from "../data/data.json";
import theme from "../theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();

  const gridSkill = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      gridSkill.current,
      { autoAlpha: 0, scale: 0.5 },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1, // delay between each element's start
        scrollTrigger: {
          trigger: gridSkill.current,
          start: "top 80%",
          //end: "+=500", // end after scrolling 500px beyond the start
          toggleActions: "play none none none",
        },
      }
    );
  });

  return (
    <>
      <Typography variant="h2" id={sections.skills.label}>
        {sections.skills.label}
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          margin: "0 5vw",
        }}
      >
        {sections.skills.list.map((skill, index) => (
          <Grid
            key={index}
            ref={(element) => {
              if (element !== null) gridSkill.current[index] = element;
            }}
            sx={{
              "& > :not(style)": {
                m: 1,
                width: 132,
                height: 132,
                padding: theme.spacing(2),
              },
            }}
          >
            <Paper elevation={3}>
              <img
                width={55}
                height={55}
                src={
                  mode === "dark" || (mode === "system" && prefersDarkMode)
                    ? skill["image-dark"]
                    : skill.image
                }
              />

              <Typography>{skill.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
