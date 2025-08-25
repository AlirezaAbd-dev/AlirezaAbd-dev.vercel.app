import QueryKeys from '@/constants/queryKeys';
import axiosBase from '@/utils/axiosBase';
import { useQuery } from '@tanstack/react-query';

export type Education = {
  id: number;
  educationalQualification: string;
  fieldOfStudy: string;
  placeOfStudy: string;
  fromYear: number;
  toYear: number;
};

const useEducationQuery = () => {
  const query = useQuery<Education[]>({
    queryKey: [QueryKeys.Q_EDUCATION],
    queryFn: () => axiosBase.get('/education').then((res) => res.data),
  });

  return query;
};

export default useEducationQuery;
