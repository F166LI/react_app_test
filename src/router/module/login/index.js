import lazy from "@/router/lazy";
const Login = lazy(import('@/pages/login'), 400, 'login')

export default [
  {
    path: '/login',
    element: <Login />
  },
]