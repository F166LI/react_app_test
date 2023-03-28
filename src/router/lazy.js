import { lazy } from "react"
import { useNavigate } from 'react-router-dom';
import { Router, Route, Navigate } from "react-router-dom";
import { getToken, setToken, removeToken } from '@/utils/auth'
import { useSelector } from 'react-redux';

const login = import("./toLogin.js");

// const Authentication = async (Component) => {

//   const ComponentNode = await Component;

//   const navigate = useNavigate();

//   const hasToken = getToken();

//   console.log(hasToken)

//   if (!hasToken) {
//     navigate('/login');
//     return null;
//   }

//   return (
//     <ComponentNode />
//   );
// };

// const PrivateRoute = ({ element, ...rest }) => {
//   const isLoggedIn = getToken();
//   return isLoggedIn ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

const component = (path, time = 400, name) => lazy(() => {
  const hasToken = getToken();

  return new Promise(resolve => {
    if (hasToken) {
      setTimeout(() => {
        resolve(path)
      }, time)
    } else {
      if (name !== 'login') {
        resolve(login)
      } else {
        setTimeout(() => {
          resolve(path)
        }, time)
      }
    }
  })
})

export default component;