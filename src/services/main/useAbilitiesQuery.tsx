import QueryKeys from '@/constants/queryKeys';
import axiosBase from '@/utils/axiosBase';
import { useQuery } from '@tanstack/react-query';

export type Ability = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const useAbilitiesQuery = () => {
  const query = useQuery<Ability[]>({
    queryKey: [QueryKeys.Q_ABILITIES],
    queryFn: () => axiosBase.get('/ability').then((res) => res.data),
  });

  return query;
};

export default useAbilitiesQuery;
