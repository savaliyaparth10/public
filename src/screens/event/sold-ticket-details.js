import React, { useState } from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Button } from 'react-bootstrap'
import { GetSoldTicketsByBuyer, GetSoldTicketsByType } from 'hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomScrollY, Loader, PushNotification } from 'components'
import { MagnifyingGlass, SlidersHorizontal } from 'phosphor-react'
import { Modal } from 'antd'
import SoldTicketFilter from 'components/SoldTicketFilter'
import UsersTicketModal from 'components/UsersTicketModal'
import { NotificationStatus, TicketService } from 'utility'
import InfiniteScroll from 'react-infinite-scroll-component'
import { OutlinedButton } from 'elements'

const SoldTicketMain = styled.div`
    padding-top: 50px;
    width: 60%;
    margin: 0 auto 100px;
    .heading-main {
        display: flex;
        margin: 0px auto 20px;
        width: 70%;
        justify-content: space-between;
        align-items: center;
    }
    .heading {
        font-weight: 700;
        font-size: 22px;
        padding-bottom: 10px;
    }
    .back-button {
        background: rgba(255, 255, 255, 0.1);
    }
    .sold-ticket-container {
        width: 70%;
        border-radius: 20px;
        margin: 0 auto;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
    }
    .nav-tabs {
        border: 0;
        justify-content: center;
        margin-bottom: 1rem;
    }
    .nav-item {
        margin-right: 1rem;
        .nav-link {
            background: rgba(36, 38, 49);
            padding: 1rem 5rem;
            border-radius: 12px;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
            border: 0;
            color: #8a8a8a;
            font-size: 14px;
        }
        .nav-link.active {
            background: #ff384e;
            color: white;
        }
        .nav-link:focus-visible {
            outline: none;
        }
    }
    .total-amount-main {
        text-align: center;
        color: #ff384e;
        background: #242631;
        border-radius: 6px;
        font-size: 16px;
        display: flex;
        justify-content: center;
        padding: 1rem 5rem;
        margin-top: 1rem;
    }
    .ticket-details-main {
        .ticket-details {
            display: flex;
            justify-content: space-between;
            padding: 0.8rem 2rem;
            border-bottom: 1.5px solid #8a8a8a47;
            .ticket-type {
                .ticket-type-price {
                    border-left: 4px #ff384e solid;
                    .seat-name {
                        font-weight: 600;
                        font-size: 16px;
                        color: #ffff;
                        margin-left: 0.5rem;
                    }
                    .price {
                        font-weight: 600;
                        font-size: 12px;
                        color: #a6a6a6;
                        margin-left: 0.5rem;
                    }
                }
                .all-check-in {
                    border-left: 4px #34c053 solid;
                }
            }
        }
    }
    .ticket-details:nth-child(6) {
        border: 0;
    }
    .ticket-btn {
        .btn {
            display: flex;
            flex-direction: column;
            padding: 0.2rem 1.5rem;
            border-radius: 6px;
            background: #ff384e;
            border: 0;
            font-weight: 600;
            font-size: 12px;
            span {
                font-weight: 500;
                font-size: 12px;
            }
        }
        .btn:focus-visible {
            outline: none;
            box-shadow: none;
        }
    }
    .users-details-main {
        padding: 0rem 2rem;
        .search-and-filter {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }
        .filter {
            width: 52px;
            height: 50px;
            background: #191a22;
            border-radius: 10px;
            display: grid;
            place-content: center;
            margin-left: 0.5rem;
            cursor: pointer;
        }
        .search {
            display: flex;
            width: 100%;
            background: #191a22;
            border-radius: 14px;
            padding: 0.75rem;
            input {
                background: transparent;
                border: none;
                width: 100%;
                font-size: 16px;
                padding-left: 5px;
            }
            input:focus {
                border: none;
                outline: none;
            }
            input:focus-visible {
                border: none;
                outline: none;
            }
            .icon {
                cursor: pointer;
            }
        }
        .users-details {
            width: 100%;
            background: #242631;
            border-radius: 14px;
            padding: 1rem;
            display: flex;
            align-items: center;
            border-right: 8px solid #ff384e;
            margin-bottom: 1rem;
            cursor: pointer;
            .user-profile {
                width: 50px;
                height: 50px;
                img {
                    border-radius: 10px;
                    width: 100%;
                }
            }
            .user-profile-details {
                margin-left: 1rem;
                .name {
                    font-weight: 600;
                    font-size: 18px;
                }
            }
            .seat-types {
                span {
                    font-weight: 500;
                    font-size: 14px;
                    color: #a6a6a6;
                }
            }
        }
        .all-check-in {
            border-right: 8px solid #34c053;
        }
        .check-in-out-btn {
            padding: 0.2rem 1rem;
            border-radius: 6px;
            border: 0;
            font-weight: 600;
            font-size: 12px;
            width: 100px;
        }
        .check-in-btn {
            background: #34c053;
        }
        .check-out-btn {
            background: #ff384e;
        }
    }
    @media (min-width: 200px) and (max-width: 480px) {
        width: 90%;
        padding-top: 20px;
        .heading-main {
            width: 100%;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
        .sold-ticket-container {
            width: 100% !important;
        }
        .nav-item {
            margin-right: 0.5rem !important;
            margin-bottom: 0.5rem;
        }
        .nav-link {
            padding: 1rem 3rem !important;
        }
        .ticket-details {
            padding: 0.8rem 0rem !important;
        }
        .users-details-main {
            padding: 0rem !important;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
        width: 90%;
        padding-top: 20px;
        .heading-main {
            width: 100%;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
        .sold-ticket-container {
            width: 100% !important;
        }
        .nav-item {
            margin-right: 0.5rem !important;
            margin-bottom: 0.5rem;
        }
        .nav-link {
            padding: 1rem 3rem !important;
        }
        .ticket-details {
            padding: 0.8rem 0rem !important;
        }
        .users-details-main {
            padding: 0rem !important;
        }
    }
    @media (min-width: 769px) and (max-width: 1000px) {
        width: 90%;
        padding-top: 25px;
        .heading-main {
            margin-bottom: 10px;
            width: 100%;
            .heading {
                font-size: 20px;
            }
        }
        .sold-ticket-container {
            width: 100% !important;
        }
        .nav-item {
            margin-right: 0.5rem !important;
            margin-bottom: 0.5rem;
        }
    }
    @media (min-width: 1001px) and (max-width: 1220px) {
        .heading-main {
            margin-bottom: 10px;
            width: 100%;
            .heading {
                font-size: 20px;
            }
        }
        .sold-ticket-container {
            width: 100% !important;
        }
    }
`
const Container = styled(InfiniteScroll)`
    height: 58.7rem;
    overflow: auto;
    background-size: cover;
    ${CustomScrollY};
`
const NoTicket = styled.div`
    margin: 100px auto;
    font-size: 24px;
    font-weight: normal;
    text-align: center;
`
export const SoldTicketDetails = () => {
    const [key, setKey] = useState('byTicket')
    const [query, setQuery] = useState("");
    const [loader, setLoader] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [ModalOpen, setModalOpen] = useState(false)
    const [fullDetails, setFullDetails] = useState(null)
    const [eventTicketIds, setEventTicketIds] = useState([])
    const { id } = useParams()
    const navigate = useNavigate();
    const { data: byTicketData, loading } = GetSoldTicketsByType(id)
    const { data: byUserData, loading: buyerLoading, fetchMoreData, hasMore, filterChanged, checkInOut } =
        GetSoldTicketsByBuyer(id)
    const totalAmount = byTicketData.reduce(
        (a, b) => b.TicketPrice * b.TicketSoldQty + a,
        0,
    )
    const showModalOpen = async (BuyerId, TicketBucketId) => {
        try {
            setLoader(true);
            const result = await TicketService.getSoldTicketsBuyerDetails({
                ProviderEventId: id,
                BuyerId,
                TicketBucketId,
            })
            if (result?.Result) {
                setFullDetails(result?.Result);
                setModalOpen(true);
            }
        } catch (error) {
            console.log(error);
            PushNotification(error.message || "Something went wrong please try again", NotificationStatus.error);
        } finally {
            setLoader(false);
        }
    }
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
        setModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
        setModalOpen(false)
    }
    const clearFilter = () => {
        setEventTicketIds([]);
    }
    const applyFilter = () => {
        filterChanged({
            SearchText: query.trim() || undefined,
            EventTicketId: eventTicketIds.length > 0 ? eventTicketIds.join(';') : undefined,
        })
        setIsModalOpen(false);
    }
    const clickOnSoldTicket = (EventTicketId) => {
        setKey('byUser');
        setEventTicketIds([EventTicketId]);
        filterChanged({
            EventTicketId,
        })
    }
    const checkInOutTicket = async (QRCodeId, Checkin) => {
        try {
            setLoader(true);
            await checkInOut(QRCodeId, Checkin);
            filterChanged({
                SearchText: query.trim() || undefined,
                EventTicketId: eventTicketIds.length > 0 ? eventTicketIds.join(';') : undefined,
            })
            const CheckInDetail = fullDetails.CheckInDetail.map(d => d.QRCodeId === QRCodeId ? { ...d, Checkin } : d)
            setFullDetails({ ...fullDetails, CheckInDetail });
        } catch (error) {
            console.log(error);
            PushNotification(error.message || "Something went wrong please try again", NotificationStatus.error);
        } finally {
            setLoader(false);
        }
    }
    const refundTicket = async (TicketBucketId) => {
        try {
            setLoader(true);
            await TicketService.RefundTicket({ TicketBucketId });
            filterChanged({
                SearchText: query.trim() || undefined,
                EventTicketId: eventTicketIds.length > 0 ? eventTicketIds.join(';') : undefined,
            })
            PushNotification("Refund initiate successfully", NotificationStatus.success);
            handleCancel();
        } catch (error) {
            console.log(error);
            PushNotification(error.message || "Something went wrong please try again", NotificationStatus.error);
        } finally {
            setLoader(false);
        }
    }
    return (
        <SoldTicketMain className="sold-ticket-main">
            <div className="heading-main">
                <div className="heading">Sold Ticket</div>
                <OutlinedButton className="back-button" onClick={() => navigate(-1)}>Back</OutlinedButton>
            </div>
            <div className="sold-ticket-container">
                <Tabs
                    activeKey={key}
                    onSelect={(k) => {
                        setKey(k);
                        if (k === "byUser") {
                            setQuery("");
                            setEventTicketIds([]);
                            filterChanged({})
                        }
                    }}>
                    <Tab eventKey="byTicket" title="By tickets">
                        <div className="ticket-details-main">
                            {byTicketData.map(ticket => (
                                <div
                                    key={`ticket-type-${ticket.TicketType}`}
                                    className="ticket-details"
                                >
                                    <div className="ticket-type">
                                        <div
                                            className={`ticket-type-price ${ticket.AllCheckedIn &&
                                                'all-check-in'
                                                }`}
                                        >
                                            <div className="seat-name">
                                                {ticket.TicketType}
                                            </div>
                                            <span className="price">
                                                $ {ticket.TicketPrice}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ticket-btn">
                                        <Button className="button" onClick={() => clickOnSoldTicket(ticket.EventTicketId)}>
                                            Sold Ticket
                                            <span>{ticket.TicketSoldQty}</span>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <span className="total-amount-main">
                                Total amount: ${totalAmount}
                            </span>
                        </div>
                    </Tab>
                    <Tab eventKey="byUser" title="By users" id="byUser">
                        <Container
                            className="users-details-main"
                            dataLength={byUserData.length}
                            next={fetchMoreData}
                            hasMore={hasMore}>
                            <div className="search-and-filter">
                                <div className="search">
                                    <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                                    <div
                                        className="icon"
                                        onClick={() => filterChanged({
                                            SearchText: query.trim() || undefined,
                                            EventTicketId: eventTicketIds.length > 0 ? eventTicketIds.join(';') : undefined,
                                        })}>
                                        <MagnifyingGlass
                                            size={28}
                                            color="#8a8a8a"
                                        />
                                    </div>
                                </div>
                                <div className="filter" onClick={showModal}>
                                    <SlidersHorizontal
                                        size={32}
                                        color="#FF384E"
                                    />
                                </div>
                            </div>
                            {(byUserData.length > 0 || buyerLoading) && byUserData.map(user => (
                                <div
                                    key={`user-ticket-${user.BuyingDate}`}
                                    className={`users-details ${user.AllCheckedIn && 'all-check-in'
                                        }`}
                                    onClick={() => showModalOpen(user.BuyerId, user.TicketBucketId)}
                                >
                                    <div className="user-profile">
                                        <img src={user.ProfilePicture} alt="" />
                                    </div>
                                    <div className="user-profile-details w-100">
                                        <div className="name">{user.Buyer}</div>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <div className="seat-types">
                                                    <span>
                                                        Total Ticket: {user.TotalTicket}
                                                    </span>
                                                </div>
                                                <div className="seat-types">
                                                    <span>
                                                        {Object.keys(
                                                            user.TicketDetail || {},
                                                        ).join(', ')}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                className={`check-in-out-btn ${user.AllCheckedIn ? 'check-out-btn' : 'check-in-btn'}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    checkInOut(user.QRCodeId, !user.AllCheckedIn)
                                                }}>
                                                {user.AllCheckedIn ? 'Check Out' : 'Check In'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(byUserData.length === 0 && !buyerLoading) && <NoTicket>No ticket found!</NoTicket>}
                        </Container>
                    </Tab>
                </Tabs>
            </div>
            <Modal
                title="Filters"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={null}
            >
                <SoldTicketFilter
                    types={byTicketData.map(({ TicketType, EventTicketId }) => ({ TicketType, EventTicketId }))}
                    eventTicketIds={eventTicketIds}
                    setEventTicketIds={setEventTicketIds}
                    clearFilter={clearFilter}
                    applyFilter={applyFilter}
                />
            </Modal>
            <Modal
                title="Tickets"
                centered
                open={ModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={null}
                className="apply-code-modal"
            >
                <UsersTicketModal
                    data={fullDetails}
                    checkInOut={checkInOutTicket}
                    refundTicket={refundTicket}
                    loader={loader} />
            </Modal>
            <Loader loading={loader || loading || buyerLoading} />
        </SoldTicketMain>
    )
}
