import { Tabs } from 'antd';
import { CarouselSlider } from 'components';
import { OutlinedButton, PrimaryButton } from 'elements';
import { GetEventBannerList, GetEventDetails } from 'hooks';
import { BuyTickets, EventInfo, Faqs, TermsCondition } from 'page-components';
import { CalendarBlank, EnvelopeSimple, EnvelopeSimpleOpen, FacebookLogo, IdentificationBadge, MapPin, MonitorPlay, TwitterLogo, User, WhatsappLogo } from 'phosphor-react';
import React from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DateUtility } from 'utility'

const DetailLayout = styled.div`
.header{
  letter-spacing:1px;
  font-size:28px;
  font-weight:700;
  color: ${({ theme }) => theme.colors.lightWhite};
}
.date{
  color: ${({ theme }) => theme.colors.grayContent};
}
.category {
  color: ${({ theme }) => theme.colors.grayContent};
}
.contact {
  color: ${({ theme }) => theme.text.red};
}
.place {
  color: ${({ theme }) => theme.colors.grayContent};
}
.name {
  color: ${({ theme }) => theme.colors.grayContent};
}
.email {
  color: ${({ theme }) => theme.colors.grayContent};
}
.icon {
  margin-bottom: -3px;
}
.box {
  border-radius: 8px;
  // box-shadow: 0px 0px 11px rgb(47 44 44);
  padding: 19px;
  margin:2px;
  background-color: ${({ theme }) => theme.colors.gray}
}
.ticket-button {
  width: 100%;
  border:none;
}

.outline-button{
  color:${({ theme }) => theme.colors.grayContent} !important;
  width: 100%;
  border:1px solid ${({ theme }) => theme.colors.gray} !important;
  background: ${({ theme }) => theme.colors.lightBlack} !important;
  &:hover {
    background: ${({ theme }) => theme.colors.lightBlack} !important;

  }
}
.box-icon {
  column-gap:15px;
  cursor:pointer;  
}
.share{
  margin:1px;
  color: ${({ theme }) => theme.colors.grayContent};
}
`
const TabsHeader = styled(Tabs)`
    .left {
        left:5px;
    }
    .ant-tabs-nav-wrap{
      font-size:16px;
      font-weight:600;
      color: ${({ theme }) => theme.text.red};
      border-bottom: 1px solid #B9BBBF;;
    }
     .ant-tabs-ink-bar {
        background: ${({ theme }) => theme.text.red} !important;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.text.red} !important;
}

.ant-tabs-tab:hover{
 color: ${({ theme }) => theme.colors.grayContent} !important;
}
`
const OutlinedButtonAdd = styled(OutlinedButton)`
color:${({ theme }) => theme.colors.grayContent} !important;
`
// const item = [
//   {
//     ProviderEventId: 197,
//     ProviderId: 1,
//     ProviderName: "EventProvider1",
//     CategoryId: 1,
//     CategoryName: "Drama",
//     EventName: "Event 221",
//     PlaceId: 1,
//     PlaceName: "Chicago",
//     WebSite: "abc.com",
//     EventImage: "http://70.35.198.86/GTIKITAppLayer/upload/abc.jpg",
//     Email: "abc@gmail.com",
//     ContactName: "Mr ABC",
//     ContactNumber: "123456",
//     IsFreeEvent: true,
//     EventStartDateTime: "2023-04-01T05:10:20",
//     EventEndDateTime: "2023-12-01T05:10:20",
//     IsActive: true,
//     Language: "Gujarati",
//     Terms_Condition: null,
//   },
// ]

const TabsItems = [
  {
    label: `Buy Ticket`,
    key: 1,
    children: <BuyTickets />,
  },
  {
    label: `Your Order`,
    key: 2,
    children: <EventInfo />,
  },
  {
    label: `T & C`,
    key: 3,
    children: <TermsCondition />,
  },
  {
    label: `FAQ`,
    key: 4,
    children: <Faqs />,
  },
]

const onChange = (key) => {
  console.log(key);
};

export const EventsDetailScreen = ({ children }) => {
  const { data: bannerList, loading: bannerLoading } = GetEventBannerList();
  const { id } = useParams()
  const { data } = GetEventDetails(id);

  return (<>
    <CarouselSlider bannerList={bannerList} loading={bannerLoading} />
    <DetailLayout>
      <div className="container mt-5 mb-5">
        <div className="row">
              <div className="col-8 detail-header">
                <div className="header">{data.EventName}</div>
                <div className="name mt-3"><IdentificationBadge size={20} color="#B9BBBF" className="icon" /> &nbsp;{data.ProviderName}</div>
                <div className="date mt-3">
                  <CalendarBlank size={20} color="#B9BBBF" className="icon" /> &nbsp;{DateUtility.dateToString(data.EventStartDateTime)} - {DateUtility.dateToString(data.EventEndDateTime)}
                </div>
                <div className="place mt-3"><MapPin size={20} color="#B9BBBF" className="icon" /> &nbsp;{data.PlaceName}</div>
                <div className="category mt-3"><MonitorPlay size={20} color="#B9BBBF" className="icon" /> &nbsp;{data.CategoryName}</div>
                <div className="email mt-3"><EnvelopeSimple size={20} color="#B9BBBF" className="icon" /> &nbsp;{data.Email}</div>
                <div className="contact mt-3"><User size={20} color="#B9BBBF" className="icon" /> &nbsp;{data.ContactName}</div>
                <div className="mt-4">
                  {children}
                  <TabsHeader
                    className="left"
                    defaultActiveKey="1"
                    onChange={onChange}
                    items={TabsItems}
                  />
                </div>
              </div>
          <div className="col-4">
            <div className=" row column-flex d-flex justify-content-center box">
              <div className="col-12 mt-2 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                <OutlinedButtonAdd className="outline-button"> Add to Favourite</OutlinedButtonAdd>
              </div>
              <div className="col mt-2 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                <PrimaryButton className="ticket-button">Buy Ticket</PrimaryButton>
              </div>
            </div>
            <div className=" row  mt-3 column-flex d-flex justify-content-start box">
              <div className="col-12 mt-0 col-md-12 col-sm-12 d-flex justify-content-start align-items-start">
                <h4 className="share">Share with friends</h4>
              </div>
              <div className="col mt-3 col-md-12 col-sm-12 d-flex justify-content-start align-items-center box-icon">
                <WhatsappLogo size={30} color="#B9BBBF" weight="fill" />
                <TwitterLogo size={30} color="#B9BBBF" weight="fill" />
                <FacebookLogo size={30} color="#B9BBBF" weight="fill" />
                <EnvelopeSimpleOpen size={30} color="#B9BBBF" weight="fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailLayout>
  </>
  )
}
