import {request} from './request'

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

//把从服务器请求过来的复杂数据封装成一个对象
//商品对象
export class Goods{
  //构造函数
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowprice

  }
}
//商家店铺对象
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}
//商品参数信息
export class GoodsParam{
  constructor(info,rule){
    this.image= info.image ? info.image[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}