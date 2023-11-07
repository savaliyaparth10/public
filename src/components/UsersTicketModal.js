import React from 'react'
import styled from 'styled-components'
import { Loader } from './Loader'

const UsersTicketMain = styled.div`
    padding: 2rem 0rem;
    .tickets-main {
        padding: 0rem 2rem;
        .ticket {
            width: 100%;
            background: #242631;
            border-radius: 14px;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-right: 8px solid #ff384e;
            margin-bottom: 1rem;
            .user-ticket-details {
                display: flex;
                align-items: center;
                .check-in-out-btn {
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    border: 0;
                    font-weight: 600;
                    font-size: 12px;
                    width: 100px;
                    cursor: pointer;
                    text-align: center;
                }
                .check-in-btn {
                    background: #34c053;
                }
                .check-out-btn {
                    background: #ff384e;
                }
            }
            .user-profile {
                width: 50px;
                height: 50px;
                margin-right: 0.5rem;
                img {
                    border-radius: 10px;
                    width: 100%;
                }
            }
        }
        .check-in {
            border-right: 8px solid #34c053;
        }
    }
    .ticket-price-details {
        background: #242631;
        border-radius: 20px;
        padding:2rem;
        margin: 0rem 2rem 1rem;
        .details{
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            .title{

            }
            span{
                text-align: right;
                color:#8A8A8A;

            }
        }
        .refund-btn{
            margin-top: 1rem;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            border: 0;
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            background: #ff384e;
        }
    }
`
const UsersTicketModal = ({ data, checkInOut, refundTicket, loader }) => {
    return (
        <UsersTicketMain className="users-ticket-modal">
            <div className="tickets-main">
                {data?.CheckInDetail.map((ticket) =>
                    <div key={`detail-${ticket.QRCodeId}`} className={`ticket ${ticket.Checkin && 'check-in'}`}>
                        <div className="user-ticket-details w-100">
                            <div className="user-profile">
                                <img src="https://robohash.org/12?set=set3" alt="" />
                            </div>
                            {/* <div className="ticket-name">{ticket.BuyerName || ticket.BuyerEmail}</div> */}
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="ticket-name">{ticket.TicketType}</div>
                                <div
                                    className={`check-in-out-btn ${ticket.Checkin ? 'check-out-btn' : 'check-in-btn'}`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        checkInOut(ticket.QRCodeId, !ticket.Checkin)
                                    }}>
                                    {ticket.Checkin ? 'Check Out' : 'Check In'}
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>
            <div className="ticket-price-details">
                <div className="details">
                    <div className="title">Event</div>
                    <span>{data?.TicketDetail?.EventName}</span>
                </div>
                <div className="details">
                    <div className="title">Payment Method</div>
                    <span>{data?.TicketDetail?.PaymentMethod}</span>
                </div>
                <div className="details">
                    <div className="title">Total Ticket</div>
                    <span>{data?.TicketDetail?.TotalTicket}</span>
                </div>
                <div className="details">
                    <div className="title">Total Amount</div>
                    <span>${data?.TicketDetail?.FinalPrice}</span>
                </div>
                <div
                    className="refund-btn"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        refundTicket(data.TicketDetail.TicketBucketId);
                    }}>
                    REFUND
                </div>
            </div>
            <Loader loading={loader} />
        </UsersTicketMain>
    )
}

export default UsersTicketModal