import QueryKeys from '@/constants/queryKeys';
import axiosBase from '@/utils/axiosBase';
import { useQuery } from '@tanstack/react-query';

export type Skill = {
  id: number;
  name: string;
  value: number;
  icon: string;
  color: string;
};

const useSkillsQuery = () => {
  const query = useQuery<Skill[]>({
    queryKey: [QueryKeys.Q_SKILLS],
    queryFn: () => axiosBase.get('/skills').then((res) => res.data),
  });

  return query;
};

export default useSkillsQuery;
