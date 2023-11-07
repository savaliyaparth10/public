import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Space } from 'antd'
import styled from 'styled-components'
import { Loader } from 'components'
import { DateUtility, DayJSDateFormat } from 'utility'
import { OrderSummary } from 'hooks'
import wallet from '../../assets/GoogleWallet.png'

const FinalTicketMain = styled.div`
    .final-ticket-head {
        font-weight: 700;
        font-size: 22px;
        margin: 50px auto 0px auto;
        max-width: 670px;
        .message {
            padding-top: 0;
            font-weight: 400;
            font-size: 16px;
            color: ${({ theme }) => theme.colors.success};
            margin: 0px auto 30px auto;
        }
        .processing {
            padding-top: 0;
            font-weight: 400;
            font-size: 16px;
            color: ${({ theme }) => theme.colors.warning};
            margin: 0px auto 30px auto;
        }
    }
    .summary-main {
        background: #242631;
        border-radius: 14px;
        min-width: 600px;
        padding: 20px;
        margin-bottom: 20px;
        margin-right: 20px;
    }
    .qr-code-main {
        display: flex;
        flex-direction: column;
    }
    .qr-code-main .ant-space {
        padding: 20px;
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
        width: 94%;
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
     {
        .shape-1 {
            transform: translate(-30px, 0%);
        }
        .shape-2 {
            transform: translate(30px, 0%);
        }
    }
    .shape-1,
    .shape-2 {
        width: 26px;
        height: 26px;
        background-color: #161d2a;
        border-radius: 50%;
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
    .btn-group {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .direction-btn {
        width: 220px;
        margin-left: 5px;
        margin-bottom: 100px;
        padding: 12px;
        background: #ff384e;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;
    }
    .home-btn {
        width: 220px;
        margin-right: 5px;
        margin-bottom: 100px;
        padding: 12px;
        background: #282935;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;
    }
    .ticket-group-section {
        display: flex;
        max-width: 670px;
        overflow-y: auto;
        margin: 0 auto;
    }
    .error {
        text-align: center;
        font-size: 20px;
        margin-top: 50px;
        margin-bottom: 50px;
        color: ${({ theme }) => theme.colors.danger};
    }
    @media (min-width: 200px) and (max-width: 480px) {
        .final-ticket-head {
            margin: 20px auto 20px auto;
        }
        .ticket-group-section {
            display: flex;
            max-width: 480px;
            overflow: auto;
            margin: 0 auto;
        }

        .summary-main {
            padding: 0;
            min-width: calc(100% - 20px);
            margin-right: 10px;
        }
        ${
            '' /* .middle-portion {
            overflow-x: visible !important;
            overflow-y: visible !important;
        } */
        }
        .ticket-no {
            ${'' /* transform: translate(0%, 30%); */}
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
`

export const TicketDetailScreen = () => {
    const { ticketBucketId } = useParams()
    const { data, loading } = OrderSummary(ticketBucketId)
    const navigate = useNavigate()
    const goToDirection = () => {
        navigate(
            `/ticket/map/${ticketBucketId}?lat=${data.Latitude}&long=${data.Longitude}`,
        )
    }
    const goToHome = () => {
        navigate(`/`)
    }
    return (
        <FinalTicketMain className="container">
            <div className="final-ticket-head">
                <p> Ticket Summary</p>
                {loading && !data?.QRCode && (
                    <p className="processing">
                        Hang tight! Our team is searching high and low to secure
                        the perfect tickets for your event
                    </p>
                )}
                {data?.QRCode && (
                    <p className="message">
                        Thank you for purchasing a ticket(s) to the event. You
                        will receive an email with your event ticket details
                        shortly. Please check your inbox in the next few
                        minutes. If you have any questions or need further
                        assistance, please feel free to contact us
                        (support@gtikit.com). Enjoy the event!
                    </p>
                )}
            </div>
            <div className="ticket-group-section">
                {data?.QRCode?.map((ticket, idx) => (
                    <div
                        key={`ticket-${ticket.TicketType}-${idx}`}
                        className="summary-main"
                    >
                        <div className="row">
                            <div className="col-12 qr-code-main">
                                <Space className="qr-code" align="center">
                                    <QRCode
                                        src={ticket.QRCodeLocation}
                                        alt={ticket.TicketType}
                                    />
                                    <div className="text">QR Code</div>
                                    <div className="sub-text">
                                        Scan with the receptionist
                                    </div>
                                    <div className="col-12 d-flex justify-content-center">
                                    <div className=" col-12 cursor-pointer">
                                        <img src={wallet} alt="" className="col-12" />
                                    </div>
                                </div>
                                </Space>
                                <div className="line-main">
                                    <div className="shape-1" />
                                    <div className="middle-portion">
                                        <div className="ticket-no">
                                            Ticket {idx + 1} of{' '}
                                            {data.QRCode.length}
                                        </div>
                                        <div className="line" />
                                    </div>
                                    <div className="shape-2" />
                                </div>
                            </div>
                            <div className="col-12 final-ticket-details-main">
                                <div className="row final-ticket-details">
                                    <div className="col-6 final-ticket">
                                        <div className="full-name">
                                            Full name
                                        </div>
                                        <div className="name">
                                            {data.FullName}
                                        </div>
                                    </div>
                                    <div className="col-6 final-ticket">
                                        <div className="payment-method">
                                            Payment via
                                        </div>
                                        <div className="method">
                                            {data.PaymentMethod}
                                        </div>
                                    </div>
                                    <div className="col-6 final-ticket">
                                        <div className="event-name">Event</div>
                                        <div className="event">
                                            {data.EventName}
                                        </div>
                                    </div>
                                    <div className="col-6 final-ticket">
                                        <div className="locations-name">
                                            Location
                                        </div>
                                        <div className="location">
                                            {data.EventLocaiton}
                                        </div>
                                    </div>
                                    <div className="col-6 final-ticket">
                                        <div className="date-time">
                                            Date & Time
                                        </div>
                                        <div className="time">
                                            {DateUtility.getDateTime(
                                                data.EventDate,
                                                DayJSDateFormat.dateTime,
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6 final-ticket">
                                        <div className="ticket-type">
                                            Ticket type
                                        </div>
                                        <div className="types">
                                            {ticket.TicketType}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!loading && !data?.QRCode?.length && (
                <div className="error">
                    Something went wrong please try again later.
                </div>
            )}
            <div className="btn-group">
                <div className="home-btn" onClick={goToHome}>
                    <span>Go to Home</span>
                </div>
                {!loading && !!data?.QRCode?.length && (
                    <div className="direction-btn" onClick={goToDirection}>
                        <span>Go direction</span>
                    </div>
                )}
            </div>
            <Loader loading={loading} />
        </FinalTicketMain>
    )
}
