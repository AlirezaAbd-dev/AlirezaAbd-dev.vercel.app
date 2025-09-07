import QueryKeys from '@/constants/queryKeys';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { SkillValidationType } from '@/validations/(admin)/SkillValidation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddSkillMutation = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QueryKeys.M_ADD_SKILL],
    mutationFn: (data: SkillValidationType) => axiosAuth.post('/skills', data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Q_SKILLS] });
    },
  });

  return mutation;
};

export default useAddSkillMutation;
