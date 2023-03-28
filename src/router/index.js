import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import routes from "./route";

const router = createBrowserRouter(routes);
const Router = () => {
  const loading = useSelector((state) => state.loading.loading);

  return (
    <Spin wrapperClassName="loading" size="large" spinning={loading}>
      <RouterProvider router={router} />
    </Spin>
  )
}

export default Router