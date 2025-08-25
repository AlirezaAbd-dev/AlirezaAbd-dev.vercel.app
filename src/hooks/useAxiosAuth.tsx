'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import axiosBase from '@/utils/axiosBase';

export function useAxiosAuth(action: string = '/') {
  const router = useRouter();
  const [token] = useLocalStorage<string>('token', '');

  useEffect(() => {
    const reqInterceptor = axiosBase.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const resInterceptor = axiosBase.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && action) {
          router.push(action);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosBase.interceptors.request.eject(reqInterceptor);
      axiosBase.interceptors.response.eject(resInterceptor);
    };
  }, [token, action, router]);

  return axiosBase;
}
