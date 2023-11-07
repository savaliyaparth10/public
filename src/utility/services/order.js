import { APIPath, CommonUtility } from 'utility'
import { BaseService } from './base'

class Order {
    myOrders(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.myPurchase}?${data}`)
    }

    detail(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.myPurchase}/Detail?${data}`)
    }

}

const OrderService = new Order()
Object.freeze(OrderService)
export { OrderService }