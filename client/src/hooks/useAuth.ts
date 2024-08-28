import { useEffect, useState } from "react";

type User = {
  userName: string | undefined;
  userId: string | undefined;
  isAuth: boolean;
};

export const useAuth = () => {
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("authUser");

    return storedUser
      ? JSON.parse(storedUser)
      : {
          userName: undefined,
          userId: undefined,
          isAuth: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("authUser", JSON.stringify(user));
  }, [user]);

  const logout = () => {
    setUser({
      userName: undefined,
      userId: undefined,
      isAuth: false,
    });

    localStorage.removeItem("authUser");
  };

  return { user, setUser, logout };
};
