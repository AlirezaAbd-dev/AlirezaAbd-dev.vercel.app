import QueryKeys from '@/constants/queryKeys';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import addBearer from '@/utils/addBearer';
import axiosBase from '@/utils/axiosBase';
import { ProfileValidationType } from '@/validations/(admin)/profileValidation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditProfileMutation = () => {
  const queryClient = useQueryClient();

  const [token] = useLocalStorage('token', '');

  const mutation = useMutation({
    mutationKey: [QueryKeys.M_EDIT_PROFILE],
    mutationFn: (data: ProfileValidationType) =>
      axiosBase.patch('/users', data, {
        headers: {
          Authorization: addBearer(token),
        },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.PROFILE] });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
    },
  });

  return mutation;
};

export default useEditProfileMutation;
