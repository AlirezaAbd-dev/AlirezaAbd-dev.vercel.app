import QueryKeys from '@/constants/queryKeys';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import axiosBase from '@/utils/axiosBase';
import { LoginValidationType } from '@/validations/loginValidation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [_token, setToken] = useLocalStorage<string>('token', '');

  const mutation = useMutation<
    { token: string },
    AxiosError<{ message: string }>,
    LoginValidationType
  >({
    mutationKey: [QueryKeys.M_LOGIN],
    mutationFn: (data) =>
      axiosBase.post('/auth/login', data).then((res) => res.data),
    async onSuccess(data) {
      setToken(data.token);
      await queryClient.refetchQueries({ queryKey: [QueryKeys.Q_PROFILE] });
      await queryClient.refetchQueries({ queryKey: [QueryKeys.Q_AUTH] });
      router.push('/profile');
    },
  });

  return mutation;
};

export default useLoginMutation;
