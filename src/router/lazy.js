import { lazy } from "react"
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Route, Navigate, useLocation } from "react-router-dom";
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store';

const whiteList = ['/login', '/signup', '/passwordReset']

const AuthenticationNode = (props) => {
  const { pathname } = useLocation();
  const loading = useSelector((state) => {
    return state.loading.loading
  });
  const hasToken = getToken();

  if (!hasToken) {
    if (whiteList.indexOf(pathname) === -1) {
      return <Navigate to="/login" />
    }
  }
  return (
    <Spin wrapperClassName="loading" size="large" spinning={loading}>
      loading状态：{loading + ''}
      {
        props.children
      }
    </Spin>
  )
};

const SpinNode = (props) => {
  const loading = useSelector((state) => state.loading.loading);
  return (
    <Spin wrapperClassName="loading" size="large" spinning={loading}>
      {
        props.children
      }
    </Spin>
  )
}

export const Authentication = AuthenticationNode;
export const SpinComponent = SpinNode;

const component = (path, time = 400, name) => {
  return lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(path)
      }, time)
    })
  })
}

export default component;