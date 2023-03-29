import lazy, { Authentication } from "@/router/lazy";
const Impact = lazy(import('@/pages/impact'))

export default [
  {
    path: '/impact',
    element: <Authentication><Impact /></Authentication>
  },
]