import React from 'react'
import styled from 'styled-components'
import { AppListSkeleton, CommonImageDetailCard, CustomScrollY, ImageWithFallback } from 'components'
import { AuthPopup, CommonUtility, OffersService } from 'utility'
import { StarFilled } from '@ant-design/icons'
import { MapPin } from 'phosphor-react'
import { useLayout } from 'layout'
import { useAuth } from 'context'
import InfiniteScroll from 'react-infinite-scroll-component'

const RedStripe = styled.div`
background: ${({ theme }) => theme.colors.red};
border-radius: 0.5rem;
`
const CardLayout = styled.div`
    overflow: visible;
    cursor: pointer;
    border-radius: 1rem;
    .disabled {
        pointer-events: none;
    }
    .hover-container {
        width: 100%;
        height: 100%;
        top: 0;
        position: absolute;
        border-radius: 1rem;
        &:hover {
            background: rgba(69, 74, 85, 0.3);
            .title {
                color: ${({ theme }) => theme.colors.white} !important;
            }
        }
    }
    .img-container {
        img {
            width: 100%;
            padding: 10px;
            object-fit: cover;
            overflow: hidden;
            aspect-ratio: 1;
            border-radius: 1rem;
        }
    }
    .title {
        color: #b9bbbf !important;
        font-weight: 700;
        font-size: 16px;
    }
    position: relative;
    border: none !important;
    background: ${({ theme }) => theme.colors.darkGray};
`
const CardDetails = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.white} !important;
    background: ${({ theme }) => theme.colors.darkGray};
    border-radius: 0 0 1rem 1rem;
    .font-grey {
        color: ${({ theme }) => theme.text.grey};
    }
    .map-pin {
        min-width: 16px !important;
    }
`

const MainOfferTag = styled(RedStripe)`
    position: absolute;
    top: -20px;
    font-size: 14px;
    font-weight:600;
    .tag {
        justify-content: end;
        display:flex;
        span {
        background: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.red};
        padding: 3px;
        font-size: 14px;
        border-radius: 0.5rem;
        display:flex;
        align-items: center;
        justify-content: center;
        min-width: 100px !important;
        width: max-content;
    }
    }
    
        .offer-title {
            text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
        }
        .in-tag {
            width: 100% !important; 
        }
    
`

export const OffersCategoryCard = ({
    item,
    imgHeight = 200,
    goToDetailPage,
}) => {
    return (
        <CardLayout
            imgHeight={imgHeight}
            onClick={() => {
                goToDetailPage(item)
            }}>
            <div className="img-container">
                <ImageWithFallback
                    className="img"
                    src={
                        item.ImageURL ||
                        'https://picsum.photos/500/200/?blur=2'
                    }
                    alt="item"
                />
            </div>
            <CardDetails className="d-flex justify-content-center p-1 pb-3">
                <div className="title mt-2">
                    {item.CategoryName}
                </div>
            </CardDetails>
        </CardLayout>
    )
}

export const OtherOffersCard = ({
    item,
    imgHeight = 200,
    goToDetailPage,
}) => {
    return (
        <CardLayout
            imgHeight={imgHeight}
            onClick={() => {
                goToDetailPage(item)
            }}>
            <div className="img-container">
                <ImageWithFallback
                    className="img"
                    src={
                        item.ImageURL ||
                        'https://picsum.photos/500/200/?blur=2'
                    }
                    alt="item"
                />
            </div>
            <CardDetails className="d-flex justify-content-center">
                <div className="title mt-2">
                    {item.CategoryName}
                </div>
            </CardDetails>
        </CardLayout>
    )
}

export const AllOffersList = ({ list = [], loading }) => {
    return (
        <div>            {(loading) && (
            <AppListSkeleton classStyle="col-12 col-md-4 col-sm-6 col-lg-4 mb-5" />
        )}
            {(list?.length === 0 && !loading) && (
                <div className="no-data">
                    No result found!
                </div>
            )}
        </div>
    )
}

export const OffersCategoryList = ({ list = [], loading, navigateToOffers }) => {
    return (
        <div className="row">
            {list.map((item,i) => {
                return (<div onClick={() => navigateToOffers(item)} key={`${item?.CategoryId} + ${i}`} className="col-6 col-md-2 col-sm-3 col-lg-2 mb-5">
                    <OffersCategoryCard item={item} goToDetailPage={navigateToOffers} />
                </div>)
            })}
            {(loading) && (
                <AppListSkeleton classStyle="col-12 col-md-4 col-sm-6 col-lg-4 mb-5" />
            )}
            {(list?.length === 0 && !loading) && (
                <div className="no-data">
                    No result found!
                </div>
            )}
        </div>
    )
}

const ExtraOfferTag = styled(RedStripe)`
    position:absolute;
    top:0;
    z-index:999;
    // transform: rotate(320deg);
`

const DiscountTag = styled.h6`
background: ${({ theme }) => theme.colors.success};
border-radius:5px;
padding:5px;
`
const Container = styled(InfiniteScroll)`
    height: 58.7rem;
    overflow: auto;
    background-size: cover;
    ${CustomScrollY};
`

export const TopOffersList = ({ list = [], loading, goToDetail, fetchMoreData, hasMore }) => {
    const { toggleModal } = useLayout()
    const { isAuthenticated } = useAuth()
    const addRemoveFavorite = async (data) => {
        if (isAuthenticated) {
            if (data.IsFavorite) {
                await OffersService.removeFavoriteEvent(data.OfferID)
            } else {
                await OffersService.addFavoriteEvent(data.OfferID)
            }
        } else {
            toggleModal(AuthPopup.login)
        }
    }
    return (
        <div>
            <Container
                dataLength={list?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                className="row"
            >
                {list.map((ele, i) => <div key={ele.OfferID + i + ele.OfferTitle} className="col-12 col-md-6 col-sm-6 col-lg-4 mb-5 position-relative">
                    {ele.AdditionalSubTitle && <ExtraOfferTag className="p-1 m-3">{ele.AdditionalSubTitle}</ExtraOfferTag>}
                    <CommonImageDetailCard data={ele} favoriteButton addRemoveFavorite={() => addRemoveFavorite(ele)} url={ele.ImageUrl} goToDetail={() => goToDetail(ele.OfferID)}>
                        <CardDetails className="row justify-content-center">
                            <MainOfferTag className="col-11 row  p-2 d-flex align-items-center justify-content-between">
                                <div className="offer-title col-sm-12 col-md-4 col-lg-5" title={ele.OfferTitle}>{CommonUtility.truncateString(ele.OfferTitle, 470)}</div>
                                <div className="tag col-sm-12 col-md-8 mx-0 col-lg-7"><span className="in-tag">Expires in {ele.DaysLeft} Days</span></div>
                            </MainOfferTag>
                            <div className="mt-3 px-3 mt-sm-5">{ele.PriceTitle.length ? <div className="d-flex align-items-center mb-1">
                            <p className="font-14 my-0 d-flex">{ele.PriceTitle?.[0].Price.map((item,j) => (<span key={`${item.Price} + ${i} + ${j}`} className={` me-2 ${item.IsStrike && "text-line font-grey"}`}>{ele.ProductCurrency}{item.Price}</span>))}</p>
                            <DiscountTag className="my-0 discount-price font-14">{ele.PriceTitle[0].Lable}</DiscountTag>
                                </div> : "-"}
                                </div>
                            <div className="col-11 d-flex justify-content-between px-0">
                                <div className="">{ele.StoreName}</div>
                                <div>
                                    <RedStripe className="p-1 font-14 d-flex align-items-center">4.1 <StarFilled className="ms-1" /></RedStripe>
                                </div>
                            </div>
                            <div className="col-11 row mt-1 d-flex justify-content-between px-0 font-14">
                                <div className="font-grey px-0 col-5 col-sm-4 col-md-4">{ele.Distance} {ele.DistanceName || "MI"} away</div>
                                <div className="d-flex px-0 col-7 col-sm-8 col-md-8">
                                    <MapPin size={20} className="me-1 col map-pin ms-1" />
                                    <div className="three-dots" title={ele.FormattedAddress}>{ele.FormattedAddress}</div>
                                </div>
                            </div>
                        </CardDetails>
                    </CommonImageDetailCard>
                </div>)}
                </Container>
            {(loading) && (
                <div className="row">
                    <AppListSkeleton size={6} classStyle="col-12 col-md-4 col-sm-6 col-lg-4 mb-5" />
                </div>
            )}
            {(list?.length === 0 && !loading) && (
                <div className="no-data">
                    No result found!
                </div>
            )}
        </div>

    )
}