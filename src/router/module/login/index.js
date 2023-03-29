import lazy, { Authentication } from "@/router/lazy";
const Login = lazy(import('@/pages/login'), 400, 'login')

export default [
  {
    path: '/login',
    element: <Authentication><Login /></Authentication>
  },
]