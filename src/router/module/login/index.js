import lazy from "@/router/lazy";
const Login = lazy(import('@/pages/login'))

export default [
  {
    path: '/login',
    element: <Login />
  },
]