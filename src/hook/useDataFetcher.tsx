import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

interface UseDataFetcherProps<T> {
  endpoint: string;
  queryParameters?: Record<string, any>;
  processData?: (data: any) => T;
}
export function useDataFetcher<T>({
  endpoint,
  queryParameters = {},
  processData = (data: any) => data,
}: UseDataFetcherProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < data?.totalPage) {
      const nextPage = currentPage + 1;
      queryClient
        .prefetchQuery([
          endpoint,
          nextPage,
          async () => {
            try {
              const data = await fetchPageData(nextPage);
              return processData(data);
            } catch (error) {
              console.log("Error: " + error);
            }
          },
        ])
        .catch(() => {
          console.log("error: ");
        });
    }
  }, []);

  const fetchPageData = async ({ page = currentPage }) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    const response = await axios.get(endpoint, {
      params: { ...queryParameters, limit, offset },
    });

    return response.data;
  };

  const { isLoading, isError, data, refetch } = useQuery(
    [endpoint, currentPage],
    () => fetchPageData(currentPage),
    {
      staleTime: 0,
      keepPreviousData: true,
    }
  );

  const processedData = data ? processData(data) : [];

  return {
    isLoading,
    isError,
    refetch,
    data: processedData,
    currentPage,
    totalPage: data?.totalPage,
    setCurrentPage,
  };
}
