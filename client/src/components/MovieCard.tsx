import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../context/AuthContext";
import { editFavoriteList } from "../api";
import { Movie } from "../types";
import { Image } from ".";

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  const { _id, image, title, releaseDate, rating } = movie;

  const { isAuth, userId } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const location = useLocation();

  const isFavorite = movie?.isFavorite;

  const { mutateAsync: toggleIsFavorite } = useMutation({
    mutationFn: () =>
      editFavoriteList(userId, {
        movieId: movie._id,
        action: isFavorite ? "remove" : "add",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  const linkTo = location.pathname.startsWith("/favorites")
    ? `/favorites/${_id}`
    : `/movie/${_id}`;

  return (
    <article className="bg-gray-700 shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105">
      <div className="relative">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-80 object-cover"
        />
        {isAuth && (
          <div className="absolute top-1 right-1 flex flex-col gap-2">
            <div
              onClick={() => toggleIsFavorite()}
              className="px-2 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-full cursor-pointer"
            >
              {isFavorite ? (
                <Image.HeartChecked size={25} />
              ) : (
                <Image.HeartIcon size={25} />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div>
          <h2 className="text-lg font-semibold text-white truncate">{title}</h2>
          <time className="text-sm text-gray-400" dateTime={releaseDate}>
            Released: {releaseDate}
          </time>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-yellow-400 font-bold">{rating} / 10</p>
          <Link to={linkTo} className="text-sm text-blue-500 hover:underline">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
