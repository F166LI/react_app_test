import { lazy } from "react"
const component = (path, time = 400) => lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(path), time)
  })
})

export default component;