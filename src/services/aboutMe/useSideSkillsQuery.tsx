import QueryKeys from '@/constants/queryKeys';
import axiosBase from '@/utils/axiosBase';
import { useQuery } from '@tanstack/react-query';
import { Skill } from './useSkillsQuery';

export type SideSkill = Omit<Skill, 'value'>;

const useSideSkillsQuery = () => {
  const query = useQuery<SideSkill[]>({
    queryKey: [QueryKeys.Q_SIDE_SKILLS],
    queryFn: () => axiosBase.get('/sideSkills').then((res) => res.data),
  });

  return query;
};

export default useSideSkillsQuery;
