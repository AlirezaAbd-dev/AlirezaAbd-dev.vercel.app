'use client';
import UseSkillRandom from '@/hooks/useSkillRandom';
import {
  Divider,
  Chip,
  Typography,
  Box,
  LinearProgress,
  Badge,
  Skeleton,
} from '@mui/material';
import Image from 'next/image';

interface SkillProps {
  icon?: string;
  name: string;
  color: string;
  value: number;
}

const Skill = ({ icon, color, name, value }: SkillProps) => {
  const skillRate = UseSkillRandom(value);

  return (
    <>
      <Divider
        textAlign='right'
        sx={{
          '&::before, &::after': {
            borderColor: `${color}.main`,
          },
          mt: 3,
          mb: 1,
        }}
      >
        <Chip
          icon={
            icon ? (
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={30}
                  height={30}
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Box>
            ) : (
              <Skeleton
                variant='circular'
                animation='wave'
                width={30}
                height={30}
              />
            )
          }
          label={name}
          sx={{ color: '#000', p: 3, bgcolor: color }}
        />
      </Divider>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', ml: 1 }}>
          <LinearProgress
            variant='determinate'
            value={skillRate}
            color={color}
            sx={{
              height: 10,
              borderRadius: 2,
            }}
          />
        </Box>
        <Box sx={{ minWidth: 35, mr: 2 }}>
          <Typography variant='body2'>
            <Badge
              variant='standard'
              badgeContent={`${Math.round(skillRate)}%`}
              color={color}
            />
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Skill;
