import QueryKeys from '@/constants/queryKeys';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import addBearer from '@/utils/addBearer';
import axiosBase from '@/utils/axiosBase';
import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
  const [token] = useLocalStorage('token', '');

  const query = useQuery({
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

  return query;
};

export default useAuth;
