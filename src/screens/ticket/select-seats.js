import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Logo from 'assets/Icons/Logo.svg'
import Close from 'assets/Icons/Close.svg'
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import { OrderSummary } from 'hooks'
import { Loader, PushNotification } from 'components'
import { DateUtility, DayJSDateFormat, NotificationStatus, TicketService } from 'utility'
import { BrowserUtility } from 'utility/browser-utility'
import { WarningFilled } from '@ant-design/icons'

const SelectSeatsMain = styled.div`
    padding-top: 50px;
    padding-bottom: 20px;
    .main-content {
        width: 77%;
        margin: 0 auto;
    }
    .show-name-main {
        background: #242631;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .logo-icon {
        align-items: center;
        justify-content: center;
        display: flex;
        img {
            width: 100%;
        }
    }
    .show-name {
        font-size: 22px;
        font-weight: 700;
    }
    .date-location {
        display: flex !important;
        font-size: 16px;
        margin-top: 20px;
        align-items: baseline;
    }
    .date-time {
        margin-right: 25px;
    }
    .time {
        font-size: 14px;
        color: #a6a6a6;
        font-weight: 500;
    }
    .time-left {
        margin-bottom: 10px;
        font-size: 18px;
        color: #a6a6a6;
        font-weight: 500;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: end;
        span {
            background: #ff384fd4;
            padding: 5px 10px;
            font-size: 20px;
            border-radius: 10px;
            margin: 0 5px;
            width: 80px;
            text-align: center;
        }
    }
    .address {
        font-size: 14px;
        color: #a6a6a6;
        font-weight: 500;
    }
    .seat-arragment-main {
        margin-left: 150px;
        margin-right: 150px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .original-arragement {
        background: #242631;
        width: fit-content;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        color: #ff384fd4;
    }
    .seats-selection-main {
        display: flex;
        gap: 20px;
    }
    .seats-selection-btn {
        display: flex;
        align-items: center;
    }
    .available-btn {
        width: 34px;
        height: 34px;
        background: #242631;
        border-radius: 8px;
        margin-right: 10px;
    }
    .your-btn {
        width: 34px;
        height: 34px;
        background: #ff384e;
        border-radius: 8px;
        margin-right: 10px;
    }
    .taken-btn {
        background: #1f293d;
        border-radius: 8px;
        width: 34px;
        height: 34px;
        margin-right: 10px;
        display: grid;
        place-items: center;
    }
    .book-now-main {
        background: #242631;
        box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
        border-radius: 20px 20px 0px 0px;
        margin: 20px auto;
        margin-bottom: 0;
        padding: 20px;
    }
    .total-booking {
        text-align: center;
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .total-booking span {
        margin-left: 10px;
    }
    .book-ticket {
        margin: 0 auto;
        padding: 10px 6px;
        background: #ff384e;
        border-radius: 12px;
        width: 400px;
        font-weight: 600;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        .main-content {
            width: 100%;
        }
        .seat-arragment-main {
            margin-left: 4px;
            margin-right: 0px;
            flex-direction: column;
            .original-arragement {
                order: 2;
                margin-bottom: 20px;
            }
            .seats-selection-main {
                margin-bottom: 20px;
            }
        }
        .total-booking {
            font-size: 14px;
        }
        .book-ticket {
            width: 240px;
        }
        .show-name {
            font-size: 14px;
        }
        .date-location {
            font-size: 14px;
            flex-direction: column;
            .date-time {
                margin-right: 0px;
            }
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
        .main-content {
            width: 100%;
        }
        .seat-arragment-main {
            margin-left: 4px;
            margin-right: 0px;
            flex-direction: column;
            .original-arragement {
                order: 2;
            }
            .seats-selection-main {
                margin-bottom: 20px;
            }
        }
        .book-ticket {
            width: 365px;
        }
        .show-name {
            font-size: 14px;
        }
        .date-location {
            font-size: 14px;
            flex-direction: column;
            .date-time {
                margin-right: 0px;
            }
        }
    }
    @media (min-width: 769px) and (max-width: 1000px) {
        .main-content {
            width: 90%;
        }
        .seat-arragment-main {
            margin-left: 4px;
            margin-right: 0px;
            .original-arragement {
                padding: 6px;
            }
            .available-btn,
            .your-btn,
            .taken-btn {
                width: 24px;
                height: 24px;
            }
        }
    }
    @media (min-width: 1001px) and (max-width: 1300px) {
        .main-content {
            width: 90%;
        }
        .seat-arragment-main {
            margin-left: 4px;
            margin-right: 16px;
        }
    }
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
const SessionExpired = styled.div` 
    background: #242631;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    svg {
        path {
            color: #878787;
        }
    }
    .time-out {
        font-size: 35px;
        color: #b9b9b9;
        padding: 25px 0 10px;
        display: block;
    }
    .session-time-out {
        color: #a9a9a9;
        font-size: 12px;
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 25px;
    }
    .start-again {
        width: 180px;
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
`
export const SelectSeats = () => {
    const navigate = useNavigate()
    const [maxSelectedObjects, setMaxSelectedObjects] = useState(undefined)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [init, setInit] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [holdTokenObj, setHoldTokenObj] = useState(null);
    const [loader, setLoader] = useState(true);
    const { ticketBucketId } = useParams();
    const { data, loading } = OrderSummary(ticketBucketId)
    const holdToken = BrowserUtility.getObj(`hold-token-${data?.SeatInfo?.ProviderEventId}`);
    const ticketRate = BrowserUtility.getObj(`event-ticket-rate-${data?.SeatInfo?.ProviderEventId}`)
    const chart = useRef(null);
    const sessionTimeout = useRef(null);
    const addTicket = async () => {
        try {
            setLoader(true);
            const isValid = selectedSeats.filter(d => d.Qty !== d.SeatSelectedIds.length).length === 0;
            const params = selectedSeats.map(s => ({ EventTicketId: s.EventTicketId, SeatSelectedIds: s.SeatSelectedIds, TicketBucketId: s.TicketBucketId }))
            if (isValid && chart.current?.selectedObjects.length > 0) {
                const result = await TicketService.selectSeat(params)
                console.log(result)
                navigate(`/ticket/confirmation/${ticketBucketId}`)
            } else {
                PushNotification("Please select valid seats", NotificationStatus.error)
            }
        } catch (error) {
            console.log(error);
            PushNotification("Something went wrong, please try again later.", NotificationStatus.error)
        } finally {
            setLoader(false);
        }
    }
    const handleSelectedSeat = (data) => {
        const idx = selectedSeats.findIndex(s => s.Category === data.category.label);
        if (idx !== -1) {
            const newData = selectedSeats;
            newData[idx].SeatSelectedIds.push(data.labels.own);
            setSelectedSeats([...newData]);
        }
    };
    const handleDeselectedSeat = (data) => {
        const idx = selectedSeats.findIndex(s => s.Category === data.category.label);
        if (idx !== -1) {
            const newData = selectedSeats;
            newData[idx].SeatSelectedIds = newData[idx].SeatSelectedIds.filter(s => s !== data.labels.own);
            setSelectedSeats([...newData]);
        }
    };
    const clickOnBack = async () => {
        chart.current?.clearSelection().catch(console.log);
        navigate(-1)
    }
    const secondsToMinSecPadded = time => {
        const minutes = `${Math.floor(time / 60)}`.padStart(2, "0");
        const seconds = `${time - minutes * 60}`.padStart(2, "0");
        return `${minutes}:${seconds}`;
    };
    const startAgain = () => {
        BrowserUtility.remove(`hold-token-${data?.SeatInfo?.ProviderEventId}`);
        setLoader(true);
        setSessionExpired(false);
    }
    useEffect(() => {
        return () => {
            if (window.location.pathname !== `/ticket/confirmation/${ticketBucketId}`) {
                chart.current?.clearSelection().catch(console.log);
            }
            if (sessionTimeout.current) {
                clearInterval(sessionTimeout.current);
                sessionTimeout.current = null;
            }
        }
    }, [])
    return (
        <SelectSeatsMain className="container">
            <div className="main-content">
                <div className="time-left"> Time left: <span>{holdTokenObj?.expiresInSeconds > 0 ? secondsToMinSecPadded(holdTokenObj.expiresInSeconds) : "00:00"}</span> minutes</div>
                <div className="show-name-main">
                    <div className="show-name">
                        {data?.EventName}
                        <div className="date-location">
                            <div className="date-time">
                                <div className="date">
                                    {DateUtility.getDateTime(
                                        data?.EventDate,
                                        DayJSDateFormat.date,
                                    )}
                                </div>
                                <div className="time">
                                    {DateUtility.getEventTime(
                                        data?.EventDate,
                                        data?.EventEndDate,
                                    )}
                                </div>
                            </div>
                            <div className="date-time">
                                <div className="place">Location</div>
                                <div className="address">
                                    {data?.EventLocaiton}
                                </div>
                            </div>
                            <div className="location">
                                <div className="place">Seat no</div>
                                {selectedSeats.map(s => (
                                    <div key={s.EventTicketId} className="address">
                                        {s.Category} - {s.SeatSelectedIds.length > 0 && s.SeatSelectedIds.join(", ")}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="logo-icon">
                        <img src={Logo} alt="" />
                    </div>
                </div>
                <div className="seat-arragment-main d-none">
                    <div className="original-arragement">
                        Original seat arrangement will defer from this
                    </div>
                    <div className="seats-selection-main">
                        <div className="seats-selection-btn">
                            <div className="available-btn" />
                            <div className="text">Available</div>
                        </div>
                        <div className="seats-selection-btn">
                            <div className="your-btn" />
                            <div className="text">Your seats</div>
                        </div>
                        <div className="seats-selection-btn">
                            <div className="taken-btn">
                                <img src={Close} alt="" />
                            </div>
                            <div className="text">Taken</div>
                        </div>
                    </div>
                </div>
                {!sessionExpired && data?.TicketsInfo && data?.SeatInfo && <div style={{ minHeight: '300px', opacity: init ? 100 : 0 }}>
                    <SeatsioSeatingChart
                        region="na"
                        workspaceKey={data?.SeatInfo.WorkSpaceKey}
                        event={data?.SeatInfo.EventKey}
                        maxSelectedObjects={maxSelectedObjects}
                        onObjectSelected={handleSelectedSeat}
                        onObjectDeselected={handleDeselectedSeat}
                        onHoldTokenExpired={() => {
                            if (init) {
                                setSessionExpired(true)
                            } else {
                                chart.current.startNewSession();
                            }
                        }}
                        onRenderStarted={createdChart => {
                            chart.current = createdChart;
                            if (holdToken) {
                                chart.current.setHoldToken(holdToken);
                            }
                            const categories = Object.keys(data.TicketsInfo).filter((category) => ticketRate.filter(d => d.IsSeatOption && d.TicketType === category).length > 0);
                            chart.current.setAvailableCategories(categories);
                            const selectedSeat = categories.map((category) => ({
                                EventTicketId: data?.TicketsInfo[category].EventTicketId,
                                SeatSelectedIds: [],
                                TicketBucketId: ticketBucketId,
                                Qty: data?.TicketsInfo[category].TotalTicket,
                                Category: category,
                            }));
                            setSelectedSeats(selectedSeat);
                            const maxSeats = categories.map((category) => ({ category, quantity: data?.TicketsInfo[category].TotalTicket }));
                            setMaxSelectedObjects(maxSeats);
                            const oldTicketBucketId = BrowserUtility.getObj('select-seat-ticketBucketId');
                            if (oldTicketBucketId !== ticketBucketId) {
                                setTimeout(async () => {
                                    await chart.current.clearSelection();
                                    await chart.current.startNewSession();
                                });
                            }
                            BrowserUtility.saveObj('select-seat-ticketBucketId', ticketBucketId)
                        }}
                        holdToken={holdToken}
                        // session="continue"
                        session={holdToken ? "manual" : "start"}
                        onSessionInitialized={holdToken => {
                            if (holdToken && holdToken.token) {
                                BrowserUtility.saveObj(`hold-token-${data?.SeatInfo?.ProviderEventId}`, holdToken.token);
                                setHoldTokenObj(holdToken);
                                if (holdToken.expiresInSeconds > 55) {
                                    setInit(true);
                                    setLoader(false);
                                    if (sessionTimeout.current) {
                                        clearInterval(sessionTimeout.current);
                                        sessionTimeout.current = null;
                                    }
                                    sessionTimeout.current = setInterval(() => {
                                        holdToken.expiresInSeconds -= 1;
                                        if (holdToken.expiresInSeconds < 0) {
                                            clearInterval(sessionTimeout.current);
                                        } else {
                                            setHoldTokenObj({ ...holdToken });
                                        }
                                    }, 1000);
                                } else {
                                    chart.current.startNewSession();
                                }
                            }
                            console.log('new token: ', holdToken);
                        }}
                    />
                </div>}
                {sessionExpired && <SessionExpired>
                    <WarningFilled style={{ fontSize: '50px' }} />
                    <span className="time-out">Timed Out</span>
                    <span className="session-time-out">Sorry, your session has timed out...</span>
                    <div className="start-again" onClick={startAgain}>
                        <span>Start Again</span>
                    </div>
                </SessionExpired>}
                {!sessionExpired && <div className="book-now-main">
                    <div className="total-booking">
                        Total seat: 35 <span> Total pay amount: $40</span>
                    </div>
                    <Btn className="row justify-content-center pt-2">
                        <div className="back-btn" onClick={clickOnBack}>
                            <span>Back</span>
                        </div>
                        <div className="next-btn" onClick={addTicket}>
                            <span>Add Ticket</span>
                        </div>
                    </Btn>
                </div>}
            </div>
            <Loader loading={loader || loading} />
        </SelectSeatsMain>
    )
}
