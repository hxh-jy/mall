import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  //拦截器
  instance.interceptors.response.use(res => {
    return res.data
  })

  //axios的返回值本身是一个Promise对象
  return instance(config)
}