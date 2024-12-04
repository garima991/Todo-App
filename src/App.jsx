import React from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Auth from "./pages/Auth";

  
export default function App() {
  const router = createBrowserRouter
  (
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/sign-in",
            element: <Auth />,
          },
        ],
      },
    ],
    {
      basename: "/",
    }
  );
  return <RouterProvider router={router} />;
}
