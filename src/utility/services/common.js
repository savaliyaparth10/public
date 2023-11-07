import { APIPath } from 'utility'
import { BaseService } from './base'

class Common {
    contactUs(reqData) {
        return BaseService.post(APIPath.contactUs, reqData)
    }
}

const CommonService = new Common()
Object.freeze(CommonService)
export { CommonService }