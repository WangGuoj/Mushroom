import { request } from './request'
//根据iid获取商品详细信息
export function getDetail(iid) {
    return request({
        url: '/detail',
        params:{
            iid
        }
    })
}

//推荐商品信息
export function getRecommend(){
    return request({
        url:'/recommend'
    })
}

//goodsinfo中的杂乱商品信息
export  class GoodsInfo {
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice 
        
     }
}
//店铺信息
export  class Shop {
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}
