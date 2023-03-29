import lazy, { AuthenticationComponent } from "@/router/lazy";
const Wallet = lazy(import('@/pages/wallet'))

export default [
  {
    path: '/wallet',
    element: <AuthenticationComponent><Wallet /></AuthenticationComponent>
  },
]