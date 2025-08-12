'use client';
import { WorkOutlineRounded } from '@mui/icons-material';
import { Timeline } from '@mui/lab';
import { Box } from '@mui/material';

import HeaderDivider from '../../components/ui/HeaderDivider';
import EducationTimelineItem from '../../components/timeline/EducationTimelineItem';
import useEducationQuery from '@/services/aboutMe/useEducationQuery';
import EducationTimelineSkeleton from './EducationTimelineSkeleton';

const EducationTimeline = () => {
  const { data, isPending } = useEducationQuery();

  return (
    <Box sx={{ mt: 2 }}>
      <HeaderDivider
        color='redAccent.main'
        animation={false}
        // @ts-ignore
        icon={<WorkOutlineRounded color='text.primary' />}
      >
        تحصیلات
      </HeaderDivider>

      {isPending && <EducationTimelineSkeleton />}

      <Box
        display='flex'
        justifyContent='center'
        width='100%'
      >
        <Timeline
          position='right'
          sx={{ direction: 'ltr' }}
        >
          {!isPending &&
            data?.map((item, index) => (
              <EducationTimelineItem
                item={item}
                key={index}
              />
            ))}
        </Timeline>
      </Box>
    </Box>
  );
};

export default EducationTimeline;
