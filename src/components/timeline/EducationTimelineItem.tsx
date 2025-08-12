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

import { Education } from '@/services/aboutMe/useEducationQuery';

const EducationTimelineItem = ({ item }: { item: Education }) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color='info'
          variant='outlined'
        >
          <SchoolRounded color='info' />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography
          variant='caption'
          color='gray'
        >
          {item.toYear + ' - ' + item.fromYear}
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'
        >
          {item.educationalQualification}
        </Typography>
        <Typography
          variant='body2'
          color='text.primary'
        >
          {item.fieldOfStudy}
        </Typography>
        <Typography
          variant='body2'
          color='text.primary'
        >
          {item.placeOfStudy}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

export default EducationTimelineItem;
