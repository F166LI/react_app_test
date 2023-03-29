import lazy, { Authentication } from "@/router/lazy";
const Wallet = lazy(import('@/pages/wallet'))

export default [
  {
    path: '/wallet',
    element: <Authentication><Wallet /></Authentication>
  },
]