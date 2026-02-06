import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { paths } from "@/constants";
import { instance } from "../apis";
import { AxiosError } from "axios";
import { useToast } from "./useToast";

type apiType = "post" | "patch" | "delete" | "put";

export const useMyMutation = <T, K>(
  type: apiType,
  pathname: keyof typeof paths,
  url: string,
): UseMutationResult<K, number, T> => {
  const { error } = useToast();

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
      } catch (err) {
        if (err instanceof AxiosError) {
          const status = err.response?.status;
          if (status === 500) {
            error("서버가 터졌습니다");
          } else if (status === 502 || status === 503) {
            error("스퀘어가 터졌습니다");
          }
          throw status;
        } else {
          error("클라가 터졌습니다");
          throw 500;
        }
      }
    },
  });
};
