import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
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

export const Portfolio = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();

  const gridCard = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      gridCard.current,
      { autoAlpha: 0, scale: 0.5 },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1, // delay between each element's start
        scrollTrigger: {
          trigger: gridCard.current,
          start: "top 80%",
          //end: "+=500", // end after scrolling 500px beyond the start
          toggleActions: "play none none none",
        },
      }
    );
  });

  return (
    <>
      <Typography variant="h2" id={sections.portfolio.label}>
        {sections.portfolio.label}
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
        {sections.portfolio.list.map((portfolio, index) => (
          <Grid
            key={index}
            ref={(element) => {
              if (element !== null) gridCard.current[index] = element;
            }}
            sx={{
              "& > :not(style)": {
                m: 1,
                padding: theme.spacing(2),
              },
            }}
          >
            <Card
              elevation={3}
              sx={{
                maxWidth: "400px",
              }}
            >
              <CardMedia
                component="img"
                alt="my-website"
                image={
                  mode === "dark" || (mode === "system" && prefersDarkMode)
                    ? portfolio["image-dark"]
                    : portfolio.image
                }
                sx={{
                  alignContent: "center",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: theme.palette.primary.main,
                  borderRadius: theme.shape.borderRadius,
                }}
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {portfolio.title}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {portfolio.description}
                </Typography>
                {portfolio.skills &&
                  portfolio.skills?.map((l, index) => (
                    <Chip
                      key={index}
                      label={l}
                      variant={
                        mode === "dark" ||
                        (mode === "system" && prefersDarkMode)
                          ? "outlined"
                          : "filled"
                      }
                      size="small"
                      color="primary"
                      sx={{ margin: "0 8px 0 0" }}
                    />
                  ))}
              </CardContent>
              <CardActions>
                <Button href={portfolio.url} target="_blank" size="small">
                  {portfolio["url-name"]}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
