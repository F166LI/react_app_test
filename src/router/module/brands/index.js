import lazy, { Authentication } from "@/router/lazy";
const Brands = lazy(import('@/pages/brands'))

export default [
  {
    path: '/brands',
    element: <Authentication><Brands /></Authentication>
  },
]