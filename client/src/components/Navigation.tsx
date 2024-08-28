import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";

import { AuthContext } from "../context/AuthContext";
import { Image } from ".";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, userName, setUser } = useContext(AuthContext);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-700 p-4 w-screen">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/movies" className="text-gray-300 hover:text-white">
            MovieApp
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/movies"
            className={cn("text-gray-300 hover:text-white", {
              underline: isActive("/movies"),
            })}
          >
            Movies
          </Link>
          {isAuth ? (
            <>
              <Link
                to="/favorites"
                className={cn("text-gray-300 hover:text-white", {
                  underline: isActive("/favorites"),
                })}
              >
                Favorites
              </Link>
              <div className="flex space-x-3">
                <p className="text-gray-300">{`Hi, ${userName}`}</p>
                <button
                  onClick={() => {
                    setUser({
                      userName: "",
                      userId: "",
                      isAuth: false,
                    });
                    navigate("/movies", { replace: true });
                  }}
                  className="text-gray-300 focus:outline-none"
                >
                  <Image.LogoutIcon
                    size={25}
                    className="fill-gray-300 hover:fill-white"
                  />
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="text-gray-300">
              <Image.LoginIcon
                size={20}
                className="fill-gray-300 hover:fill-white"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
