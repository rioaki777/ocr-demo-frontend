'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetOcrJob = (jobId: number, isPollingEnabled: boolean) => {
  const { data, error, isFetching, isLoading, isPending, isSuccess, isError } =
    useQuery({
      queryKey: ['ocr', 'byId', jobId],
      queryFn: async () => {
        const res = await axios.get('http://localhost:8080/ocr/byId/' + jobId);
        return res.data;
      },
      refetchInterval: 3000,
      enabled: isPollingEnabled,
    });

  return {
    data,
    error,
    isFetching,
    isLoading,
    isPending,
    isSuccess,
    isError,
  };
};

export const useUpdateOcrJob = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post('http://localhost:8080/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });

  return { mutate, isPending, isError, isSuccess };
};
