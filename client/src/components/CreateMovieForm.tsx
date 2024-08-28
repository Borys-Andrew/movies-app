import React from "react";
import { useForm } from "react-hook-form";

import { useAddMovie } from "../hooks/useAddMovie";
import { NewMovie } from "../types";
import { Image } from ".";

type Props = {
  isAdding: (value: boolean) => void;
};

const CreateMovieForm: React.FC<Props> = ({ isAdding }) => {
  const { register, handleSubmit, reset } = useForm<NewMovie>();
  const { mutateAsync: addMovie } = useAddMovie();

  const onSubmit = async (formData: NewMovie) => {
    try {
      await addMovie(formData);

      isAdding(false);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <section className="flex justify-center mt-6 ">
      <div className="relative p-6 border rounded-md flex flex-col items-center max-w-max ">
        <form onSubmit={handleSubmit(onSubmit)} className="text-gray-700">
          <div className="flex flex-col md:flex-row md:gap-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="Movie title..."
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Release Date
              </label>
              <input
                {...register("releaseDate", {
                  required: "Release Date is required",
                })}
                type="date"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 max-w-max">
                Director
              </label>
              <input
                {...register("director", { required: "Director is required" })}
                type="text"
                placeholder="Director name..."
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Rating
              </label>
              <input
                {...register("rating", {
                  valueAsNumber: true,
                  required: "Rating is required",
                })}
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="Rating (0-10)"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Actors
            </label>
            <input
              {...register("actors", {
                setValueAs: (value) =>
                  value.split(",").map((actor: string) => actor.trim()),
                required: "Actors is required",
              })}
              type="text"
              placeholder="Actor names separated by commas"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Genre
            </label>
            <input
              {...register("genre", {
                setValueAs: (value) =>
                  value.split(",").map((genre: string) => genre.trim()),
                required: "Genre is required",
              })}
              type="text"
              placeholder="Genres separated by commas"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Image URL
            </label>
            <input
              {...register("image", { required: "Image URL is required" })}
              type="text"
              placeholder="URL poster image"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={2}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              placeholder="Movie description..."
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                isAdding(false);
              }}
              className="inline-block px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
        <button
          onClick={() => isAdding(false)}
          className="absolute right-3 top-3"
        >
          <Image.CloseIcon size={25} />
        </button>
      </div>
    </section>
  );
};

export default CreateMovieForm;
