import {request} from "./require";

export function getHomeMutidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}