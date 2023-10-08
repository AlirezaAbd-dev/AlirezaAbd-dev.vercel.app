'use client';
import { useEffect, useState } from 'react';
import {
   Button,
   Card,
   CardActionArea,
   CardActions,
   CardContent,
   Skeleton,
   Slide,
   Typography,
   useMediaQuery,
   useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { ProjectType } from '../admin/forms/ProjectForm';

const ProjectCard = ({ item, index }: { item: ProjectType; index: number }) => {
   const theme = useTheme();
   const [loading, setLoading] = useState(false);
   const [isImageLoaded, setIsImageLoaded] = useState(false);

   const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

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
         sx={{ px: 2, my: 2, display: 'flex', justifyContent: 'center' }}
      >
         <Slide
            direction='up'
            in={loading}
            style={{
               transitionDelay: loading ? `${index + 3}99ms` : '0ms',
            }}
         >
            <Card sx={{ maxWidth: 600, backgroundColor: 'primary.dark' }}>
               <CardActionArea>
                  {!isImageLoaded && (
                     <Skeleton
                        variant='rectangular'
                        animation='wave'
                        width={isSmDown ? '300px' : '500px'}
                        height={isSmDown ? '200px' : '370px'}
                     />
                  )}
                  <Image
                     priority
                     src={item.image}
                     alt={item.name}
                     width={700}
                     height={500}
                     style={{
                        display: isImageLoaded ? 'block' : 'none',
                        width: isSmDown ? 300 : 500,
                        height: isSmDown ? 200 : 370,
                        objectFit: 'cover',
                     }}
                     onLoad={() => {
                        setIsImageLoaded(true);
                     }}
                  />
                  <CardContent>
                     <Typography
                        variant='body1'
                        textAlign='left'
                        gutterBottom
                     >
                        {item.name}
                     </Typography>
                  </CardContent>
               </CardActionArea>
               <CardActions>
                  {item.reference && (
                     <Button
                        href={item.reference}
                        size='small'
                        color='primary'
                        variant='contained'
                        target='_blank'
                     >
                        اطلاعات بیشتر
                     </Button>
                  )}
               </CardActions>
            </Card>
         </Slide>
      </Grid>
   );
};

export default ProjectCard;
