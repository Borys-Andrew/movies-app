import { useMutation, useQueryClient } from "@tanstack/react-query";

import { NewMovie } from "../types";
import { createMovie } from "../api";

export const useAddMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: NewMovie) => {
      const result = await createMovie(formData);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
