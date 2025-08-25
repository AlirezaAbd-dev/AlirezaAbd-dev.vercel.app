import QueryKeys from '@/constants/queryKeys';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteSkillMutation = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QueryKeys.M_DELETE_SKILL],
    mutationFn: (id: number) => axiosAuth.delete(`/skills/${id}`),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Q_SKILLS] });
    },
  });

  return mutation;
};

export default useDeleteSkillMutation;
