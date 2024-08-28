import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../context/AuthContext";
import { CreateMovieForm, MovieList } from "../components";
import { getAllMovies, getFavoriteList } from "../api";
import { Movie } from "../types";

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdditing, setIsAdditing] = useState(false);
  const { isAuth, userId } = useContext(AuthContext);

  const {
    isPending,
    error,
    data: movies,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getAllMovies,
    refetchOnWindowFocus: false,
  });

  const { data: favoritesMovies } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavoriteList(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  const filteredMovies =
    movies?.data
      ?.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .map((movie: Movie) => {
        const ids = favoritesMovies?.data?.ids || [];

        return {
          ...movie,
          isFavorite: ids.includes(movie._id),
        };
      }) || [];

  return (
    <>
      {!isAdditing && (
        <div className="flex flex-col md:flex-row justify-center gap-3 px-6 pt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie..."
            className="w-full md:max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {isAuth && (
            <button
              onClick={() => setIsAdditing(true)}
              className="px-4 py-2 w-full md:w-max bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add movie
            </button>
          )}
        </div>
      )}

      {!isAdditing && <MovieList movies={filteredMovies} />}

      {isAdditing && <CreateMovieForm isAdding={setIsAdditing} />}
    </>
  );
};

export default MoviesPage;
