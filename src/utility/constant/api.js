const basePath = process.env.REACT_APP_API_PATH
const gtcCustomer = 'GTIKIT/GTCustomer'
export const APIPath = {
    server: basePath,

    // auth
    login: `Users/ValidateProviderToken`,
    register: `${gtcCustomer}/Register`,
    verifyCode: `${gtcCustomer}/Verifycode`,
    sendOTP: `${gtcCustomer}/SendOTP`, // "Email": email
    update: `${gtcCustomer}/Update`,

    // Event
    getEvent: `GTEvent`,
    getEventDetails: `GTEvent`,
    getUpcomingEvent: `GTUpcomingPublicEvent`,
    getEventBanner: `GTEventBanner`,
    getPublicEvent: `GTPublicEvent`,
    getPublicEventDetails: `GTPublicEvent/Detail`,
    addEvent: `${gtcCustomer}/GTEvents`,
    favoriteEvents: 'GTCustomer/Events/Favorite',
    addPlaces: 'GTIKIT/GTEventPlace/Addresses',
    addCutomerAddress: 'GTIKIT/GTCustomer/Addresses',
    removeImage: 'GTEvent/EventImage/Remove',
    removeFaq: 'GTEvent/EventFAQ/Remove',
    removeTC: 'GTEvent/EventTC/Remove',
    updateImage: 'GTEvent/EventImage',
    updateFaq: 'GTEvent/EventFAQ/Update',
    updateTC: 'GTEvent/EventTC/Update',
    addFaq: 'GTEvent/EventFAQ',
    addTc: 'GTEvent/EventTC',
    updateTicket: 'GTEvent/EventTicket/Update',
    addTicket: 'GTEvent/EventTicket',
    removeTicket: 'GTEvent/EventTicket/Remove',
    removeSeat: 'GTEvent/Seat/Remove',
    defaultTc: 'GTEvent/EventTCDefault',
    defaultFAQ: 'GTEvent/EventFAQDefault',
    addFavoriteEvent: 'GTCustomer/CustomerFavorite',
    removeFavoriteEvent: 'GTCustomer/CustomerFavorite/Remove',
    searchEvent: 'GTIKIT/GTCustomer/Search',
    orderTicket: "GTEvent/DisplayOrder",

    // Sold Ticket
    myEvent: 'Provider/Events',
    getSoldTicketsByType: 'Provider/Event/SoldTicket/TicketType',
    getSoldTicketsByBuyer: 'Provider/Event/SoldTicket/Buyer',
    ticketCheckInOut: 'Provider/Event/Buyer/Checkin',
    refundTicket: 'Provider/Customer/Refund',
    getSoldTicketsBuyerDetails: 'Provider/Event/SoldTicket/Buyer/FullDetail',
    // Ticket
    myTickets: 'GTCustomer/MyTickets',
    myPurchase: 'GTCustomer/MyPurchase',
    selectTicket: 'GTCustomer/SelectedTicket',
    selectSeat: 'GTCustomer/SelectedSeat',
    orderSummary: 'GTCustomer/OrderSummary',
    applyCoupon: 'GTCustomer/ApplyCoupon',
    bookNow: 'GTCustomer/BookNow',
    orderConfirmation: 'GTCustomer/v2/OrderConfirmation',
    orderFreeConfirmation: 'GTCustomer/FreeEvent/OrderConfirmation',
    ticketStatus: 'GTCustomer/TicketStatus',
    //  Seats
    retrieveSeat: 'GTCustomer/Event/RetrieveSeat',
    bookSeat: 'GTCustomer/Event/bookseat',
    releaseSeat: 'GTCustomer/Event/releaseseat',
    holdSeat: 'GTCustomer/Event/HoldSeat',

    //
    getCountry: 'GTIKIT/Country',
    getState: 'GTIKIT/State',
    getEventProvider: 'GTEvent/EventProvider',
    posteventProvider: 'GTEvent/EventProvider',
    getLanguage: 'GTIKIT/GTCustomer/GetLanguage',
    getCategory: 'GTIKIT/EventCategory',
    getImageCategory: 'GTIKIT/GTEventImageCategory',
    getEventPlace: 'GTIKIT/GTEventPlace',
    getTimeZone: 'GTIKIT/StateTimeZone',

    // team member
    getTeam: 'Provider/Team',
    inviteTeamMember: 'Provider/Team/InviteMember',
    assignMemberToEvents: 'Provider/Team/AllowEvents',
    assignTeamToEvent: 'Provider/Event/AllowMembers',
    removeMember: 'Provider/Team/Remove',
    getEventsForMember: 'Provider/Team/Member/Events',
    getRole: 'Provider/Team/role',

    // offers
    getOffers: 'Offer/TopOffer',
    getOffersCategory: 'Offer/OfferCategory',
    getTopOffers: 'Offer/TopOffer',
    getOfferDetails: 'Offer/Detail',
    getOfferSpotLight: 'Offer/SpotLight',
    getWithSearch: 'Offer/Search',

    addOfferCart: 'Offer/Cart',
    removeCartItem: 'Offer/Cart/Remove',
    offerbuynow: 'Offer/BuyNow',
    orderConfirm: 'Offer/Order',
    offerTerms: "Offer/Terms",

    // web user
    webuser: `Users`,
    role: `UserRole`,

    sponsers: "Provider/Sponsors",
    sponsersTicketType: "Provider/Sponser/TicketType",
    sponsersTickets: "Provider/SponserTicket",
    // Participants
    participation: `User/Participation`,

    // Logging
    logging: `ErrorLogging`,

    getSignedURL: `/Events/Media`,

    getPublicKey: `PublicKey`,
    contactUs: `GTIKIT/ContactUs`,
}
