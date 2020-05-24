import axios from 'axios'

export function request (config) {
  const interce = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 15000
  })
  // axios请求拦截器
  interce.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 2.2、Axios的响应拦截器
  interce.interceptors.response.use(result => {
    // 可以过滤掉我们不需要的内容
    return result.data
  }, err => {
    console.log(err)
  })

  return interce(config)
}
