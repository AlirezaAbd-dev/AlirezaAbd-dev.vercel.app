import QueryKeys from '@/constants/queryKeys';
import axiosBase from '@/utils/axiosBase';
import { useQuery } from '@tanstack/react-query';

type Profile = {
  fullname: string;
  avatar: string;
  email: string;
  birthCity: string;
  birthday: string;
  id: number;
  githubUrl: string;
  instagramUrl: string;
  telegramUrl: string;
};

const useProfileQuery = () => {
  const query = useQuery<Profile>({
    queryKey: [QueryKeys.PROFILE],
    queryFn: () => axiosBase.get('/users').then((res) => res.data),
  });

  return query;
};

export default useProfileQuery;
