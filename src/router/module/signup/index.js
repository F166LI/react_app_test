import lazy from "@/router/lazy";
const Signup = lazy(import('@/pages/signup'))

export default [
  {
    path: '/signup',
    element: <Signup />
  },
]