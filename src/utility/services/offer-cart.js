import { APIPath, CommonUtility } from 'utility'
import { BaseService } from './base'

class OfferCart {
    addToCart(reqData) {
        return BaseService.post(`${APIPath.addOfferCart}`, reqData)
    }

    getCart() {
        return BaseService.get(`${APIPath.addOfferCart}`)
    }

    removeCartItem(buketId, itemid) {
        return BaseService.post(`${APIPath.removeCartItem}?ProductBucketId=${buketId}&ProductIds=${itemid}`)
    }

    buyNow(id) {
        return BaseService.post(`${APIPath.offerbuynow}?ProductBucketId=${id}`)
    }

    getPublicKey(id) {
        return BaseService.get(`${APIPath.getPublicKey}?TicketBucketId=${id}`)
    }

    confirmOrder(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(`${APIPath.orderConfirm}?${data}`)
    }

    getconfirmOrder(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.orderConfirm}?${data}`)
    }
}

const OfferCartService = new OfferCart()
Object.freeze(OfferCartService)
export { OfferCartService }