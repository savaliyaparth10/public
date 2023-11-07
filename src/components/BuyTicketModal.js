import React from 'react'
import styled from 'styled-components'
import '../screens/Css/BuyTicketModal.css'

const ModalContainer = styled.div`
    overflow-x: visible;
    width: 100%;
    border-top: 2px solid #a6a6a669;
`
const ModalWrapper = styled.div`
    margin-top: 24px;
    background: #242631;
    border-radius: 14px;
    padding: 13px 20px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    .item-price{
        color: #a6a6a6;
        width: 80px;
        text-align: right;
        span {
            color: #a6a6a6;
        }
    }
`
export const BuyTicketModal = ({ data }) => {
    const { EventTicketRate: ticketRate } = data
    return (
        <ModalContainer>
            <div className="row">
                {ticketRate?.map(ticket => (
                    <div
                        key={`${ticket.EventTicketId}`}
                        className="col-sm-12 col-md-6"
                    >
                        <ModalWrapper>
                            <div className="item-name">
                                {ticket.TicketType}
                            </div>
                            <div className="item-price">
                                $ <span>{ticket.TicketPrice}</span>
                            </div>
                        </ModalWrapper>
                    </div>
                ))}
            </div>
        </ModalContainer>
    )
}
