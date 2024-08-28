import React from "react";
import { useForm } from "react-hook-form";

import { useEditMovie } from "../hooks/useEditMovie";
import { Movie } from "../types";
import { Image } from ".";

type Props = {
  movie: Movie;
  isEditing: (value: boolean) => void;
};

const EditMovieForm: React.FC<Props> = ({ movie, isEditing }) => {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  const form = useForm<Movie>({
    defaultValues: {
      title: movie.title,
      image: movie.image,
      releaseDate: movie.releaseDate,
      description: movie.description,
      director: movie.director,
      actors: movie.actors,
      genre: movie.genre,
      rating: +movie.rating.toFixed(2),
    },
  });
  const { mutateAsync: editMovie } = useEditMovie(movie._id);

  const onSubmit = async (formData: Movie) => {
    await editMovie(formData);
    isEditing(false);
  };

  return (
    <section className="flex justify-center h-[calc(100vh-64px)] ">
      <div className="relative p-6 border rounded-md flex flex-col items-center max-w-max ">
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-gray-700">
          <div className="flex flex-col md:flex-row md:gap-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Title
              </label>
              <input
                {...form.register("title")}
                type="text"
                placeholder="Movie title..."
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {form.formState.errors.title && (
                <p className="text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Release Date
              </label>
              <input
                {...form.register("releaseDate")}
                type="date"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {form.formState.errors.releaseDate && (
                <p className="text-red-500">
                  {form.formState.errors.releaseDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 max-w-max">
                Director
              </label>
              <input
                {...form.register("director")}
                type="text"
                placeholder="Director name..."
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {form.formState.errors.director && (
                <p className="text-red-500">
                  {form.formState.errors.director.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Rating
              </label>
              <input
                {...form.register("rating", { valueAsNumber: true })}
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="Rating (0-10)"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {form.formState.errors.rating && (
                <p className="text-red-500">
                  {form.formState.errors.rating.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Actors
            </label>
            <input
              {...form.register("actors")}
              type="text"
              placeholder="Actor names separated by commas"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {form.formState.errors.actors && (
              <p className="text-red-500">
                {form.formState.errors.actors.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Genre
            </label>
            <input
              {...form.register("genre")}
              type="text"
              placeholder="Genres separated by commas"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {form.formState.errors.genre && (
              <p className="text-red-500">
                {form.formState.errors.genre.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Image URL
            </label>
            <input
              {...form.register("image")}
              type="text"
              placeholder="URL poster image"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {form.formState.errors.genre && (
              <p className="text-red-500">
                {form.formState.errors.genre.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Description
            </label>
            <textarea
              {...form.register("description")}
              rows={2}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              placeholder="Movie description..."
            />
            {form.formState.errors.description && (
              <p className="text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
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
                form.reset();
                isEditing(false);
              }}
              className="inline-block px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
        <button
          onClick={() => isEditing(false)}
          className="absolute right-3 top-3"
        >
          <Image.CloseIcon size={25} />
        </button>
      </div>
    </section>
  );
};

export default EditMovieForm;
