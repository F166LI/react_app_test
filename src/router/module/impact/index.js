import lazy, { AuthenticationComponent } from "@/router/lazy";
const Impact = lazy(import('@/pages/impact'))

export default [
  {
    path: '/impact',
    element: <AuthenticationComponent><Impact /></AuthenticationComponent>
  },
]