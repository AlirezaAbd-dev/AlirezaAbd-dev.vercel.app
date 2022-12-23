import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Slide,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect } from "react";
import { useState } from "react";

const ProjectCard = ({ item, index }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Grid
      key={index}
      xs={12}
      sm={12}
      md={6}
      lg={6}
      sx={{ px: 2, my: 2, display: "flex", justifyContent: "center" }}
    >
      <Slide
        direction="up"
        in={loading}
        style={{
          transitionDelay: loading ? `${index + 3}99ms` : "0ms",
        }}
      >
        <Card sx={{ maxWidth: 600, backgroundColor: "steelblue" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              width="300"
              image={item.image}
              alt={item.title}
            />
            <CardContent>
              <Typography variant="body1" textAlign="left" gutterBottom>
                {item.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              href={item.link}
              size="small"
              color="primary"
              target="_blank"
            >
              اطلاعات بیشتر
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Grid>
  );
};

export default ProjectCard;
