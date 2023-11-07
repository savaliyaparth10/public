import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AddIcon from '../../assets/Icons/add.svg'
import styled from 'styled-components'
import MinusIcon from '../../assets/Icons/minus.svg'
import '../../screens/Css/BuyTicketModal.css'
import { PushNotification } from '../../components/Common'
import { NotificationStatus, NotificationText, TicketService } from 'utility'
import { GetPublicEventDetails } from 'hooks'
import { Loader } from 'components'
import { BrowserUtility } from 'utility/browser-utility'
import { Skeleton } from 'antd'

const TicketMain = styled.div`
    padding-top: 50px;
    width: 77%;
    margin: 0 auto 100px;
    .heading-main {
        display: flex;
        margin: 0px auto 20px;
        width: 77%;
        justify-content: space-between;
        align-items: center;
    }
    .heading {
        font-weight: 700;
        font-size: 22px;
        padding-bottom: 10px;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        padding-top: 20px;
        .heading-main {
            margin: 0px 10px;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
        padding-top: 20px;
        .heading-main {
            margin: 0px 10px;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
    }
    @media (min-width: 769px) and (max-width: 1000px) {
        padding-top: 25px;
        .heading-main {
            margin: 0px 45px;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
    }
    @media (min-width: 1001px) and (max-width: 1200px) {
        .heading-main {
            margin: 0px 10px;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
    }
`
const ModalContainer = styled.div`
    overflow-x: visible;
    width: 77%;
    border-radius: 20px;
    margin: 0 auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    .buy-ticket-section {
        border-radius: 20px;
        margin: 0 auto;
        width: 100%;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        width: 100%;
    }
    @media (min-width: 481px) and (max-width: 768px) {
        width: 100%;
    }
    @media (min-width: 769px) and (max-width: 1000px) {
        width: 90%;
    }
    @media (min-width: 1001px) and (max-width: 1200px) {
        width: 100%;
    }
`
const ModalWrapper = styled.div`
    background: #242631;
    border-radius: 14px;
    padding: 13px 20px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-name {
        position: relative;
    }
    .tooltip-text {
        visibility: hidden;
        width: 200px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;

        /* Position the tooltip */
        position: absolute;
        z-index: 1; 
        top: 24px;
        left: 0;
        right: 0;
    }
    .item-name:hover .tooltip-text {
        visibility: visible;
    }
`
const OuterBox = styled.div`
    display: flex;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    padding: 5px;
    align-items: center;
    gap: 12px;
`
const Icon = styled.div`
    width: 34px;
    height: 34px;
    background: rgba(138, 138, 138, 0.3);
    border-radius: 4px;
    display: grid;
    place-items: center;
    cursor: pointer;
`
const SoldTicket = styled.div`
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    min-width: 110px;
    span {
        color: #ff384e;
    }
`
const AddTicketBtn = styled.div`
    padding: 6px 12px;
    background: #ff384e;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    min-width: 110px;
`
const TotalMain = styled.div`
    background: #242631;
    border-radius: 30px 30px 0px 0px;
    padding: 18px 20px;
    margin: 0 auto;
    width: 100%;
`
const TotalFees = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
const Tag = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
`
const Amount = styled.div`
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    opacity: 0.6;
`
const ServiceFees = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 2px dashed #8a8a8a48;
`
const TotalAmount = styled.div`
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
`
const Btn = styled.div`
    .back-btn {
        width: 220px;
        margin-right: 10px;
        padding: 12px 12px;
        background: #4a4c5e;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
    }
    .next-btn {
        width: 220px;
        margin-left: 10px;
        padding: 12px 12px;
        background: #ff384e;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
    }
    @media (min-width: 200px) and (max-width: 768px) {
        .back-btn {
            width: 350px;
            margin-right: 0px;
            margin-bottom: 10px;
            margin-top: 20px;
        }
        .next-btn {
            width: 350px;
            margin-left: 0px;
        }
    }
`
export const BuyTicketScreen = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, loading: eventLoading } = GetPublicEventDetails(id)
    const { EventTicketRate: ticketRate } = data
    const [tickets, setTicket] = useState({})
    const [loading, setLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [serviceFees, setServiceFees] = useState(0)
    const addTicket = (ticket, qty) => {
        let tmp = tickets[ticket.EventTicketId] || {
            EventTicketId: ticket.EventTicketId,
            TicketPrice: ticket.TicketPrice,
            ServiceFee: ticket.ServiceFee,
            MaxPerOrder: ticket.MaxPerOrder,
            TicketQty: ticket.TicketQty,
            IsSeatOption: ticket.IsSeatOption,
            Qty: 0,
        }
        tmp.Qty += qty
        if (tmp.Qty === 0) {
            tmp = null
        } else if (tmp.Qty > tmp.TicketQty) {
            tmp.Qty = tmp.TicketQty
        }
        if (tmp && tmp.Qty > tmp.MaxPerOrder) {
            tmp.Qty = tmp.MaxPerOrder
        }
        setTicket({ ...tickets, [ticket.EventTicketId]: tmp })
    }
    const clickOnNext = async () => {
        const data = Object.values(tickets || {}).filter(d => d)
        if (data.length === 0) return;
        const IsSeatOption = data.filter(d => d.IsSeatOption).length > 0;
        const params = data.map(ticket => ({
            EventTicketId: ticket.EventTicketId,
            Qty: ticket.Qty,
        }))
        setLoading(true)
        try {
            const result = await TicketService.selectTicket(params)
            const { TicketBucketId } = result.Result
            setLoading(false)
            if (IsSeatOption) {
                BrowserUtility.saveObj(`event-ticket-rate-${id}`, ticketRate)
                navigate(`/ticket/select-seats/${TicketBucketId}`)
            } else {
                BrowserUtility.remove(`hold-token-${id}`)
                navigate(`/ticket/confirmation/${TicketBucketId}`)
            }
        } catch (error) {
            console.log(error)
            PushNotification(
                error?.error?.ErrorMessage || NotificationText.defaultError,
                NotificationStatus.error,
            )
            setLoading(false)
        }
    }
    const clickOnBack = () => {
        navigate(-1)
    }
    const onNext = () => {
        const data = Object.values(tickets || {}).filter(d => d)
        if (data.length > 0) clickOnNext(data)
        else PushNotification('Please select ticket', NotificationStatus.error)
    }
    useEffect(() => {
        const data = BrowserUtility.getObj('selected-tickets')
        setTicket(data || {})
    }, [])
    useEffect(() => {
        const price = Object.values(tickets || {}).reduce(
            (a, b) => a + (b ? b.Qty * b.TicketPrice : 0),
            0,
        )
        const fees = Number(
            Object.values(tickets || {})
                .reduce((a, b) => a + (b ? b.Qty * b.ServiceFee : 0), 0)
                .toFixed(2),
        )
        setTotalPrice(price)
        setServiceFees(fees)
        BrowserUtility.saveObj('selected-tickets', tickets)
    }, [tickets])
    if (eventLoading) return <BuyTicketSkeleton />
    return (
        <TicketMain>
            <div className="heading-main">
                <div className="heading">Ticket Summary</div>
            </div>
            <ModalContainer>
                <div className="row buy-ticket-section">
                    {ticketRate?.map(ticket => (
                        <div
                            key={`${ticket.EventTicketId}`}
                            className="col-sm-12 col-md-6"
                        >
                            <ModalWrapper>
                                <div className="item">
                                    <div className="item-name">
                                        {' '}
                                        {ticket.TicketType}{ticket.TicketDescription && <>
                                            <span className="font-grey">&nbsp;{' - '}&nbsp;{ticket.TicketDescription}</span>
                                        </>}
                                    </div>
                                    <div className="item-price">
                                        {' '}
                                        $ <span>{ticket.TicketPrice}</span>{' '}
                                    </div>
                                </div>
                                {tickets[ticket.EventTicketId] && (
                                    <div className="qty-selector">
                                        <OuterBox>
                                            <Icon>
                                                <img
                                                    src={MinusIcon}
                                                    onClick={() => {
                                                        addTicket(ticket, -1)
                                                    }}
                                                    alt=""
                                                />
                                            </Icon>
                                            <span>
                                                {' '}
                                                {
                                                    tickets[
                                                        ticket.EventTicketId
                                                    ].Qty
                                                }{' '}
                                            </span>
                                            <Icon>
                                                <img
                                                    src={AddIcon}
                                                    onClick={() => {
                                                        addTicket(ticket, 1)
                                                    }}
                                                    alt=""
                                                />
                                            </Icon>
                                        </OuterBox>
                                    </div>
                                )}
                                {!tickets[ticket.EventTicketId] && (
                                    ticket.TicketQty <= 0 ? (
                                        <SoldTicket>
                                            <span>Sold Out</span>
                                        </SoldTicket>
                                    ) : (
                                        <AddTicketBtn
                                            onClick={() => addTicket(ticket, 1)}
                                        >
                                            <span>Add Ticket</span>
                                        </AddTicketBtn>
                                    )
                                )}
                            </ModalWrapper>
                        </div>
                    ))}
                </div>
                <TotalMain>
                    <TotalFees>
                        <Tag>Total fees</Tag>
                        <Amount>$ {totalPrice}</Amount>
                    </TotalFees>
                    <ServiceFees>
                        <Tag>Service fees</Tag>
                        <Amount>$ {serviceFees}</Amount>
                    </ServiceFees>
                    <TotalAmount>
                        <Tag>Total amount</Tag>
                        <Amount>$ {totalPrice + serviceFees}</Amount>
                    </TotalAmount>
                    <Btn className="row justify-content-center pt-2">
                        <div className="back-btn" onClick={clickOnBack}>
                            <span>Back</span>
                        </div>
                        <div className="next-btn" onClick={onNext}>
                            <span>Next</span>
                        </div>
                    </Btn>
                </TotalMain>
                <Loader loading={loading} />
            </ModalContainer>
        </TicketMain>
    )
}

const BuyTicketSkeleton = () => {
    return (
        <TicketMain>
            <div className="heading-main">
                <div className="heading">Ticket Summary</div>
            </div>
            <ModalContainer>
                <div className="row buy-ticket-section">
                    <TicketSkeleton />
                    <TicketSkeleton />
                </div>
                <PriceSummarySkeleton />
            </ModalContainer>
        </TicketMain>
    )
}
const TicketSkeleton = () => {
    return (
        <div className="col-sm-12 col-md-6">
            <ModalWrapper>
                <div className="item">
                    <Skeleton.Input active />
                </div>
                <Skeleton.Button active />
            </ModalWrapper>
        </div>
    )
}
const PriceSummarySkeleton = () => {
    return (
        <TotalMain>
            <TotalFees>
                <Skeleton.Input active />
                <Skeleton.Input active />
            </TotalFees>
            <ServiceFees>
                <Skeleton.Input active />
                <Skeleton.Input active />
            </ServiceFees>
            <TotalAmount>
                <Skeleton.Input active />
                <Skeleton.Input active />
            </TotalAmount>
            <Btn className="row justify-content-center pt-2">
                <div className="back-btn">
                    <Skeleton.Input active />
                </div>
                <div className="next-btn">
                    <Skeleton.Input active />
                </div>
            </Btn>
        </TotalMain>
    )
}
