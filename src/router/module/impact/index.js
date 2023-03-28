import lazy from "@/router/lazy";
const Impact = lazy(import('@/pages/impact'))

export default [
  {
    path: '/impact',
    element: <Impact />
  },
]