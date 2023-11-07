import { CommonUtility, APIPath } from 'utility'
import { BaseService } from './base'

class Events {
    getEvent(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getEvent}?${data}`)
    }

    myEvent(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.myEvent}?${data}`)
    }

    getEventList(filter) {
        const data = CommonUtility.objectToParams(filter)
        return BaseService.get(`${APIPath.getEvent}?${data}`)
    }

    getEventDetails(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getEventDetails}?${data}`)
    }

    getUpcomingEvent(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getUpcomingEvent}?${data}`, null)
    }

    getUpcomingEventList(filter) {
        const data = CommonUtility.objectToParams(filter)
        return BaseService.get(`${APIPath.getUpcomingEvent}?${data}`)
    }

    getEventBanner(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getEventBanner}?${data}`, null)
    }

    getEventBannerList() {
        return BaseService.get(APIPath.getEventBanner)
    }

    getPublicEvent(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getPublicEvent}?${data}`, null)
    }

    getPublicEventDetails(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getPublicEventDetails}?${data}`)
    }

    getPublicEventList(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getPublicEvent}?${data}`)
    }

    searchEvent(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        // const data = `SearchText=&CategoryId=${reqData.CategoryId}&LanguageId=0&TicketType=B`
        return BaseService.get(`${APIPath.searchEvent}?${data}`)
    }

    addEvent(data) {
        return BaseService.post(APIPath.addEvent, data)
    }

    addPlace(data) {
        return BaseService.post(APIPath.addPlaces, data)
    }

    removeEvent(id) {
        return BaseService.post(`GTEvent/${id}/Remove`)
    }

    removeImage(id) {
        return BaseService.post(`${APIPath.removeImage}?ImageId=${id}`)
    }

    addImage(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(APIPath.updateImage, data)
    }

    updateTicket(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(APIPath.updateTicket, data)
    }

    addTicket(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(APIPath.addTicket, data)
    }

    removeTicket(id) {
        return BaseService.post(`${APIPath.removeTicket}?EventTicketId=${id}`)
    }

    removeSeat(id) {
        return BaseService.post(`${APIPath.removeSeat}?SeatId=${id}`)
    }

    getFavoriteEvents(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.favoriteEvents}?${data}`)
    }

    addFavoriteEvent(FavId) {
        return BaseService.post(APIPath.addFavoriteEvent, {
            FavId,
            TableSource: 'EVENT',
        })
    }

    removeFavoriteEvent(FavId) {
        return BaseService.post(APIPath.removeFavoriteEvent, {
            FavId,
            TableSource: 'EVENT',
        })
    }

    orderTicket(data) {
        return BaseService.post(APIPath.orderTicket,data)
    }

    addSponserTicket(data) {
        return BaseService.post(APIPath.sponsersTicketType,data)
    }

    UpdateSponserTicket(data) {
        return BaseService.put(`${APIPath.sponsersTicketType}/update`,data)
    }
}

const EventsService = new Events()
Object.freeze(EventsService)
export { EventsService }
