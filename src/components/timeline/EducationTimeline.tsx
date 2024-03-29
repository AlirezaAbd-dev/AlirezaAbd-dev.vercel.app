"use client";
import { WorkOutlineRounded } from "@mui/icons-material";
import { Timeline } from "@mui/lab";
import { Box } from "@mui/material";

import education from "../../constants/education";
import HeaderDivider from "../../components/ui/HeaderDivider";
import EducationTimelineItem from "../../components/timeline/EducationTimelineItem";

const EducationTimeline = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <HeaderDivider
        color="redAccent.main"
        animation={false}
        // @ts-ignore
        icon={<WorkOutlineRounded color="text.primary" />}
      >
        تحصیلات
      </HeaderDivider>

      <Box display="flex" justifyContent="center" width="100%">
        <Timeline position="right" sx={{ direction: "ltr" }}>
          {education.map((item, index) => (
            <EducationTimelineItem item={item} key={index} />
          ))}
        </Timeline>
      </Box>
    </Box>
  );
};

export default EducationTimeline;
