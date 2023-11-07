import { CommonUtility, APIPath } from 'utility'
import { BaseService } from './base'

class Offers {
    getAllOffers(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getOffers}?${data}`)
    }

    getOffersCategory(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getOffersCategory}?${data}`)
    }

    getTopOffers(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getTopOffers}?${data}`)
    }

    getOfferDetails(id) {
        return BaseService.get(`${APIPath.getOfferDetails}?OfferId=${id}`)
    }

    getSpotLights(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getOfferSpotLight}?${data}`)
    }

    searchOffer(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getWithSearch}?${data}`)
    }

    addFavoriteEvent(FavId) {
        return BaseService.post(APIPath.addFavoriteEvent, {
            FavId,
            TableSource: 'OFFER',
        })
    }

    removeFavoriteEvent(FavId) {
        return BaseService.post(APIPath.removeFavoriteEvent, {
            FavId,
            TableSource: 'OFFER',
        })
    }

    getTermsAndCondition(id) {
        return BaseService.get(`${APIPath.offerTerms}?productBucketId=${id}`)
    }
}

const OffersService = new Offers()
Object.freeze(OffersService)
export { OffersService }
