import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DateUtility, DayJSDateFormat } from 'utility'

const FinalTicketMain = styled.div`
    .final-ticket-head {
        font-weight: 700;
        font-size: 22px;
        margin: 10px auto 0px auto;
        max-width: 670px;
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
    .btn-group {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .details-div {
        display: flex;
        justify-content: space-between;
    }
    .ticket-second-part {
        width: 90%;
        margin-top: 20px;
        margin-bottom: 35px;
    }
    .detail-key {
        color: #d9d9d9;
        font-weight: 500;
    }
    .detail-value {
        color: white;
        font-weight: 700;
    }
`
export const OfferDetailsCard = ({ detailKey, value }) => {
    return (
        <div className="details-div my-2 row">
            <div className="detail-key col-3">{detailKey}</div>
            <div className="detail-value col-9 text-end justify-content-end">
                {value}
            </div>
        </div>
    )
}
export const OfferOderModal = ({ data, loading }) => {
    const navigate = useNavigate()
    const goToHome = () => {
        navigate(`/`)
    }
    // const goToDirection = () => {
    //     navigate(
    //         `/ticket/map/${ticketBucketId}?lat=${data?.Latitude}&long=${data?.Longitude}`,
    //     )
    // }
    return (
        <FinalTicketMain className="">
            {!loading && (
                <>
                    <div className="final-ticket-head text-center">
                        <div className="fs-5 text"> QR Code</div>
                        <div className="fs-6"> Scan with the receptionist</div>
                        <img
                            src={data?.QRCode}
                            alt="QR Code"
                            className="h-25 w-25 mt-3"
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="ticket-second-part">
                            <OfferDetailsCard
                                detailKey="Full Name"
                                value={data?.customer?.FullName}
                            />
                            <OfferDetailsCard
                                detailKey="Payment Via"
                                value={data?.PaymentMethod}
                            />
                            <OfferDetailsCard
                                detailKey="Store Name"
                                value={data?.OrderDetail?.map((item, i) => (
                                    <span>
                                        {item.StoreName}
                                        {i < data.OrderDetail.length - 1 && ';'}
                                    </span>
                                ))}
                            />
                            <OfferDetailsCard
                                detailKey="Bought Date"
                                value={DateUtility?.getDateTime(
                                    data?.OrderCreatedOn,
                                    DayJSDateFormat.dateTime,
                                )}
                            />
                            <OfferDetailsCard
                                detailKey="Expiry Date"
                                value={DateUtility?.getDateTime(
                                    data?.OrderDetail?.[0]?.OfferExpirationDate,
                                    DayJSDateFormat.dateTime,
                                )}
                            />
                            <hr />
                            <div>
                                <div
                                    style={{
                                        color: '#D9D9D9',
                                        fontWeight: '500',
                                    }}
                                >
                                    Ordered Items
                                </div>
                                <div className="mt-1 row">
                                    {data?.OrderDetail?.map(item => {
                                        return (
                                            <div
                                                className="col-12 mb-3"
                                                key={`${
                                                    item.ProductId +
                                                    item.ProductItemId
                                                }-${new Date().toDateString()}`}
                                            >
                                                <div className="detail-value">
                                                    {' '}
                                                    {item?.ProductName.length >
                                                    45
                                                        ? `${item?.ProductName?.slice(
                                                              0,
                                                              45,
                                                          )} ..`
                                                        : item?.ProductName}{' '}
                                                </div>
                                                <div className="detail-value">{data?.OrderCurrency}{`${
                                                    item.FinalPrice
                                                }(x${item?.Qty})`}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <hr />
                            <OfferDetailsCard
                                detailKey="Purchase Price"
                                value={`${data?.OrderCurrency || ""} ${data?.FinalPrice}`}
                            />
                        </div>
                    </div>
                    <div className="btn-group">
                        <div className="home-btn" onClick={goToHome}>
                            <span>Go to Home</span>
                        </div>
                        {/* <div className="direction-btn" onClick={goToDirection}>
                            <span>Go direction</span>
                        </div> */}
                    </div>
                </>
            )}
        </FinalTicketMain>
    )
}
