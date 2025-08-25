import QueryKeys from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Profile } from '../main/useProfileQuery';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const useAuth = (action?: string) => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [token] = useLocalStorage('token', '');

  const query = useQuery<Profile>({
    queryKey: [QueryKeys.Q_AUTH, token],
    queryFn: () => axiosAuth.get('/auth/me').then((res) => res.data),
  });

  if (!query.isPending && !query.data && action) {
    router.replace(action);
  }

  return query;
};

export default useAuth;
