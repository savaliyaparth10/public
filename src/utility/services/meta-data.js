import { APIPath, CommonUtility } from 'utility'
import { BaseService } from './base'

class MetaData {

    getCountry() {
        return BaseService.get(`${APIPath.getCountry}`)
    }

    getState(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getState}?${data}`)
    }

    getLanguage() {
        return BaseService.get(`${APIPath.getLanguage}`)
    }

    getCategory() {
        return BaseService.get(`${APIPath.getCategory}`)
    }

    getEventProvider() {
        return BaseService.get(`${APIPath.getEventProvider}`)
    }

    postEventProvider(data) {
        return BaseService.post(`${APIPath.posteventProvider}`, data)
    }

    getEventPlace(id,search) {
        const url = APIPath.getEventPlace + (id ? `?countrycode=${id}` : "") + (search ? `&SearchText=${search}` : "")
        return BaseService.get(url)
    }

    getImageCategory() {
        return BaseService.get(`${APIPath.getImageCategory}`)
    }

    getTimeZone(id) {
        const url = APIPath.getTimeZone + (id ? `?countrycode=${id}` : "")
        return BaseService.get(url)
    }
}

const MetaDataService = new MetaData()
Object.freeze(MetaDataService)
export { MetaDataService }
