import QueryKeys from '@/constants/queryKeys';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const useDeleteImageMutation = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QueryKeys.M_DELETE_IMAGE],
    mutationFn: (data: { key: string }) =>
      axiosAuth.delete(`/storage/${data.key}`),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Q_IMAGES] });
    },
  });

  return mutation;
};

export default useDeleteImageMutation;
