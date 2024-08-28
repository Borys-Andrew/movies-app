import React from "react";
import { Navigation } from "../components";
import { Outlet } from "react-router-dom";

const PageTemplate = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default PageTemplate;
