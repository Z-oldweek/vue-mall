import {request} from './request'


//请求首页数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}