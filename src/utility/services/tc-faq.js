import { CommonUtility, APIPath } from 'utility'
import { BaseService } from './base'

class TCFAQ {

    getTCList() {
        return BaseService.get(APIPath.defaultTc)
    }

    getFAQList() {
        return BaseService.get(APIPath.defaultFAQ)
    }

    addTc(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(APIPath.addTc,data)
    }

    updateTC(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(APIPath.updateTC,data)
    }

    removeTC(id) {
        return BaseService.post(`${APIPath.removeTC}?UniqueId=${id}`)
    }

    addFaq(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(APIPath.addFaq,data)
    }

    updateFaq(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(APIPath.updateFaq,data)
    }

    removeFaq(id) {
        return BaseService.post(`${APIPath.removeFaq}?UniqueId=${id}`)
    }
}

const TCFAQService = new TCFAQ()
Object.freeze(TCFAQService)
export { TCFAQService }
