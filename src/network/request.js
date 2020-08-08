import axios from 'axios'


export function request(config) {
  //1、 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout:5000
  })

  //2、 使用请求拦截
  instance.interceptors.request.use(config =>{
    return config
  }, error => {console.log(error);})

  // 3、 使用响应拦截
  instance.interceptors.response.use(res =>{
    return res.data
  },error=>{console.log(error)})

  // 发送真正的网络请求
  return instance(config)
}