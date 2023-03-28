
import { notification } from "antd"

import { getToken } from '@/utils/auth'

// import router from "@/router";
import store from "@/store";

import tips from "./tips";
// const api_whiteList = ['/api-business/get/complete'];

function Global_requests () {

  return {
    response (config) {
      store.dispatch({ type: 'loading/open' })

      const token = getToken();
      if (token) {
        config.headers['Authorization'] = token
      }
      return config
    },
    error (err) {
      store.dispatch({ type: 'loading/close' })
      notification.error({
        description:
          'Request error',
      });
      console.warn('接口请求异常 >>>>', err)
      return Promise.reject(err)
    },
  }
}

function Global_responses () {
  return {
    response (response) {
      const res = response.data
      const validCodes = [200];

      store.dispatch({ type: 'loading/close' })
      if (validCodes.indexOf(res.code) === -1) {

        if (response.config.url !== 'user/signin') {
          notification.error({
            description: tips.error[res.code] || res.message,
          });
        }

        if (res.code === 2001) {
          useUserStore().logOut().then(() => {
            // router.push('/login');
          })
        }
        console.error(`接口响应错误 >>>> ${res}`, res)
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    error (err) {
      store.dispatch({ type: 'loading/close' })
      notification.error({
        description: err.message || 'Network Error'
      });
      console.warn('Network Error >>>>', err)
      return Promise.reject(err)
    },
  }
}


const global_request = Global_requests();
const global_response = Global_responses();

const interceptorsMethods = {
  global_request: {
    response: global_request.response,
    error: global_request.error
  },
  global_response: {
    response: global_response.response,
    error: global_response.error,
  },

  gocardless_request: {
    response: global_request.response,
    error: global_request.error
  },
  gocardless_response: {
    response: global_response.response,
    error: global_response.error,
  },
}

const envMap = {
  base (api) {
    api.interceptors.request.use(interceptorsMethods.global_request.response, interceptorsMethods.global_request.error)
    api.interceptors.response.use(interceptorsMethods.global_response.response, interceptorsMethods.global_response.error)
  },
  gocardless (api) {
    api.interceptors.request.use(interceptorsMethods.gocardless_request.response, interceptorsMethods.gocardless_request.error)
    api.interceptors.response.use(interceptorsMethods.gocardless_response.response, interceptorsMethods.gocardless_response.error)
  },
}

const Interceptors = (api, env) => {
  envMap[env](api);
}

export default Interceptors;