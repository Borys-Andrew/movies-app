import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeMovieById } from "../api";

export const useRemoveMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await removeMovieById(id);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
