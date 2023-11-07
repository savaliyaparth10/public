import React, { useEffect, useMemo, useState } from 'react'
import {
    EventName,
    DescSection,
    EventDetailsBtn,
} from 'page-components/events/style'
import '../../screens/Css/EventDetail.css'
import { DangerText, FlexRowBetween, RedStripe } from 'components'
import { StarFilled } from '@ant-design/icons'
import { MapPin } from 'phosphor-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SegMantedButtonAndSocialLinks } from 'page-components/ticket/ButtonAndSocialLinks'
import { CommonUtility } from 'utility'

const DetailWrapper = styled.div`
.font-grey {
    color: ${({ theme }) => theme.text.grey};
}
`

const OtherOfferBox = styled.div`
    img {
        border-radius: 6px;
        width: 100%;
        height: 125px;
    }
    .offer-title {
        text-overflow: ellipsis;
        overflow: hidden;
            white-space: nowrap;
    }
`

const DisplayType = {
    LINE: "LINE",
}

const OffersDetailsList = ({ data }) => {
    return (<div>
        {
            data?.map(ele => {
                return (<div className="mb-4" key={ele}>
                    <h5>{ele.Title}</h5>
                    {
                        ele.DisplayType === DisplayType.LINE ? <ul className="font-grey">
                            {
                                ele.Details?.length && ele.Details?.map(item => <li className="font-grey">{item.Detail}</li>)
                            }</ul> :
                            <div className="font-grey">{ele.Details?.length && ele.Details?.map(item => <span>{item.Detail}</span>)}</div>
                    }
                </div>)
            })
        }
    </div>
    )
}

const OtherOffers = ({ data }) => {
    const [offersData,setOffersData] = useState([])
    useEffect(() => {
        setOffersData(data?.slice(0,4))
    },[data])
    const viewMore = () => {
        setOffersData(data)
    }
    return (<div className="row my-2">
        <FlexRowBetween><h4 className="mb-3">
            Other Offers</h4>
            <DangerText className="pointer" onClick={viewMore}>View More</DangerText></FlexRowBetween>
        {
            offersData?.map(item => {
                return (<OtherOfferBox className="col-6 col-sm-3 col-md-3 pointer" key={`other-offer-${item.OfferTitle}${item.OfferId}`} title={item?.OfferTitle}>
                    <Link to={`/offers/${item.OfferId}`}>
                        <img src={item.ImageUrl} alt="" className="img" />
                        <div className=" mt-3 offer-title" title={item.OfferTitle}>{CommonUtility.truncateString(item.OfferTitle, 470)}</div>
                    </Link>
                </OtherOfferBox>)
            })
        }
    </div>)
}

export const OfferDeatils = ({ data, refreshList }) => {
    const [selectedPrice, setSelectedPrice] = useState()
    const { OfferData, Store, OfferDetails: OffersDetailsData, OtherOffers: OtherOffersData, OfferOptions, OfferRatings } = data
    const Options = useMemo(() => {
        if (OfferOptions?.length) {
            setSelectedPrice(OfferOptions.find(ele => ele.InCartQuantity)?.OptionID || OfferOptions?.[0]?.OptionID)
        }
        return OfferOptions?.map(item => ({ ...item, value: item.OptionID, label: item.OptionSubTitle })) || []
    }, [OfferOptions])
    const selectedOption = useMemo(() => {
        return Options.find(item => item.OptionID === selectedPrice)
    }, [selectedPrice,OfferOptions])
    const onSelectPrice = (price) => {
        setSelectedPrice(price)
    }
    return (
        <DetailWrapper className="row">
            <div className="col-sm-12 col-md-8 col-12">
                <FlexRowBetween className="d-flex align-items-center">
                    <EventName className="ps-0 ps-sm-0 ps-md-2">{Store?.BusinessFullName}</EventName>
                    <h5 className="mb-0"><RedStripe className="p-1 d-flex align-items-center">{OfferRatings?.toFixed(1)} <StarFilled className="ms-1" /></RedStripe></h5>
                </FlexRowBetween>
                <FlexRowBetween className="d-flex mt-1">
                    <h6 className="font-grey col-6 ps-0 ps-sm-0 ps-md-2">{OfferData?.Distance} {OfferData?.DistanceName || "MI"} away</h6>
                    <div className="p-1 three-dots" title={Store?.FormattedAddress}><MapPin size={25} className="me-1" />{Store?.FormattedAddress}</div>
                </FlexRowBetween>
                <DescSection>
                    <OffersDetailsList data={OffersDetailsData} />
                </DescSection>
                <div className="">
                    <OtherOffers data={OtherOffersData} viewmore={() => { }} />
                </div>
            </div>
            <EventDetailsBtn className="col-sm-12 col-md-4 col-12">
                <SegMantedButtonAndSocialLinks price={selectedPrice} selectedOption={selectedOption} options={Options} onSelectPrice={onSelectPrice} data={data} refreshList={refreshList} />
            </EventDetailsBtn>
        </DetailWrapper>
    )
}
