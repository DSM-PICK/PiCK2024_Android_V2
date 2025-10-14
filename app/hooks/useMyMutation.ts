import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { paths } from "@/constants";
import { instance } from "../apis";
import { AxiosError } from "axios";

type apiType = "post" | "patch" | "delete" | "put";

export const useMyMutation = <T, K>(type: apiType, pathname: keyof typeof paths, url: string): UseMutationResult<K, number, T> => {
  return useMutation<K, number, T>({
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
        if (error instanceof AxiosError) {
          throw error.response?.status;
        } else {
          throw 500;
        }
      }
    },
  });
};
