import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Pages from './router';
import store_loading from './store/loading';
import "@/font/fontawesome/css/font-awesome.css";
import "@/scss/index.scss";

import Loading from '@/layout/authentication';
import login_png from "@/assets/logo.png";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense
    fallback={
      <Loading foot={false}>
        <img width={300} height={74} src={login_png} />
      </Loading>
    }
  >
    <Provider store={store_loading}>
      <Pages />
    </Provider>
  </Suspense>
);
