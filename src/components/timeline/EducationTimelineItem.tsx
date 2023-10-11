'use client';
import { SchoolRounded } from '@mui/icons-material';
import {
   TimelineConnector,
   TimelineContent,
   TimelineDot,
   TimelineItem,
   TimelineSeparator,
} from '@mui/lab';
import { Typography } from '@mui/material';

import { EducationType } from '../admin/forms/EducationForm';

const EducationTimelineItem = ({ item }: { item: EducationType }) => {
   return (
      <TimelineItem>
         <TimelineSeparator>
            <TimelineDot
               color='primary'
               variant='outlined'
            >
               <SchoolRounded color='primary' />
            </TimelineDot>
            <TimelineConnector />
         </TimelineSeparator>
         <TimelineContent>
            <Typography
               variant='caption'
               color='gray'
            >
               {item.duration}
            </Typography>
            <Typography
               variant='body1'
               color='text.primary'
            >
               {item.certificate}
            </Typography>
            <Typography
               variant='body2'
               color='text.primary'
            >
               {item.major}
            </Typography>
            <Typography
               variant='body2'
               color='text.primary'
            >
               {item.university}
            </Typography>
         </TimelineContent>
      </TimelineItem>
   );
};

export default EducationTimelineItem;
