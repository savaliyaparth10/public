import { APIPath, CommonUtility } from 'utility'
import { BaseService } from './base'

class Ticket {
    myTickets(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.myTickets}?${data}`)
    }

    getSoldTicketsByType(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getSoldTicketsByType}?${data}`)
    }

    getSoldTicketsByTicketId(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getSoldTicketsByType}?${data}`)
    }

    getSoldTicketsBuyerDetails(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getSoldTicketsBuyerDetails}?${data}`)
    }

    TicketCheckInOut(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(`${APIPath.ticketCheckInOut}?${data}`)
    }

    RefundTicket(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(`${APIPath.refundTicket}?${data}`)
    }

    getSoldTicketsByBuyer(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getSoldTicketsByBuyer}?${data}`)
    }

    selectTicket(reqData) {
        return BaseService.post(APIPath.selectTicket, reqData)
    }

    selectSeat(reqData) {
        return BaseService.post(APIPath.selectSeat, reqData)
    }

    orderSummary(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.orderSummary}?${data}`)
    }

    applyCoupon(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(`${APIPath.applyCoupon}?${data}`)
    }

    getPublicKey(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.get(`${APIPath.getPublicKey}?${data}`)
    }

    bookNow(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(`${APIPath.bookNow}?${data}`)
    }

    orderConfirmation(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(`${APIPath.orderConfirmation}?${data}`)
    }

    orderFreeConfirmation(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(`${APIPath.orderFreeConfirmation}?${data}`)
    }

    ticketStatus(reqData) {
        const data = CommonUtility.objectToParams(reqData)
        return BaseService.post(`${APIPath.ticketStatus}?${data}`, reqData)
    }

    retrieveSeat(reqData) {
        return BaseService.post(APIPath.retrieveSeat, reqData)
    }

    bookSeat(reqData) {
        return BaseService.post(APIPath.bookSeat, reqData)
    }

    releaseSeat(reqData) {
        return BaseService.post(APIPath.releaseSeat, reqData)
    }

    holdSeat(reqData) {
        return BaseService.post(APIPath.holdSeat, reqData)
    }

    getSponsersTicket(id) {
        return BaseService.get(`${APIPath.sponsersTickets}?EventId=${id}`)
    }

}

const TicketService = new Ticket()
Object.freeze(TicketService)
export { TicketService }