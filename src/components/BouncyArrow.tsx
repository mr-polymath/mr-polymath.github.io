import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Box, useColorScheme, useMediaQuery } from "@mui/material";
gsap.registerPlugin(useGSAP);

export const BouncyArrow = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();
  const arrow = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const loop = gsap.timeline({
      yoyo: true,
      repeat: -1,
    });

    loop.to(arrow.current, {
      duration: 0.8,
      y: 15,
      ease: "sine.inOut",
    });
  });
  return (
    <>
      <Box ref={arrow}>
        <svg
          width="23"
          height="36"
          viewBox="0 0 23 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.4375 24.7175L11.7175 34M11.7175 34L21 24.7175M11.7175 34V1.7085"
            stroke={
              mode === "dark" || (mode === "system" && prefersDarkMode)
                ? "#feb062"
                : "#000000"
            }
            strokeOpacity="0.5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </>
  );
};
