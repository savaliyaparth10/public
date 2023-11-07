import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import '../screens/Css/BuyTicketModal.css'
import { NotificationStatus, NotificationText, OfferCartService, theme } from 'utility'
import { FlexRowBetween, Loader, PushNotification } from 'components'
import { GetCart } from 'hooks'
import { Minus, Plus, Trash } from 'phosphor-react'
import { Popconfirm } from 'antd'
import { DangerButton } from 'elements'

const TicketMain = styled.div`
    padding-top: 50px;
    width: 70%;
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
            width:100%;
            .heading {
                font-size: 20px;
            }
        }
    }
    @media (min-width: 769px) and (max-width: 1000px) {
        padding-top: 25px;
        .heading-main {
            margin-bottom: 10px;
            margin: 0px 45px;
            .heading {
                font-size: 20px;
            }
        }
    }
    @media (min-width: 1001px) and (max-width: 1200px) {
        .heading-main {
            margin: 0px 10px;
            margin-bottom: 10px;
            width:100%;
            .heading {
                font-size: 20px;
            }
        }
    }
    .action-button {
        margin: 2px;
        border: solid 1px;
        padding:5px;
        border-radius: 6px;
        border-color:  ${({ theme }) => theme.colors.primary}; 
        background: ${({ theme }) => theme.colors.primary}
    }
    .q-container {
        border: solid 1px;
        padding: 2px;
        border-radius: 6px;
        border-color:  ${({ theme }) => theme.colors.secondary}; 
        background: ${({ theme }) => theme.colors.secondary}
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
    .no-data {
        display: flex;
        justify-content: center;
        border-radius: 20px;
        font-size: 16px;
        background: #242631;
        padding: 30px;
        margin-bottom: 35px;    
    }
`
const ModalHeaderResponsive = styled.div`
        font-weight: 700;
        font-size: 22px;
        padding-bottom: 10px;
    overflow-x: visible;
    width: 77%;
    border-radius: 20px;
    margin: 0 auto;
    padding: 20px;
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
const TotalMain = styled.div`
    background: #242631;
    border-radius: 30px;
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
const RedStripe = styled.span`
background: ${({ theme }) => theme.colors.red};
border-radius: 0.5rem;
`
export const BuyTicketScreenOffer = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { data, setData, refetch } = GetCart()
    const { ServiceFee, DiscountPrice, FinalPrice, OriginalPrice, OrderDetail, TaxAmount,Currency } = data
    const clickOnBack = () => {
        navigate(-1)
    }
    const onNext = async () => {
        try {
            navigate(`/offers/payment/${data.ProductBucketId}`)
        } catch {
            PushNotification(NotificationText.defaultError, NotificationStatus.error)
        }
    }

    const addQuantity = async (data) => {
        setLoading(true)
        try {
            await OfferCartService.addToCart([{
                ProductId: data.ProductId,
                ProductItemId: data.ProductItemId,
                Qty: data.Qty + 1,
                IsCart: true,
                IsUpdate: true,
            }])
            refetch()
            PushNotification(NotificationText.QuantityAdded, NotificationStatus.sucess)
            setData({ ...data, OrderDetail: OrderDetail.map(ele => ({ ...ele, Qty: ele.BucketDetailId === data.BucketDetailId ? ele.Qty + 1 : ele.Qty })) })
        } catch {
            PushNotification(NotificationText.defaultError, NotificationStatus.error)
        } finally {
            setLoading(false)
        }
    }

    const removeQuantity = async (data) => {
        try {
            setLoading(true)
            await OfferCartService.addToCart([{
                ProductId: data.ProductId,
                ProductItemId: data.ProductItemId,
                Qty: data.Qty - 1,
                IsCart: true,
                IsUpdate: true,
            }])
            setData({ ...data, OrderDetail: OrderDetail.map(ele => ({ ...ele, Qty: ele.BucketDetailId === data.BucketDetailId ? ele.Qty - 1 : ele.Qty })) })
            refetch()
            PushNotification(
                NotificationText.QuantityRemoved,
                NotificationStatus.sucess,
            )
        } catch {
            PushNotification(NotificationText.defaultError, NotificationStatus.error)
        } finally {
            setLoading(false)
        }
    }
    const removeProduct = async (removeData) => {
        try {
            await OfferCartService.removeCartItem(removeData.ProductBucketId, removeData.ProductItemId)
            refetch()
            PushNotification(
                NotificationText.ItemRemoved,
                NotificationStatus.sucess,
            )
        } catch {
            PushNotification(NotificationText.defaultError, NotificationStatus.error)
        }
    }
    const removeAll = async (removeData) => {
        const ids = removeData.map(item => item.ProductItemId).toString().replaceAll(",", ";")
        try {
            await OfferCartService.removeCartItem(removeData[0].ProductBucketId, ids)
            PushNotification(
                NotificationText.ItemRemoved,
                NotificationStatus.sucess,
            )
            refetch()
        } catch {
            PushNotification(NotificationText.defaultError, NotificationStatus.error)
        }
    }
    return (
        <TicketMain>
            <ModalHeaderResponsive>
            <FlexRowBetween className="">
                <div className="">Cart Items</div>
                {OrderDetail && !!OrderDetail?.length && <Popconfirm
                    title="Delete all Item"
                    description="Are you sure to delete all item?"
                    onConfirm={() => removeAll(data.OrderDetail)}
                    okText="Yes"
                    cancelButtonProps={<div />}
                    cancelText="No"
                >
                    <DangerButton style={{ border: 0 }}>
                        Remove All <Trash className="ms-1 pointer" size={20} />
                    </DangerButton>
                </Popconfirm>}
            </FlexRowBetween>
            </ModalHeaderResponsive>
            <ModalContainer>
                <div className="paper">
                    {!OrderDetail?.length && <h4 className="text-center mb-4 no-data">No Items Found Please Add Items To Proceed Further.</h4>}
                    {OrderDetail?.map((item, i) => {
                        return (<div className="mb-3" key={item.BucketDetailId + `${i}s-d`}>
                            <FlexRowBetween>
                                <div>
                                    <h5>{item.ProductItemName}</h5>
                                    <h6>{Currency} {item.PriceTitle.Price.map((item,j) => (<span key={`${item.Price} + ${i} + ${j}`} className={` me-2 ${item.IsStrike && "text-line font-grey"}`}>{item.Price}</span>))} <RedStripe className="p-1 font-14">{item.PriceTitle.Lable}</RedStripe></h6>
                                </div>
                                <div>
                                    <div className="q-container d-flex align-items-center">
                                        {item.Qty >= 1 && <div className="action-button pointer "><Minus onClick={() => removeQuantity(item)} /></div>}
                                        <div className="mx-2">{item.Qty}</div>
                                        {item.Qty < item.PerOrderLimit && <div className="action-button pointer"><Plus onClick={() => addQuantity(item)} /></div>}
                                        <Popconfirm
                                            title="Delete the Item"
                                            description="Are you sure to delete this item?"
                                            onConfirm={() => removeProduct(item)}
                                            okText="Yes"
                                            cancelButtonProps={<div />}
                                            cancelText="No"
                                        >
                                            <Trash className="mx-2 pointer" color={theme.colors.danger} size={20} />
                                        </Popconfirm>
                                    </div>
                                </div>
                            </FlexRowBetween>
                        </div>)
                    })}
                </div>
                <TotalMain>
                    <TotalFees>
                        <Tag>Amount</Tag>
                        <Amount>{Currency} {DiscountPrice || OriginalPrice} {!!DiscountPrice && <span className="font-grey text-line">{OriginalPrice}</span>}</Amount>
                    </TotalFees>
                    <TotalFees>
                        <Tag>Taxes</Tag>
                        <Amount>{Currency} {TaxAmount}</Amount>
                    </TotalFees>
                    <ServiceFees>
                        <Tag>Service fees</Tag>
                        <Amount>{Currency} {ServiceFee}</Amount>
                    </ServiceFees>
                    <TotalAmount>
                        <Tag>Final amount</Tag>
                        <Amount>{Currency} {FinalPrice}</Amount>
                    </TotalAmount>
                    <div className="mt-3 text-center">
                <div className="mt-3">
                    <p className="text-white font-weight-bold text-center" style={{ fontSize: '16px', fontWeight: '700' }}>
                        By clicking below, I agree to the <Link to="/term-condition" className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ textDecoration: "none" }}>Terms of Use</Link> and
                        <Link to="/return-policy" className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ textDecoration: "none" }}>Refund Policy</Link> and that I have read the <Link to="/" className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ textDecoration: "none" }}> Privacy Statment</Link> <br />
                    </p>
                </div>
            </div>
                    <Btn className="row justify-content-center pt-2">
                        <div className="back-btn" onClick={clickOnBack}>
                            <span>Back</span>
                        </div>
                        <div className="next-btn" onClick={onNext}>
                            <span>Checkout</span>
                        </div>
                    </Btn>
                </TotalMain>
                <Loader loading={loading} />
            </ModalContainer>
        </TicketMain>
    )
}