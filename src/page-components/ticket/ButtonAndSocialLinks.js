import React, { useState } from 'react'
import '../../screens/Css/ButtonAndSocial.css'
import styled from 'styled-components'
import Instagram from '../../assets/Icons/Instagram.svg'
import Whatsapp from '../../assets/Icons/Whatsapp.svg'
import Links from '../../assets/Icons/Link.svg'
import Email from '../../assets/Icons/Email.svg'
import { useNavigate } from 'react-router-dom'
import {
    AuthPopup,
    EventsService,
    NotificationStatus,
    NotificationText,
    OfferCartService,
    TicketService,
    BrowserUtility,
} from 'utility'
import { Loader, OppsModal, PushNotification, RedStripe } from 'components'
import { useAuth } from 'context'
import { useLayout } from 'layout'
import { Heart } from 'phosphor-react'
import { Modal, Segmented } from 'antd'
import { BuyTicketModal } from 'components/BuyTicketModal'

const ButtonWapper = styled.div`
    width: 100%;
    padding: 20px 20px;
    margin: 20px 0;
    background: #242631;
    border: 1px solid rgba(166, 166, 166, 0.09);
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    ${'' /* @media (width < 600px) {
        display: none;
    } */
    }
    .ant-segmented,ant-segmented-group {
        background: ${({ theme }) => theme.colors.primary};
    }
    .ant-segmented-item-selected {
        background: ${({ theme }) => theme.colors.danger};
    }
    .ant-segmented-group {
        // display:block;
    }
`
const AddFav = styled.div`
    padding: 15px;
    width: 100%;
    background: #191a22;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
`
const BuyTicketBtn = styled.div`
    padding: 15px;
    width: 100%;
    background: #ff384e;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    pointer-events: ${({ disabled }) => disabled && "none"};
    opacity: ${({ disabled }) => disabled && "0.2"};

`
const ViewTicketBtn = styled.div`
    padding: 15px;
    width: 100%;
    background: #ff384e;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
`
const TicketRange = styled.span`
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #a6a6a6;
`
const SocialLinks = styled.div`
    width: 100%;
    padding: 20px 20px;
    margin: 20px 0;
    background: #242631;
    border: 1px solid rgba(166, 166, 166, 0.09);
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    @media (width < 600px) {
        display: none;
    }
    display: none;
`
const SocialIcon = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    @media (width < 600px) {
        display: none;
    }
`
const ScanMe = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    ${'' /* border: 1px solid #fff; */}
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin: 0rem auto;
    .text {
        margin: 0.5rem 0;
        text-align: center;
        font-weight: 600;
        font-size: 20px;
        text-transform: uppercase;
        padding-bottom: 5px;
    }
    @media (min-width: 200px) and (max-width: 480px);{

    }
`
const QRCode = styled.img`
    width: 10rem;
    margin-bottom: 1rem;
`
export const ButtonAndSocialLinks = ({ data, refreshList }) => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const { toggleModal } = useLayout()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModals = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    // const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const showModal = () => {
        if (isAuthenticated) {
            BrowserUtility.saveObj('selected-tickets', {});
            navigate(`/events/buy-ticket/${data.ProviderEventId}`)
        } else {
            toggleModal(AuthPopup.login)
        }
    }
    const addRemoveFavorite = async () => {
        if (isAuthenticated) {
            if (data.IsFavorite) {
                await EventsService.removeFavoriteEvent(data.ProviderEventId)
            } else {
                await EventsService.addFavoriteEvent(data.ProviderEventId)
            }
            if (refreshList) refreshList()
        } else {
            toggleModal(AuthPopup.login)
        }
    }
    // const handleCancel = () => {
    //     setIsModalOpen(false)
    // }
    const clickOnNext = async tickets => {
        // handleCancel()
        const params = tickets.map(ticket => ({
            EventTicketId: ticket.EventTicketId,
            Qty: ticket.Qty,
        }))
        setLoading(true)
        try {
            const result = await TicketService.selectTicket(params)
            const { TicketBucketId } = result.Result
            navigate(`/ticket/confirmation/${TicketBucketId}`)
            // navigate(`/ticket/select-seats/${TicketBucketId}`)
        } catch (error) {
            console.log(error)
            PushNotification(
                error?.error?.ErrorMessage || NotificationText.defaultError,
                NotificationStatus.error,
            )
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <ButtonWapper>
                {data.IsTicket && !data.IsFreeEvent && data.QRCodeLink && (
                    <ScanMe>
                        <div className="text">Scan Me</div>
                        <QRCode src={data.QRCodeLink} alt="" />
                    </ScanMe>
                )}
                <AddFav onClick={addRemoveFavorite}>
                    <Heart
                        size={24}
                        color={data.IsFavorite ? '#FF384E' : '#fff'}
                        weight={data.IsFavorite ? 'fill' : 'duotone'}
                    />
                    <span>Favorite</span>
                </AddFav>
                {(!data.IsTicket || data.IsFreeEvent) &&
                    data.EventTicketRate?.length > 0 && (
                        <ViewTicketBtn
                            onClick={showModals}
                            ticketRate={data.EventTicketRate || []}
                        >
                            <span>View Ticket Rate</span>
                        </ViewTicketBtn>
                    )}
                {data.IsTicket && !data.IsFreeEvent && (
                    <>
                        <BuyTicketBtn
                            onClick={() => (!data?.IsEventExpired || !data?.IsCancelled) && showModal()}
                            ticketRate={data.EventTicketRate || []}
                            clickOnNext={clickOnNext}
                            disabled={data?.IsEventExpired || data?.IsCancelled}
                        >
                            <span>Buy Ticket</span>
                        </BuyTicketBtn>
                        <TicketRange>
                            Ticket range: $ {data.MinRatePrice?.toFixed(2)} - ${' '}
                            {data.MaxRatePrice?.toFixed(2)}
                        </TicketRange>
                    </>
                )}
            </ButtonWapper>
            <SocialLinks>
                <div className="share-width">Share Width</div>
                <SocialIcon>
                    <a href="#" className="icon">
                        <img src={Instagram} alt="#" />
                    </a>
                    <a href="#" className="icon">
                        <img src={Whatsapp} alt="#" />
                    </a>
                    <a href="#" className="icon">
                        <img src={Links} alt="#" />
                    </a>
                    <a href="#" className="icon">
                        <img src={Email} alt="#" />
                    </a>
                </SocialIcon>
            </SocialLinks>
            <Modal
                title="View Ticket Rates"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={null}
            >
                <BuyTicketModal data={data} />
            </Modal>
            <Loader loading={loading} />
        </>
    )
}

export const SegMantedButtonAndSocialLinks = ({ data, refreshList, options, fav, onSelectPrice, price, selectedOption }) => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const { toggleModal } = useLayout()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const [buy, setBuy] = useState(false)
    const showModals = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = (status) => {
        setIsModalOpen(false)
        if (status) { refreshList() }
        if (buy && status) {
            setBuy(false)
            navigate("/offers/cart")
        }
    }
    // const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const addRemoveFavorite = async () => {
        if (isAuthenticated) {
            if (data.IsFavorite) {
                await EventsService.removeFavoriteEvent(data.ProviderEventId)
            } else {
                await EventsService.addFavoriteEvent(data.ProviderEventId)
            }
            if (refreshList) refreshList()
        } else {
            toggleModal(AuthPopup.login)
        }
    }
    // const handleCancel = () => {
    //     setIsModalOpen(false)
    // }
    const clickOnNext = async tickets => {
        // handleCancel()
        const params = tickets.map(ticket => ({
            EventTicketId: ticket.EventTicketId,
            Qty: ticket.Qty,
        }))
        setLoading(true)
        try {
            const result = await TicketService.selectTicket(params)
            const { TicketBucketId } = result.Result
            navigate(`/ticket/confirmation/${TicketBucketId}`)
            // navigate(`/ticket/select-seats/${TicketBucketId}`)
        } catch (error) {
            console.log(error)
            PushNotification(
                error?.error?.ErrorMessage || NotificationText.defaultError,
                NotificationStatus.error,
            )
        } finally {
            setLoading(false)
        }
    }

    const addToCart = async () => {
        try {
            if (selectedOption.PerOrderLimit <= selectedOption.InCartQuantity) {
                PushNotification(NotificationText.MaxLimitReached, NotificationStatus.error)
                return
            }
            const result = await OfferCartService.addToCart([{
                ProductId: selectedOption.OfferID,
                ProductItemId: selectedOption.OptionID,
                Qty: selectedOption.InCartQuantity + 1,
                IsUpdate: selectedOption.InCartQuantity > 0,
            }])
            if (result.Result?.ErrorMessage === "ERR-ALREADY-BOUGHT-IT") {
                PushNotification(NotificationText.AllreadyBuyIt, NotificationStatus.error)
                return
            }
            if (result.Result?.ErrorMessage) {
                setModalData(result.Result?.ErrorMessage)
                showModals()
            }
            if (result.Result.ProductBucketId) {
                PushNotification(NotificationText.ItemAdded, NotificationStatus.success)
                refreshList()
            }
        } catch {
            PushNotification(NotificationText.defaultError, NotificationStatus.error)
        }
    }

    const buyNow = async () => {
        setBuy(true)
        if (isAuthenticated) {
            if (selectedOption.PerOrderLimit <= selectedOption.InCartQuantity) {
                navigate("/offers/cart")
                return
            }
            const result = await OfferCartService.addToCart([{
                ProductId: selectedOption.OfferID,
                ProductItemId: selectedOption.OptionID,
                Qty: selectedOption.InCartQuantity + 1,
                IsUpdate: selectedOption.InCartQuantity > 0,
            }])
            if (result?.Result?.ProductBucketId) {
                PushNotification(NotificationText.ItemAdded, NotificationStatus.success)
                navigate("/offers/cart")
            }
            if (result.Result?.ErrorMessage === "ERR-ALREADY-ADDED-IT") {
                setModalData(result.Result?.ErrorMessage)
                showModals()
            }
            if (result.Result?.ErrorMessage === "ERR-ALREADY-BOUGHT-IT") {
                PushNotification(NotificationText.AllreadyBuyIt, NotificationStatus.error)
            }
        } else {
            toggleModal(AuthPopup.login)
        }
    }

    return (
        <>
            <ButtonWapper>
                <Segmented block size="large" options={options} onChange={onSelectPrice} value={price} />
                {fav && <AddFav onClick={addRemoveFavorite}>
                    <Heart
                        size={24}
                        color={data.IsFavorite ? '#FF384E' : '#fff'}
                        weight={data.IsFavorite ? 'fill' : 'duotone'}
                    />
                    <span>Favorite</span>
                </AddFav>}
                {selectedOption && <div className="mb-4">
                    <h5 className="d-flex"><span>{selectedOption.OptionTitle}</span>
                        <span>{!!selectedOption.InCartQuantity && <RedStripe className="p-1 font-14 ms-2">Already In Cart</RedStripe>}</span></h5>
                    <div className="font-grey">
                        {selectedOption.OptionDescription}
                    </div>
                </div>}
                <>
                    <BuyTicketBtn
                        onClick={buyNow}
                        ticketRate={data.EventTicketRate || []}
                        clickOnNext={clickOnNext}
                    >
                        <span>Buy Now</span>
                    </BuyTicketBtn>
                    <BuyTicketBtn
                        onClick={addToCart}
                        ticketRate={data.EventTicketRate || []}
                        clickOnNext={clickOnNext}
                    >
                        <span>Add To Cart</span>
                    </BuyTicketBtn>
                </>
            </ButtonWapper>
            <SocialLinks>
                <div className="share-width">Share Width</div>
                <SocialIcon>
                    <a href="#" className="icon">
                        <img src={Instagram} alt="#" />
                    </a>
                    <a href="#" className="icon">
                        <img src={Whatsapp} alt="#" />
                    </a>
                    <a href="#" className="icon">
                        <img src={Links} alt="#" />
                    </a>
                    <a href="#" className="icon">
                        <img src={Email} alt="#" />
                    </a>
                </SocialIcon>
            </SocialLinks>
            {data.IsTicket && !data.IsFreeEvent && data.QRCodeLink && (
                <ScanMe>
                    <div className="text">Scan Me</div>
                    <QRCode src={data.QRCodeLink} alt="" />
                </ScanMe>
            )}
            <Modal
                title="Oops, choose any one of them"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => handleCancel()}
                width={700}
                footer={null}
            >
                <OppsModal message={modalData} selectedOption={selectedOption} options={options} data={data} onclose={handleCancel} />
            </Modal>
            <Loader loading={loading} />
        </>
    )
}
