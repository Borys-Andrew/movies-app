import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import cn from "classnames";

import { AuthContext } from "../context/AuthContext";
import { EditMovieForm, Image } from "../components";
import { useRemoveMovie } from "../hooks/useRemoveMovie";
import { getMovieById } from "../api";

const MovieViewPage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: movie } = useQuery({
    queryKey: ["movies", id],
    queryFn: () => getMovieById(id),
    enabled: !!id,
  });

  const { mutate: removeMovie } = useRemoveMovie();

  const handleDelete = async () => {
    if (id) {
      await removeMovie(id);
      navigate(-1);
    }
  };

  return (
    <div className="relative pt-14 px-6 text-white">
      <section className=" max-w-4xl mx-auto">
        <article
          className={cn(
            "bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row",
            {
              hidden: isEditing,
            },
          )}
        >
          <div className="relative md:w-1/3">
            <img
              src={movie?.data.image}
              alt={movie?.data.title}
              className="w-full h-90 object-cover"
            />
          </div>

          <div className="p-6 md:w-2/3">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {movie?.data.title}
              </h1>
              <p className="text-md md:text-lg text-gray-400">
                {movie?.data.releaseDate}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Description
              </h2>
              <p className="text-gray-300">{movie?.data.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Details
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-gray-400">Director:</strong>{" "}
                  {movie?.data.director}
                </li>
                <li>
                  <strong className="text-gray-400">Actors:</strong>{" "}
                  {movie?.data.actors.join(", ")}
                </li>
                <li>
                  <strong className="text-gray-400">Genre:</strong>{" "}
                  {movie?.data.genre.join(", ")}
                </li>
                <li>
                  <strong className="text-gray-400">Rating:</strong>{" "}
                  {movie?.data.rating} / 10
                </li>
              </ul>
            </div>

            {isAuth && (
              <div className="flex float-end gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-block px-6 py-3 bg-blue-500 rounded-full hover:bg-blue-600 transition"
                >
                  <Image.EditIcon size={25} />
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-block px-6 py-3 bg-red-500 rounded-full hover:bg-red-600 transition"
                >
                  <Image.Delete size={25} />
                </button>
              </div>
            )}
          </div>
        </article>

        {isEditing && (
          <EditMovieForm movie={movie?.data} isEditing={setIsEditing} />
        )}

        <div
          onClick={() => navigate(-1)}
          className="text-gray-800 text-lg absolute flex items-center gap-2 top-4 left-4 cursor-pointer"
        >
          <Image.ArrowBack size={25} />
          <span>Back</span>
        </div>
      </section>
    </div>
  );
};

export default MovieViewPage;
