import {request} from "./request";

export function getHomeMutidata() {
  return request({
    url:'home/multidata'
  })
}

export function getHomeGood(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}