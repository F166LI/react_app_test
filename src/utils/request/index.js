import axios from 'axios'
import globalAPI from './api';

import { getFormData } from '@/utils';

import interceptors from "./interceptors";

const api_create = (base_url, env) => {

  if (base_url === undefined) return;

  const api = axios.create({
    baseURL: base_url,
    timeout: 8000,
  })

  interceptors(api, env);
  return api
}

const api_map = {
  base: api_create(`${process.env.REACT_APP_API}`, 'base'),
}
class Request {
  constructor(name, api) {
    this.name = name;
    this.api = api;
    this.apiFn = api_map[name];
    this.cache = {};
    this.global_api = globalAPI;
    this.global_cache = {};
    this.global_res = {};
  }

  __api (url, method, data = {}, config = {}) {
    let prop = method == 'get' ? 'params' : 'data';
    const api = { ...config };
    if (url) {
      api.url = url;
      api.method = method;
      api[prop] = this.__checkMethod(api, data);
      return api;
    }
    return false;
  }

  __config (config) {
    return (url, method, data) => this.__api(url, method, data, config)
  }

  __checkMethod (config, data) {
    if (config.headers &&
      config.headers['Content-Type'] == 'multipart/form-data' &&
      config.method == 'post'
    ) {
      return getFormData(data);
    }
    return data;
  }

  __errorMsg (code, name) {
    const res = {
      '110': {
        code: '110',
        msg: `api 对象创建异常，请火速拨打110`
      },
      '10086': {
        code: '10086',
        msg: `api : ${name} 未定义，请拨打10086进行咨询`
      },
    }
    return res[code];
  }

  __check (name, request) {
    let url = this.api[name];
    if (url) {
      return request(url);
    }
    return Promise.reject(this.__errorMsg('10086', name));
  }

  /**
   * 
   * @param {String} name 缓存队列名称
   * @param {String|Boolean|Number} cache 缓存方式
   * @description  
     cache:  number  缓存时长 单位 - 秒
             cycle   在请求周期内 不再进行额外请求，请求响应后清除缓存
             false   不进行缓存
             true    持久缓存
   */
  __cache (name, request, cache = 'cycle') {

    if (cache && this.cache[name]) {
      return this.cache[name];
    }

    if (typeof cache == 'number') {
      setTimeout(() => {
        this.clearCache('name')
      }, cache * 1000);
    }

    this.cache[name] = request().catch(res => { this.clearCache(name); return Promise.reject(res); });

    if (cache == 'cycle') {
      this.cache[name].then(res => {
        this.clearCache(name);
        return res;
      })
    }

    return this.cache[name];
  }

  __request (name, config, use_cache) {
    return this.__cache(name, () => {
      if (config) {
        return this.apiFn(config)
      }
      return Promise.reject(this.__errorMsg('110', name));
    }, use_cache)
  }

  clearCache (name) {
    this.cache[name] = null;
  }

  /**
   * 
   * @param {String} name 接口名称
   * @param {Object} data 接口参数
   * @param {String|Boolean|Number} use_cache 缓存方式
   */
  post (name, data, use_cache) {
    return this.__check(name, (url) => this.__request(name, this.__api(url, 'post', data), use_cache))

  }

  /**
   * 
   * @param {String} name 接口名称
   * @param {Object} data 接口参数
   * @param {String|Boolean|Number} use_cache 缓存方式
   */
  get (name, data, use_cache) {
    return this.__check(name, (url) => this.__request(name, this.__api(url, 'get', data), use_cache))
  }

  /**
   * 
   * @param {String} name 接口名称
   * @param {Object} data 接口参数
   * @param {String|Boolean|Number} use_cache 缓存方式
   */
  put (name, data, use_cache) {
    return this.__check(name, (url) => this.__request(name, this.__api(url, 'put', data), use_cache))
  }

  path (name, path = []) {
    let url = this.api[name];
    if (path.length) {
      url = url.replace(/\/+$/, '') + '/' + path.join('/')
    }
    return {
      post: (data, use_cache) => this.__request(name, this.__api(url, 'post', data), use_cache),
      get: (data, use_cache) => this.__request(name, this.__api(url, 'get', data), use_cache),
      put: (data, use_cache) => this.__request(name, this.__api(url, 'put', data), use_cache),
      options: function (config, use_cache) {
        config.url = url;
        return this.options(name, config, use_cache)
      }.bind(this)
    }
  }

  config (config) {
    let conf = this.__config(config);
    return {
      post: (name, data, use_cache) => this.__check(name, (url) => this.__request(name, conf(url, 'post', data), use_cache)),
      get: (name, data, use_cache) => this.__check(name, (url) => this.__request(name, conf(url, 'get', data), use_cache)),
      put: (name, data, use_cache) => this.__check(name, (url) => this.__request(name, conf(url, 'put', data), use_cache)),
    }
  }

  options (name, config = {}, use_cache) {
    return this.__check(name, url => {
      return this.__request(name, {
        url,
        ...config,
      }, use_cache)
    })
  }

  // 全局请求，待定。
  global (name, data = {}, config = {}, use_cache = true) {
    let url = this.global_api[name];
    if (name === 'upload') {
      config.timeout = 0;
    }
    return this.__request('global_cache_' + name, this.__api(url, 'post', data, config), use_cache).then(res => {
      this.global_res[name] = res;
      return res;
    });
  }
}

export default (name, api) => {
  return new Request(name, api);
}
