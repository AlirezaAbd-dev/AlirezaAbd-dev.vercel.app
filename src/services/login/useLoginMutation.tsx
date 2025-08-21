import QueryKeys from '@/constants/queryKeys';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import axiosBase from '@/utils/axiosBase';
import { LoginValidationType } from '@/validations/loginValidation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useLoginMutation = () => {
  const [_token, setToken] = useLocalStorage<string>('token', '');

  const mutation = useMutation<
    { token: string },
    AxiosError<{ message: string }>,
    LoginValidationType
  >({
    mutationKey: [QueryKeys.M_LOGIN],
    mutationFn: (data) =>
      axiosBase.post('/auth/login', data).then((res) => res.data),
    onSuccess(data) {
      setToken(data.token);
    },
  });

  return mutation;
};

export default useLoginMutation;
