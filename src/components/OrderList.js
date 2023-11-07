import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { CustomScrollY } from './Common'
import { OrderListSkeleton } from './Placeholder'
import CoverImage from 'assets/default-cover.png'
import { DateUtility, DayJSDateFormat } from 'utility'

const Container = styled(InfiniteScroll)`
    min-height: 58.7rem;
    overflow: auto;
    background-size: cover;
    }
    ${CustomScrollY};
`
const EventTicket = styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 1rem 0.5rem;
    margin: 0 0 1rem 0 !important;
    border-radius: 0.5rem;
    cursor: pointer;
    height: 100%;
`
const EventImg = styled.img`
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.imgBg};
`
const EventTitle = styled.div`
    font-weight: 700;
    font-size: 1rem;
`
const EventLabel = styled.div`
    font-weight: 400;
    font-size: 0.75rem;
    color: #a6a6a6;
`
const EventValue = styled.div`
    font-weight: 400;
    font-size: 0.75rem;
`
const NoEvent = styled.div`
  margin: 100px auto;
  font-size: 48px;
  font-weight: normal;
  text-align: center;
`
export const OrderList = ({
    orders = [],
    fetchMoreData,
    hasMoreData,
    loading,
    showModal,
}) => {
    return (
        <div className="row">
            <Container
                dataLength={orders?.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                className=""
            >
                {orders?.map(item => (
                    <EventTicket
                        className="row"
                        key={item.TicketBucketId}
                        onClick={() => showModal(item)}
                    >
                        <div className="col-sm-6 col-md-5 col-lg-2">
                            <EventImg
                                src={item.EventImage || CoverImage}
                                alt=""
                            />
                        </div>
                        <div className="col-sm-6 col-md-7 col-lg-10">
                            <div className="row mb-2">
                                <EventTitle>{item.EventName}</EventTitle>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-sm-6 col-md-4">
                                    <EventLabel>Date</EventLabel>
                                    <EventValue>
                                        {DateUtility.getDateTime(
                                            item.EventDate,
                                            DayJSDateFormat.date,
                                        )}
                                    </EventValue>
                                </div>
                                <div className="col-sm-4 d-sm-block d-md-none">
                                    <EventLabel>Price</EventLabel>
                                    <EventValue>{item.ProductCurrency} {item.FinalPrice}</EventValue>
                                </div>
                                <div className="col-lg-4 col col-sm-12 col-md-7 pt-sm-1">
                                    <EventLabel>Time</EventLabel>
                                    <EventValue>
                                        {DateUtility.getEventTime(
                                            item.EventDate,
                                            item.EventEndDate,
                                        )}
                                    </EventValue>
                                </div>
                                <div className="col d-sm-none d-md-block col-sm-4 col-md-4 pt-md-1">
                                    <EventLabel>Price</EventLabel>
                                    <EventValue>{item.ProductCurrency} {item.FinalPrice}</EventValue>
                                </div>
                            </div>
                        </div>
                    </EventTicket>
                ))}
                {loading && <OrderListSkeleton classStyle="" />}
                {orders?.length === 0 && !loading && <NoEvent> No result found! </NoEvent>}
            </Container>
        </div>
    )
}

export const NewOrderList = ({
    orders = [],
    fetchMoreData,
    hasMoreData,
    loading,
    showModal,
}) => {
    return (
        <div className="row">
            <Container
                dataLength={orders?.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                className=""
            >
                {orders?.map((item) => (
                    <EventTicket
                        className="row"
                        key={item.ProductBucketId + item.ProductImage}
                        onClick={() => showModal(item)}
                    >
                        <div className="col-sm-6 col-md-5 col-lg-2">
                            <EventImg
                                src={item.ProductImage || CoverImage}
                                alt=""
                            />
                        </div>
                        <div className="col-sm-6 col-md-7 col-lg-10">
                            <div className="row mb-2">
                                <EventTitle>{item.ProductTitle}</EventTitle>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-sm-6 col-md-4">
                                    <EventLabel>Date</EventLabel>
                                    <EventValue>
                                        {DateUtility.getDateTime(
                                            item.ProductStartDate,
                                            DayJSDateFormat.date,
                                        )}
                                    </EventValue>
                                </div>
                                <div className="col-sm-4 d-sm-block d-md-none">
                                    <EventLabel>Price</EventLabel>
                                    <EventValue>{item?.ProductCurrency} {item.TotalPrice}</EventValue>
                                </div>
                                <div className="col-lg-4 col col-sm-12 col-md-7 pt-sm-1">
                                    <EventLabel>Address</EventLabel>
                                    <EventValue>
                                        {item.ProductSubTitle}
                                    </EventValue>
                                </div>
                                <div className="col d-sm-none d-md-block col-sm-4 col-md-4 pt-md-1">
                                    <EventLabel>Price</EventLabel>
                                    <EventValue>{item?.ProductCurrency} {item.FinalPrice}</EventValue>
                                </div>
                            </div>
                        </div>
                    </EventTicket>
                ))}
                {loading && <OrderListSkeleton classStyle="" />}
                {orders?.length === 0 && !loading && <NoEvent> No result found! </NoEvent>}
            </Container>
        </div>
    )
}
