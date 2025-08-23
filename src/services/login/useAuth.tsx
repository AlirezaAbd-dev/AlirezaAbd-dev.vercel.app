import QueryKeys from '@/constants/queryKeys';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import addBearer from '@/utils/addBearer';
import axiosBase from '@/utils/axiosBase';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Profile } from '../main/useProfileQuery';

const useAuth = (action?: string) => {
  const router = useRouter();

  const [token] = useLocalStorage('token', '');

  const query = useQuery<Profile>({
    queryKey: [QueryKeys.AUTH],
    queryFn: () =>
      axiosBase
        .get('/auth/me', {
          headers: {
            Authorization: addBearer(token),
          },
        })
        .then((res) => res.data),
  });

  if (!query.isPending && !query.data && action) {
    router.replace(action);
  }

  return query;
};

export default useAuth;
