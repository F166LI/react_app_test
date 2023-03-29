import lazy, { AuthenticationComponent } from "@/router/lazy";
const Charities = lazy(import('@/pages/charities'))

export default [
  {
    path: '/charities',
    element: <AuthenticationComponent><Charities /></AuthenticationComponent>
  },
]