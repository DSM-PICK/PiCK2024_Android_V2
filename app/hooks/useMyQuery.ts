import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { paths } from "@/constants";
import { instance } from "../apis";

export const useMyQuery = <T>(pathname: keyof typeof paths, url: string): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: [paths[pathname], url],
    queryFn: async (): Promise<T> => {
      const res = await instance.get(paths[pathname] + url);
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
};
