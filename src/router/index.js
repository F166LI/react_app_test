import React from 'react';
import {
  Navigate,
  Routes,
  Route,
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from 'react-redux';

import { open, close } from '@/store/loading';
import { Spin } from 'antd';

import routes from "./route";

const router = createBrowserRouter(routes);

const AuthenticationRoute = () => {
  const loading = useSelector((state) => state.loading);

  return (
    <Spin wrapperClassName="loading" size="large" spinning={loading}>
      <RouterProvider router={router} />
    </Spin>
  )
}

export default AuthenticationRoute