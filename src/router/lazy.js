import { lazy } from "react"
import { Router, Route, Navigate, useLocation } from "react-router-dom";
import { getToken, setToken, removeToken } from '@/utils/auth'

const AuthenticationNode = (props) => {
  const { pathname } = useLocation();
  const hasToken = getToken();
  if (!hasToken) {
    if (pathname !== '/login') {
      return <Navigate to="/login" />
    }
  }
  return props.children
};

export const AuthenticationComponent = AuthenticationNode;

const component = (path, time = 400, name) => {
  return lazy(() => {
    const hasToken = getToken();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(path)
      }, time)
    })
  })
}

export default component;