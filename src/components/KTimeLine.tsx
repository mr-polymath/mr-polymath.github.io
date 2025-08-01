import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from "@mui/lab";
import {
  Chip,
  Paper,
  Typography,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import theme from "../theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export interface KTimelineProps {
  title: string;
  dateFrom: string;
  dateTo?: string;
  subtitle?: string;
  url?: string;
  list?: string[];
}

export const KTimeLine: React.FC<{ items: KTimelineProps[] }> = ({ items }) => {
  const gt_md = useMediaQuery(theme.breakpoints.up("md"));
  const lt_lg = useMediaQuery(theme.breakpoints.down("xl"));

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();

  const timelineOppositeContents = useRef<HTMLSpanElement[]>(
    Array(items.length).fill(null)
  );
  const timelineSeparators = useRef(Array(items.length).fill(null));
  const timelineContents = useRef<HTMLSpanElement[]>(
    Array(items.length).fill(null)
  );

  useGSAP(() => {
    timelineContents.current.forEach((el) => {
      gsap.fromTo(
        el,
        { x: 50, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    timelineOppositeContents.current.forEach((el) => {
      gsap.fromTo(
        el,
        { x: -50, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    gsap.fromTo(
      timelineSeparators.current,
      { y: -200, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: timelineSeparators.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <Timeline
      sx={[
        gt_md && {
          maxWidth: "90vw",
        },
        lt_lg && {
          [`& .${timelineOppositeContentClasses.root} `]: {
            flex: 0.2,
          },
        },
      ]}
    >
      {items.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            ref={(element) => {
              if (element !== null)
                timelineOppositeContents.current[index] = element;
            }}
          >
            {gt_md && item.dateFrom}
            {gt_md && item.dateTo && " - " + item.dateTo}
          </TimelineOppositeContent>
          <TimelineSeparator
            ref={(element) => {
              if (element !== null) timelineSeparators.current[index] = element;
            }}
          >
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>

          <TimelineContent
            ref={(element) => {
              if (element !== null) timelineContents.current[index] = element;
            }}
            sx={{
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                padding: theme.spacing(2),
              },
            }}
          >
            {!gt_md && item.dateFrom}
            {!gt_md && item.dateTo && " - " + item.dateTo}
            <Paper>
              <Typography variant="h6">{item.title}</Typography>
              {item.subtitle && (
                <Typography variant="subtitle2">{item.subtitle}</Typography>
              )}
              {item.url && (
                <Typography>
                  <a href={item.url}>Certificate</a>
                </Typography>
              )}
              {item.list &&
                item.list?.map((l, index) => (
                  <Chip
                    key={index}
                    label={l}
                    variant={
                      mode === "dark" || (mode === "system" && prefersDarkMode)
                        ? "outlined"
                        : "filled"
                    }
                    size="small"
                    color="primary"
                    sx={{ margin: "0 8px 0 0" }}
                  />
                ))}
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
