import QueryKeys from '@/constants/queryKeys';
import axiosBase from '@/utils/axiosBase';
import { LoginValidationType } from '@/validations/loginValidation';
import { useMutation } from '@tanstack/react-query';

const useLoginMutation = () => {
  const mutation = useMutation<{ token: string }, any, LoginValidationType>({
    mutationKey: [QueryKeys.M_LOGIN],
    mutationFn: (data) =>
      axiosBase.post('/auth/login', data).then((res) => res.data),
  });

  return mutation;
};

export default useLoginMutation;
