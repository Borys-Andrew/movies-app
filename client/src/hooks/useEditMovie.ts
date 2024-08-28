import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editMovieById } from "../api";
import { Movie } from "../types";

export const useEditMovie = (movieId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: Omit<Movie, "_id">) => {
      const data = {
        title: formData.title,
        image: formData.image,
        releaseDate: formData.releaseDate,
        description: formData.description,
        director: formData.director,
        actors: formData.actors,
        genre: formData.genre,
        rating: formData.rating,
      };

      const result = await editMovieById(movieId, data);

      return result;
    },
    onSuccess: (result) => {
      queryClient.setQueryData(["movies", movieId], result?.data);
    },
  });
};
