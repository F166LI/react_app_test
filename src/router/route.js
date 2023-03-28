import {
  Navigate,
  Routes,
  Route,
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";

import login from "./module/login";
import signup from "./module/signup";
import passwordReset from "./module/passwordReset";
import charities from "./module/charities";
import brands from "./module/brands";
import wallet from "./module/wallet";
import impact from "./module/impact";

import { getToken, setToken, removeToken } from '@/utils/auth'

export default [
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
  ...login,
  ...signup,
  ...passwordReset,
  ...charities,
  ...brands,
  ...wallet,
  ...impact,
  // {
  //   path: '/home',
  //   element: <Home />,
  //   children: [
  //     {
  //       path: 'setup',
  //       element: <Setup />
  //     },
  //     {
  //       path: 'installation',
  //       element: <Installation />
  //     },
  //   ]
  // },
  // {
  //   path: '/use',
  //   element: <Use />
  // }
]