import React, { useEffect } from 'react';
import {
  useLocation,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import routes from "./route";

const router = createBrowserRouter(routes);
const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router