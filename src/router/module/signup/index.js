import lazy, { Authentication } from "@/router/lazy";
const Signup = lazy(import('@/pages/signup'))

export default [
  {
    path: '/signup',
    element: <Authentication><Signup /></Authentication>
  },
]