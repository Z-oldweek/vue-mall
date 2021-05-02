import {request} from './request'


//请求首页数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    //参数
    params:{
      type,
      page
    }
  })
}