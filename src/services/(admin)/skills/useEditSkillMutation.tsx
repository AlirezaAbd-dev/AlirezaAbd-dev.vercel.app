import QueryKeys from '@/constants/queryKeys';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { SkillValidationType } from '@/validations/(admin)/SkillValidation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditSkillMutation = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QueryKeys.M_EDIT_SKILL],
    mutationFn: ({ id, ...data }: SkillValidationType & { id: number }) =>
      axiosAuth.put(`/skills/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Q_SKILLS] });
    },
  });

  return mutation;
};

export default useEditSkillMutation;
