import React from "react";

import { Movie } from "../types";
import { MovieCard } from "../components";

type Props = {
  movies: Movie[];
};

const MovieList: React.FC<Props> = ({ movies }) => {
  return (
    <section className="items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </section>
  );
};

export default MovieList;
