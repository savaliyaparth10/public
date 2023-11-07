import React from 'react'
import { Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DateUtility, DayJSDateFormat } from 'utility'
import styled from 'styled-components'

const TicketModalMain = styled.div`
    padding: 10px;
    overflow-x: visible !important;
    .qr-ticket {
        border-bottom: 1px dotted #8a8a8a;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
    }
    .qr-ticket:last-child {
        margin-bottom: 0rem;
        border-bottom: none;
        padding-bottom: 0rem;
    }

    .final-ticket-head {
        font-weight: 700;
        font-size: 22px;
        margin: 50px auto 20px auto;
        max-width: 670px;
    }
    .qr-code-main {
        display: flex;
        flex-direction: column;
    }
    .qr-code-main .ant-space {
        display: grid;
        place-content: center;
    }
    .ant-space .ant-space-item {
        display: grid;
        place-content: center;
    }
    .ant-space-item .ant-qrcode {
        background-color: transparent;
    }
    .ant-space-item .ant-input {
        display: none !important;
    }
    .ant-space-item .sub-text {
        font-weight: 400;
        font-size: 16px;
        color: #8a8a8a;
    }
    .ant-space-item .text {
        font-weight: 600;
        font-size: 18px;
        text-align: center;
    }
    .line-main {
        display: flex;
        align-items: center;
        margin-top: 50px;
    }
    .middle-portion {
        width: 100%;
        display: grid;
        place-items: center;
    }
    .line {
        border-bottom: 2px dashed #8a8a8a;
        width: 80%;
        transform: translate(0%, -15px);
    }
    .ticket-no {
        background: #191a22;
        border-radius: 6px;
        width: 110px;
        padding: 5px;
        z-index: 1;
        text-align: center;
    }
    .final-ticket-details-main {
        margin-top: 25px;
        padding-left: 100px;
    }
    .final-ticket {
        margin-bottom: 20px;
    }
    .full-name,
    .payment-method,
    .event-name,
    .locations-name,
    .date-time,
    .ticket-type {
        font-weight: 600;
        font-size: 16px;
        text-transform: uppercase;
        color: #8a8a8a;
        margin-bottom: 3px;
    }
    .name,
    .method,
    .event,
    .location,
    .time,
    .types {
        font-weight: 600;
        font-size: 18px;
    }
    .ticket-group-section {
        display: flex;
        max-width: 670px;
        overflow-y: auto;
        margin: 0 auto;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        .final-ticket-head {
            margin-left: 10px;
        }
        .ticket-group-section {
            display: flex;
            max-width: 480px;
            overflow: auto;
            margin: 0 auto;
        }
        .final-ticket-details-main {
            padding-left: 50px;
            padding-right: 20px;
        }
        .name,
        .method,
        .event,
        .location,
        .time,
        .types {
            font-size: 14px;
        }
        .full-name,
        .payment-method,
        .event-name,
        .locations-name,
        .date-time,
        .ticket-type {
            font-size: 14px;
        }
        .shape-1 {
            transform: translate(-15px, 0%);
        }
        .shape-2 {
            transform: translate(15px, 0%);
        }
    }

    @media (min-width: 481px) and (max-width: 768px) {
        overflow-x: visible;
        .ticket-group-section {
            display: flex;
            max-width: 768px;
            overflow: auto;
            margin: 0 auto;
        }
        .summary-main {
            padding: 0;
            min-width: calc(100% - 20px);
            margin-right: 10px;
        }

        .shape-1 {
            transform: translate(-15px, 0%);
        }
        .shape-2 {
            transform: translate(15px, 0%);
        }

        .name,
        .method,
        .event,
        .location,
        .time,
        .types {
            font-size: 14px;
        }
        .full-name,
        .payment-method,
        .event-name,
        .locations-name,
        .date-time,
        .ticket-type {
            font-size: 14px;
        }
    }
`
const QRCode = styled.img`
    width: 12rem;
    margin-bottom: 1rem;
`
const BtnGroup = styled.div`
    margin-top: 20px;
    position: sticky;
    bottom: 10px;
    z-index: 99;
    .direction-btn {
        width: 100%;
        margin-bottom: 100px;
        padding: 12px;
        background: #ff384e;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;
    }
`
export const TicketModal = ({ order }) => {
    const navigate = useNavigate()
    const goToDirection = () => {
        navigate('map/:ticketBucketId')
    }
    return (
        <>
            <TicketModalMain className="order-modal-main">
                {order?.QRCode?.map((items, i) => (
                    <div
                        className="row qr-ticket"
                        key={`items-${items.TicketType}-${i}`}
                    >
                        <div className="col-12 qr-code-main">
                            <Space align="center" className="qr-code">
                                <QRCode src={items.QRCodeLocation} alt="" />
                                <div className="text">QR Code</div>
                                <div className="sub-text">
                                    Scan with the receptionist
                                </div>
                            </Space>
                            <div className="line-main">
                                <div className="middle-portion">
                                    <div className="ticket-no">
                                        Ticket {i + 1} of {order.QRCode.length}
                                    </div>
                                    <div className="line" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 final-ticket-details-main">
                            <div className="row final-ticket-details">
                                <div className="col-6 final-ticket">
                                    <div className="full-name">Full name</div>
                                    <div className="name">{order.FullName}</div>
                                </div>
                                <div className="col-6 final-ticket">
                                    <div className="payment-method">
                                        Payment via
                                    </div>
                                    <div className="method">
                                        {order.PaymentMethod}
                                    </div>
                                </div>
                                <div className="col-6 final-ticket">
                                    <div className="event-name">Event</div>
                                    <div className="event">
                                        {order.EventName}
                                    </div>
                                </div>
                                <div className="col-6 final-ticket">
                                    <div className="locations-name">
                                        Location
                                    </div>
                                    <div className="location">
                                        {order.EventLocaiton || '-'}
                                    </div>
                                </div>
                                <div className="col-6 final-ticket">
                                    <div className="date-time">Date & Time</div>
                                    <div className="time">
                                        {' '}
                                        {DateUtility.getDateTime(
                                            order.EventDate,
                                            DayJSDateFormat.dateTime,
                                        )}
                                    </div>
                                </div>
                                <div className="col-6 final-ticket">
                                    <div className="ticket-type">
                                        Ticket type
                                    </div>
                                    <div className="types">
                                        {' '}
                                        {items.TicketType}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </TicketModalMain>
            <BtnGroup>
                <div className="direction-btn" onClick={goToDirection}>
                    <span>Go direction</span>
                </div>
            </BtnGroup>
        </>
    )
}
