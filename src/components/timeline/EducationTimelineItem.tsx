"use client";
import { SchoolRounded } from "@mui/icons-material";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";

import { educationItem } from "../../constants/education";

const EducationTimelineItem = ({ item }: { item: educationItem }) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color="info" variant="outlined">
          <SchoolRounded color="info" />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="caption" color="gray">
          {item.year}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {item.cert}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {item.major}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {item.place}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

export default EducationTimelineItem;
