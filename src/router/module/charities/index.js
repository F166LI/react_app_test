import lazy, { Authentication } from "@/router/lazy";
const Charities = lazy(import('@/pages/charities'))

export default [
  {
    path: '/charities',
    element: <Authentication><Charities /></Authentication>
  },
]