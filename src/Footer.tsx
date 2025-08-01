import { Grid, IconButton, SvgIconProps, Typography } from "@mui/material";
import { footer } from "./data/data.json";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const iconMap = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  QuestionMark: QuestionMarkIcon,
} as const;

interface DynamicIconProps extends SvgIconProps {
  iconName: keyof typeof iconMap;
}

const IconResolver: React.FC<DynamicIconProps> = ({ iconName, ...props }) => {
  const IconComponent = iconMap[iconName];

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`);
    return null; // You can return a default icon or an empty element here
  }

  return <IconComponent {...props} />;
};

function Footer() {
  const { copyright, socialMedia } = footer;

  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          minHeight: "10em",
          //alignItems: "center",
          justifyContent: "space-around",
          //display: "flex",
          margin: "0 auto",
        }}
      >
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
          {socialMedia.map((obj, i) => (
            <Grid key={i}>
              <IconButton href={obj.url}>
                <IconResolver
                  iconName={
                    obj.iconButton in iconMap
                      ? (obj.iconButton as keyof typeof iconMap)
                      : "QuestionMark"
                  }
                  fontSize="large"
                ></IconResolver>
              </IconButton>
            </Grid>
          ))}
        </Grid>
        <Grid>
          <Typography>
            {copyright.replace("%year%", new Date().getFullYear().toString())}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;
