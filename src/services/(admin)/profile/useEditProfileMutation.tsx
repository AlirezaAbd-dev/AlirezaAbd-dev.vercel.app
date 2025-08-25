import QueryKeys from '@/constants/queryKeys';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { ProfileValidationType } from '@/validations/(admin)/profileValidation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditProfileMutation = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QueryKeys.M_EDIT_PROFILE],
    mutationFn: (data: ProfileValidationType) =>
      axiosAuth.patch('/users', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.PROFILE] });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
    },
  });

  return mutation;
};

export default useEditProfileMutation;
