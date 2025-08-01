import { Box, Grid, Typography } from "@mui/material";
import { myInfo } from "../data/data.json";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { BouncyArrow } from "./BouncyArrow";

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(useGSAP);

export const MyInfo = () => {
  const { name, position, aboutMe } = myInfo;
  const nameRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);
  const aboutMeRed = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    const tlRepeat = gsap.timeline({ repeat: -1 });
    position.forEach((element) => {
      tlRepeat.add(positionTimeline(element).delay(1.3));
    });

    tl.add(nameTimeline())
      .add(positionTimeline(position[position.length - 1]))
      .add(aboutMeTimeline())
      .add(tlRepeat);
  });

  function nameTimeline(): gsap.core.Timeline {
    const nameSplit = SplitText.create(nameRef.current, {
      type: "words",
    });
    const tl = gsap.timeline();
    return tl.fromTo(
      nameSplit.words,
      {
        y: 20,
        opacity: 0,
      },
      { y: 0, opacity: 1, stagger: 0.5, delay: 0.5 }
    );
  }

  function positionTimeline(text: string): gsap.core.Timeline {
    const tl = gsap.timeline();
    return tl.to(positionRef.current, {
      scrambleText: { text: text, chars: "01" },
      duration: 1.5,
    });
  }

  function aboutMeTimeline(): gsap.core.Timeline {
    const aboutMeSplit = SplitText.create(aboutMeRed.current, {
      type: "words",
    });
    const tl = gsap.timeline();
    return tl.fromTo(
      aboutMeSplit.words,
      {
        opacity: 0,
      },
      { opacity: 1, stagger: 0.1, duration: 2 }
    );
  }

  return (
    <>
      <Grid
        container
        sx={{
          height: "70vh",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          maxWidth: "1920px",
        }}
        direction="column"
      >
        <Grid>
          <Typography ref={positionRef} sx={{ typography: "h5" }}></Typography>
          <Typography
            ref={nameRef}
            color="primary"
            sx={{ typography: { lg: "h1", xs: "h3" } }}
          >
            {name.toUpperCase()}
          </Typography>
          <Typography
            ref={aboutMeRed}
            sx={{ typography: { sm: "h6", xs: "body1" } }}
          >
            {aboutMe}
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          height: "30vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BouncyArrow></BouncyArrow>
      </Box>
    </>
  );
};
