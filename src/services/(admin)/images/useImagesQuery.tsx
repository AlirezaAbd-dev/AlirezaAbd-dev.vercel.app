import QueryKeys from '@/constants/queryKeys';
import axiosBase from '@/utils/axiosBase';
import { useQuery } from '@tanstack/react-query';

const useImagesQuery = () => {
  const query = useQuery({
    queryKey: [QueryKeys.Q_IMAGES],
    queryFn: () =>
      axiosBase.get('/storage/images').then<string[]>((res) => res.data),
  });

  return query;
};

export default useImagesQuery;
