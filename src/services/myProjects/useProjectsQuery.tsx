import QueryKeys from '@/constants/queryKeys';
import axiosBase from '@/utils/axiosBase';
import { useQuery } from '@tanstack/react-query';

export type Project = {
  id: number;
  name: string;
  image: string;
  referenceUrl: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

const useProjectsQuery = () => {
  const query = useQuery<Project[]>({
    queryKey: [QueryKeys.PROJECTS],
    queryFn: () => axiosBase.get('/projects').then((res) => res.data),
  });

  return query;
};

export default useProjectsQuery;
