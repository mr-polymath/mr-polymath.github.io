import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Slide,
  Typography,
  useColorScheme,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import data from "./data/data.json";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface Props {
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      {children ?? <div />}
    </Slide>
  );
}

function Header() {
  const { logo } = data.header;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleModeChange = () => {
    if (mode === "dark" || (mode === "system" && prefersDarkMode)) {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const labels = Object.values(data.sections).map((profile) => profile.label);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const { mode, setMode } = useColorScheme();

  return (
    <nav role="navigation">
      <HideOnScroll>
        {/* <AppBar sx={{ color: "purple" }} position="sticky"> */}
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
          spacing={5}
        >
          <Grid sx={{ m: 0.5, p: 0.5 }}>
            <img width={36} src={logo}></img>
          </Grid>

          <Grid sx={{ display: { xs: "inline", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              open={Boolean(anchorElNav)}
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {labels.map((label, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{ minWidth: "100vw", alignContent: "center" }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    <Link href={"#" + label} underline="none">
                      {label}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <Grid sx={{ display: { xs: "none", md: "inline" } }}>
            <ButtonGroup
              variant={
                mode === "dark" || (mode === "system" && prefersDarkMode)
                  ? "outlined"
                  : "contained"
              }
            >
              {labels.map((label) => (
                <Button href={"#" + label} onClick={handleCloseNavMenu}>
                  <Typography>{label}</Typography>
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Grid>
            <IconButton onClick={handleModeChange}>
              {mode === "dark" || (mode === "system" && prefersDarkMode) ? (
                <DarkModeIcon></DarkModeIcon>
              ) : (
                <LightModeIcon></LightModeIcon>
              )}
            </IconButton>
          </Grid>
        </Grid>
        {/* </AppBar> */}
      </HideOnScroll>
    </nav>
  );
}

export default Header;
