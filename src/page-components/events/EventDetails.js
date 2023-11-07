import React from 'react'
import {
    EventName,
    DescSection,
    Description,
    DateLocationSection,
    DateWapper,
    WapperIcon,
    WapperMain,
    WapperSub,
    EventDetailsBtn,
} from './style'
import location from '../../assets/Icons/Location.svg'
import calender from '../../assets/Icons/Calendar.svg'
import dollar from '../../assets/Icons/Dollar.svg'
import '../../screens/Css/EventDetail.css'
import { ButtonAndSocialLinks } from '../ticket/ButtonAndSocialLinks'
import { DateUtility, DayJSDateFormat } from 'utility'
import { TermsAndCondition } from '../../page-components/events/TermsAndCondition'
import { FAQNew } from '../../page-components/events/FAQNew'
import { Advertisement } from './Advertisement'

export const EventDetails = ({ data, refreshList }) => {
    console.log("🚀 ~ file: EventDetails.js ~ line 24 ~ EventDetails ~ data", data)
    console.log(data)
    const flyerId = 13
    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-8">
                    <EventName>{data.EventName}</EventName>
                    <DescSection>
                        <input type="Checkbox" id="check" />
                        <img className="col-12 mb-3 flyer-image" src={data?.EventImages?.find(ele => ele.ImageCategoryId === flyerId)?.Image} alt="" />
                        <Description>Description</Description>
                        <pre className="content shown">{data.Description}</pre>
                        {/* <div className="content hide">
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa
                        qui officia deserunt mollit anim id est laborum.
                    </div>
                    <label className="see-more" htmlFor="check">
                        See More
                    </label>
                    <label className="see-less" htmlFor="check">
                        See Less
                    </label> */}
                    </DescSection>
                    <DateLocationSection>
                        <div className="row">
                            <DateWapper className="col-sm-12 col-md-21 pb-md-3">
                                <WapperIcon>
                                    <img src={calender} alt="icon" />
                                </WapperIcon>
                                <div className="details">
                                    <WapperMain>
                                        {DateUtility.getDateTime(
                                            data.EventStartDateTime,
                                            DayJSDateFormat.dateMonth,
                                        )}
                                    </WapperMain>
                                    <WapperSub>
                                        {DateUtility.getEventTime(
                                            data.EventStartDateTime,
                                            data.EventEndDateTime,
                                        )}
                                    </WapperSub>
                                </div>
                            </DateWapper>
                            <DateWapper className="col-sm-12 col-md-12 pb-md-3">
                                <WapperIcon>
                                    <img src={location} alt="icon" />
                                </WapperIcon>
                                <div className="details">
                                    <WapperMain>{data.PlaceName}</WapperMain>
                                    <WapperSub>{data.AddressLine1}</WapperSub>
                                </div>
                            </DateWapper>
                            {data.IsTicket && !data.IsFreeEvent && (
                                <DateWapper className="col-sm-12 col-md-12 pb-md-3">
                                    <WapperIcon>
                                        <img src={dollar} alt="icon" />
                                    </WapperIcon>
                                    <div className="details">
                                        <WapperMain>
                                            $ {data.MinRatePrice?.toFixed(2)} -
                                            $ {data.MaxRatePrice?.toFixed(2)}
                                        </WapperMain>
                                        <WapperSub>
                                            {data.ProviderRefundPolicy}
                                            <br />
                                            {data.GtikitRefundPolicy}
                                        </WapperSub>
                                    </div>
                                </DateWapper>
                            )}
                            {data.ExtraLink && (
                                <div className="view-more-link">
                                    <a href={data.ExtraLink} target=" _blank ">
                                        View More
                                    </a>
                                </div>
                            )}
                        </div>
                    </DateLocationSection>
                    <div className="d-md-none pt-2">
                        <ButtonAndSocialLinks
                            data={data}
                            refreshList={refreshList}
                        />
                    </div>
                    <div className="terms-condition">
                        <TermsAndCondition data={data} />
                    </div>
                    <div className="terms-condition pt-4">
                        <FAQNew data={data} />
                    </div>
                </div>
                <EventDetailsBtn className="col-sm-12 col-md-4 d-sm-none d-md-block">
                    <ButtonAndSocialLinks
                        data={data}
                        refreshList={refreshList}
                    />
                    <Advertisement data={data} />
                </EventDetailsBtn>
            </div>
            <div className="row mb-5">
                <div className="col-sm-12 d-md-none">
                    <Advertisement data={data} />
                </div>
            </div>
        </>
    )
}
