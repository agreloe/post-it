import useSWR from 'swr';
import axiosInstance from '@/lib/axios';

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

export function useFetch<T>(url: string): { data: T | undefined; error: any; isLoading: boolean } {
  const { data, error } = useSWR<T>(url, fetcher, { revalidateOnFocus: false });

  return {
    data,
    error,
    isLoading: !error && !data,
  };
}
