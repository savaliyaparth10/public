import React, { useEffect, useState } from 'react'
import { Modal, Skeleton } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { ApplyCodeModal } from 'components/ApplyCodeModal'
import styled from 'styled-components'
import { BookNow, GetPublicKey, OrderSummary } from 'hooks'
import { Loader, PushNotification } from 'components'
import {
    DateUtility,
    DayJSDateFormat,
    NotificationStatus,
    NotificationText,
    TicketService,
} from 'utility'

const TicketSummaryMain = styled.div`
    padding-top: 50px;
    .heading-main {
        display: flex;
        margin: 0px 150px;
        margin-bottom: 20px;
        justify-content: space-between;
        align-items: center;
    }
    .heading {
        font-weight: 700;
        font-size: 22px;
    }
    .apply-code {
        background: #242631;
        border-radius: 6px;
        color: #ff384e;
        padding: 5px;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
    }
    .ticket-details-main {
        background: #242631;
        border: 1.5px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        width: 77%;
        margin: 0 auto;
        padding: 20px;
    }
    .show-name {
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 20px;
    }
    .show-details {
        display: flex;
        border-bottom: 2px solid #a6a6a64b;
    }
    .person-details,
    .location {
        margin-right: 50px;
    }
    .person-name,
    .location-name,
    .show-date {
        font-weight: 500;
        margin-bottom: 5px;
        font-size: 16px;
        color: #8a8a8a;
    }
    .person,
    .stree-name,
    .show-time {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .seat-details-main {
        display: flex;
        margin-top: 20px;
        align-items: baseline;
    }
    .booked-seat-no {
        margin-left: 40px;
    }
    .head {
        font-weight: 500;
        font-size: 16px;
        color: #8a8a8a;
        margin-bottom: 5px;
    }
    .seat-no,
    .type {
        font-weight: 600;
        font-size: 18px;
    }
    .ticket-total-main {
        background: #242631;
        border-radius: 14px;
        width: 77%;
        margin: 20px auto;
        padding: 40px;
    }
    .total-fees {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .tag {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
    }
    .discount {
        display: inline-flex;
        font-size: 12px;
        padding: 3px 7px;
        margin-left: 10px;
        border-radius: 5px;
        color: ${({ theme }) => theme.colors.grayContent};
        background-color: ${({ theme }) => theme.colors.gray};
    }
    .amount {
        font-weight: 500;
        font-size: 18px;
        color: #ffffff;
        opacity: 0.6;
    }
    .amount span {
        margin-left: 10px;
    }
    .service-fees {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 2px dashed #8a8a8a48;
    }
    .total-amount {
        display: flex;
        margin-top: 10px;
        justify-content: space-between;
    }
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
    .main-price {
        text-decoration-line: line-through;
        color: ${({ theme }) => theme.text.red};
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
        .ticket-details-main {
            width: 100%;
            .show-name {
                font-size: 16px;
            }
            .show-details {
                flex-direction: column;
            }
        }
        .ticket-total-main {
            width: 100%;
        }
        .back-btn {
            width: 350px;
            margin-right: 0px;
            margin-bottom: 10px;
        }
        .next-btn {
            width: 350px;
            margin-left: 0px;
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
        .ticket-details-main {
            width: 100%;
            .show-name {
                font-size: 16px;
            }
            .show-details {
                flex-direction: column;
            }
        }
        .ticket-total-main {
            width: 100%;
        }
        .back-btn {
            width: 350px;
            margin-right: 0px;
            margin-bottom: 10px;
        }
        .next-btn {
            width: 350px;
            margin-left: 0px;
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
        .ticket-details-main {
            width: 90%;
            .show-name {
                font-size: 16px;
            }
        }
        .ticket-total-main {
            width: 90%;
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
        .ticket-details-main {
            width: 100%;
            .show-name {
                font-size: 16px;
            }
        }
        .ticket-total-main {
            width: 100%;
        }
    }
`

// const StripeModal = styled(Modal)`
//     .StripeElement {
//         ${'' /* background-color: #e2e2e2; */}
//         padding: 1rem;
//         margin: 1rem;
//         border-radius: 0.5rem;
//     }
//     .ant-modal-body {
//         padding-bottom: 1.5rem;
//     }
// `
export const TicketSummaryScreen = () => {
    const { ticketBucketId } = useParams()
    const { data, loading, fetchData } = OrderSummary(ticketBucketId)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [bookLoading, setBookLoading] = useState(false)
    const { fetchData: fetchPublicKey } = GetPublicKey(ticketBucketId)
    BookNow(ticketBucketId);
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const clickOnBack = () => {
        navigate(-1)
    }
    const clickOnNext = async () => {
        if (data?.FinalPrice) {
            navigate(`/ticket/payment/${ticketBucketId}`)
        } else {
            try {
                setBookLoading(true)
                const result = await TicketService.orderFreeConfirmation({
                    TicketBucketId: ticketBucketId,
                    CreateSeperateTicket: false,
                })
                if (result.StatusCode === 200) {
                    setBookLoading(false);
                    navigate(`/ticket/summary/${ticketBucketId}`)
                }
            } catch (error) {
                setBookLoading(false);
            }
        }
    }
    const applyCode = async code => {
        try {
            setBookLoading(true)
            handleCancel()
            await TicketService.applyCoupon({
                CouponCode: code,
                TicketBucketId: ticketBucketId,
            })
            fetchData();
        } catch (error) {
            console.log(error)
            PushNotification(
                error?.error?.ErrorMessage || NotificationText.defaultError,
                NotificationStatus.error,
            )
        } finally {
            setBookLoading(false)
        }
    }
    useEffect(() => {
        fetchPublicKey()
    }, [])

    if (loading) return <SummarySkeleton />
    return (
        <>
            <TicketSummaryMain className="container">
                <div className="heading-main">
                    <div className="heading">Ticket Summary</div>
                    {!data?.Discount && (
                        <div className="apply-code" onClick={showModal}>
                            Apply code
                        </div>
                    )}
                </div>
                <div className="ticket-details-main">
                    <div className="show-name">{data?.EventName}</div>
                    <div className="show-details">
                        <div className="person-details">
                            <div className="person-name">Visitor name</div>
                            <div className="person">{data?.FullName}</div>
                        </div>
                        <div className="location">
                            <div className="location-name">Location</div>
                            <div className="stree-name">
                                {data?.EventLocaiton}
                            </div>
                        </div>
                        <div className="day-deatils">
                            <div className="show-date">Date & Time</div>
                            <div className="show-time">
                                {DateUtility.getDateTime(
                                    data?.EventDate,
                                    DayJSDateFormat.dateTime,
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="seat-details-main">
                        <div className="ticket-type">
                            <div className="head">Ticket type</div>
                            {Object.keys(data?.TicketsInfo || {}).map(v => (
                                <div key={`ticket-type-${v}`} className="type">
                                    {v}
                                </div>
                            ))}
                        </div>
                        <div className="booked-seat-no">
                            <div className="head">Booked seat no</div>
                            {Object.values(data?.TicketsInfo || {}).map(
                                (v, i) => (
                                    <div
                                        key={`seat-no-${i}`}
                                        className="seat-no"
                                    >
                                        {v.SeatNos || '-'}
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
                <div className="ticket-total-main">
                    <div className="total-fees">
                        <div className="tag">
                            Total fees{' '}
                            {/* {data?.Discount > 0 && (
                                <span className="discount">
                                    $ {data?.Discount || 0} discount
                                </span>
                            )} */}
                        </div>
                        <div className="amount">
                            {data?.Discount > 0 && (<span className="main-price">$ {(data?.TotalPrice || 0)}</span>)}
                            <span>
                                ${' '}
                                {(data?.TotalPrice || 0) -
                                    (data?.Discount || 0)}
                            </span>
                        </div>
                    </div>
                    <div className="service-fees">
                        <div className="tag">Service fees</div>
                        <div className="amount">
                            <span>$ {data?.ServiceFee || 0}</span>
                        </div>
                    </div>
                    {/* {data?.Discount && (
                        <div className="service-fees">
                            <div className="tag">Discount</div>
                            <div className="amount">
                                <span>- $ {data?.Discount || 0}</span>
                            </div>
                        </div>
                    )} */}
                    <div className="total-amount">
                        <div className="tag">Total amount</div>
                        <div className="amount">
                            {data?.Discount > 0 && (<span className="main-price">$ {(data?.FinalPrice || 0) + (data?.Discount || 0)}</span>)}
                            <span>$ {data?.FinalPrice || 0}</span>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center my-4 pb-4 pt-2">
                    <div className="back-btn" onClick={clickOnBack}>
                        <span>Back</span>
                    </div>
                    <div className="next-btn" onClick={clickOnNext}>
                        <span>Next</span>
                    </div>
                </div>
            </TicketSummaryMain>
            <Modal
                title="Apply coupon code"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={null}
                className="apply-code-modal"
            >
                <ApplyCodeModal applyCode={applyCode} />
            </Modal>
            <Loader loading={bookLoading} />
        </>
    )
}

const SummarySkeleton = () => {
    return (
        <TicketSummaryMain className="container">
            <div className="heading-main">
                <div className="heading">Ticket Summary</div>
            </div>
            <div className="ticket-details-main">
                <div className="show-name"><Skeleton.Input active /></div>
                <div className="show-details">
                    <div className="person-details">
                        <div className="person-name">Visitor name</div>
                        <div className="person"><Skeleton.Input active /></div>
                    </div>
                    <div className="location">
                        <div className="location-name">Location</div>
                        <div className="stree-name">
                            <Skeleton.Input active />
                        </div>
                    </div>
                    <div className="day-deatils">
                        <div className="show-date">Date & Time</div>
                        <div className="show-time"><Skeleton.Input active /></div>
                    </div>
                </div>
                <div className="seat-details-main">
                    <div className="ticket-type">
                        <div className="head">Ticket type</div>
                        <Skeleton.Input active />
                        <Skeleton.Input active />
                    </div>
                    <div className="booked-seat-no">
                        <div className="head">Booked seat no</div>
                        <Skeleton.Input active />
                        <Skeleton.Input active />
                    </div>
                </div>
            </div>
            <PriceSummarySkeleton />
        </TicketSummaryMain>
    )
}
const PriceSummarySkeleton = () => {
    return (
        <>
            <div className="ticket-total-main">
                <div className="total-fees">
                    <Skeleton.Input active />
                    <Skeleton.Input active />
                </div>
                <div className="service-fees">
                    <Skeleton.Input active />
                    <Skeleton.Input active />
                </div>
                <div className="total-amount">
                    <Skeleton.Input active />
                    <Skeleton.Input active />
                </div>
            </div>
            <div className="row justify-content-center my-4 pb-4 pt-2">
                <div className="back-btn">
                    <Skeleton.Input active />
                </div>
                <div className="next-btn">
                    <Skeleton.Input active />
                </div>
            </div>
        </>
    )
}