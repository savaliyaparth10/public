import { Tag } from "antd"
import { PrimaryButton } from "elements"
import styled from "styled-components"

const TicketsLayout = styled.div`
.heading {
    color: ${({ theme }) => theme.colors.lightWhite} !important;
}
.box {
border-radius: 8px;
box-shadow: 0px 0px 11px rgb(47 44 44);
padding: 19px;
background-color: #2D343F !important;
margin: 1px;
}
.add-btn {
    float:right;
}
.count {
    margin-bottom: 7px;
    margin: 8px;
    color: ${({ theme }) => theme.colors.lightWhite} !important;
}

.info {
    color: ${({ theme }) => theme.colors.lightWhite} !important
}
.price {
    color: ${({ theme }) => theme.colors.lightWhite} !important;
}
.ant-tag {
    color: ${({ theme }) => theme.colors.lightWhite} !important;
    border-radius:10px;
}
`
const PrimaryButtonSold = styled(PrimaryButton)`
background:${({ theme }) => theme.colors.soldButton} !important;
border-radius:40px;
border:none;
width:50%;
&:hover {
    background:${({ theme }) => theme.colors.soldButton} !important;
}
`
const PrimaryButtonAdd = styled(PrimaryButton)`
border-radius:40px;
border:none !important;
width:50%
`
const PrimaryButtonCount = styled(PrimaryButton)`
border-radius: 30px;
    border: none !important;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
}

`
export const BuyTickets = () => {
    return (
        <>
        <TicketsLayout>
            <h1 className="heading">Ticket Information</h1>
        <div className=" row  mt-2 ml-1  box">
              <div className="col-8 mt-0 col-md-8 col-sm-12">
             <div className="info">Balcony - 1 Person  &nbsp; <Tag color="#87d068">Available</Tag></div>
             <div className="price mt-2">$250</div>
              </div>
              <div className="col-4 mt-3 col-md-4 col-sm-12 d-flex justify-content-end align-items-end add-btn">
              <PrimaryButtonAdd> + ADD</PrimaryButtonAdd>
              </div>
            </div>
            <div className=" row  mt-3 box">
              <div className="col-8 mt-0 col-md-8 col-sm-12">
             <div className="info">Lower Balcony - 1 Person  &nbsp; <Tag color="#f0c330">Filling out fast</Tag></div>
             <div className="price mt-2">$500</div>
              </div>
              <div className="col-4 mt-2 col-md-4 col-sm-12 d-flex justify-content-end align-items-end add-btn">
              <PrimaryButtonCount>-</PrimaryButtonCount>
              <div className="ml-mr-2 count">1</div>
              <PrimaryButtonCount>+</PrimaryButtonCount>
              </div>
            </div>
            <div className=" row  mt-3 box">
              <div className="col-8 mt-0 col-md-8 col-sm-12">
             <div className="info">VIP Arena - 1 Person  &nbsp; <Tag color="#b8b6b2">Sold out</Tag></div>
             <div className="price mt-2">$5000</div>
              </div>
              <div className="col-4 mt-2 col-md-4 col-sm-12 d-flex justify-content-end align-items-end add-btn">
              <PrimaryButtonSold className="sol-btn">Sold Out</PrimaryButtonSold>
              </div>
            </div>
            </TicketsLayout>
        </>
    )
}
