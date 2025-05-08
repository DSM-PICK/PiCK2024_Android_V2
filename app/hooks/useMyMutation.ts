import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { paths } from "@/constants";
import { instance } from "../apis";

type apiType = "post" | "patch" | "delete" | "put";

export const useMyMutation = <T, K>(type: apiType, pathname: keyof typeof paths, url: string): UseMutationResult<K, Error, T> => {
  return useMutation<K, Error, T>({
    mutationFn: async (item: T | string): Promise<K> => {
      try {
        let _url: string = paths[pathname] + url;
        if (typeof item === "string") {
          _url += item;
          const res = await instance[type](_url);
          return res?.data;
        } else {
          const res = await instance[type](_url, item);
          return res?.data;
        }
      } catch (error) {
        throw error;
      }
    },
  });
};
