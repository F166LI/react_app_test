import lazy from "@/router/lazy";
const Brands = lazy(import('@/pages/brands'))

export default [
  {
    path: '/brands',
    element: <Brands />
  },
]