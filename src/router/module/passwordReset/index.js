import lazy, { Authentication } from "@/router/lazy";
const PasswordReset = lazy(import('@/pages/passwordReset'))

export default [
  {
    path: '/passwordReset',
    element: <Authentication><PasswordReset /></Authentication>
  },
]