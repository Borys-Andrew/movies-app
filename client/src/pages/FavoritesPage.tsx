import React, { useContext, useMemo } from "react";

import { MovieList } from "../components";
import { getFavoriteList } from "../api";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { Movie } from "../types";

const FavoritesPage: React.FC = () => {
  const { userId } = useContext(AuthContext);

  const {
    isPending,
    error,
    data: movies,
  } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavoriteList(userId),
    refetchOnWindowFocus: false,
  });

  const favoriteMovies = useMemo(() => {
    return (
      movies?.data?.favoriteMovies.map((movie: Movie) => {
        const ids = movies?.data?.ids;

        return {
          ...movie,
          isFavorite: ids.includes(movie._id),
        };
      }) || []
    );
  }, [movies]);

  return (
    <div>
      <MovieList movies={favoriteMovies} />
    </div>
  );
};

export default FavoritesPage;
