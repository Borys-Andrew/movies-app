import axios from "axios";
import { Movie, NewMovie } from "../types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllMovies = async () => {
  try {
    const data = await axios.get(`${BASE_URL}movie`);

    return data;
  } catch (error) {
    console.log("🚀 ~ getAllMovies ~ error:", error);
  }
};

export const getMovieById = async (id = "") => {
  try {
    const data = await axios.get(`${BASE_URL}movie/${id}`);

    return data;
  } catch (error) {
    console.log("🚀 ~ getMovieById ~ error:", error);
  }
};

export const createMovie = async (movie: NewMovie) => {
  try {
    const data = await axios.post(`${BASE_URL}movie`, movie);

    return data;
  } catch (error) {
    console.log("🚀 ~ addMovie ~ error:", error);
  }
};

export const removeMovieById = async (id: string) => {
  console.log("🚀 ~ removeMovieById ~ id:", id);
  try {
    const data = await axios.delete(`${BASE_URL}movie/${id}`);

    return data;
  } catch (error) {
    console.log("🚀 ~ removeMovieById ~ error:", error);
  }
};

export const editMovieById = async (id = "", movie: Omit<Movie, "_id">) => {
  try {
    const data = await axios.put(`${BASE_URL}movie/${id}`, movie);

    return data;
  } catch (error) {
    console.log("🚀 ~ updateMovieById ~ error:", error);
  }
};

export const editFavoriteList = async (
  id = "",
  body: {
    movieId: string;
    action: "add" | "remove";
  },
) => {
  try {
    const data = await axios.put(`${BASE_URL}movie/favorite/${id}`, body);

    return data;
  } catch (error) {
    console.log("🚀 ~ editFavoriteList ~ error:", error);
  }
};

export const getFavoriteList = async (userId = "") => {
  try {
    const data = await axios.get(`${BASE_URL}movie/favorite/${userId}`);

    return data;
  } catch (error) {
    console.log("🚀 ~ getFavoriteList ~ error:", error);
  }
};

export const login = async (userData: { email: string; password: string }) => {
  try {
    const data = await axios.post(`${BASE_URL}auth/login`, userData);

    return data;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
  }
};

export const signup = async (userData: {
  userName: string;
  email: string;
  password: string;
}) => {
  try {
    const data = await axios.post(`${BASE_URL}auth/register`, userData);

    return data;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

export const isAuthenticated = async () => {
  try {
    const data = await axios.get(`${BASE_URL}auth`);

    return data;
  } catch (error) {
    console.log("🚀 ~ isAuthenticated ~ error:", error);
  }
};
