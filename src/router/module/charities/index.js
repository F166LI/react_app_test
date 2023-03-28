import lazy from "@/router/lazy";
const Charities = lazy(import('@/pages/charities'))

export default [
  {
    path: '/charities',
    element: <Charities />
  },
]