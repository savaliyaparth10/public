import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CustomScrollY, ImageWithFallback } from './Common'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AppListSkeleton } from './Placeholder'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox, Tag } from 'antd'
import { OutlinedButton } from 'elements'
import { GearSix, Trash, Heart, MapPin } from 'phosphor-react'
import { AuthPopup, DateUtility, DayJSDateFormat, EventsService } from 'utility'
import { useAuth } from 'context'
import { useLayout } from 'layout'
// import { PopUpModal } from './PopUpModal'
// import TicketFormScreen from 'screens/sponsor/ticket-form'

const CardLayout = styled.div`
    overflow: visible;
    cursor: pointer;
    .disabled {
        pointer-events: none;
    }
    .hover-container {
        width: 100%;
        height: 100%;
        top: 0;
        position: absolute;
        border-radius: 1rem;
        .edit-delete {
            display: none;
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            button {
                display: inline-flex;
            }
            .view-sold-ticket {
                ${
                    '' /* padding: 8px 16px;
                font-weight: 500;
                font-size: 16px;
                color: ${({ theme }) => theme.colors.white} !important;
                background: ${({ theme }) => theme.colors.gray};
                border-radius: 0.5rem;
                margin: auto;
                width: 200px;
                text-align: center; */
                }
            }
        }
        &:hover {
            background: rgba(69, 74, 85, 0.3);
            .edit-delete {
                display: inline-flex;
            }
            .title {
                color: ${({ theme }) => theme.colors.white} !important;
            }
            .category {
                color: ${({ theme }) => theme.colors.white} !important;
            }
            .place {
                color: ${({ theme }) => theme.colors.white} !important;
            }
        }
    }
    .img-container {
        ${'' /* position: relative; */}
        ${
            '' /* height: ${({ imgHeight }) => (!imgHeight ? 250 : imgHeight)}px; */
        }
        ${'' /* width: 360px; */}
        img {
            width: 100%;
            object-fit: cover;
            overflow: hidden;
            aspect-ratio: 16/9;
            border-radius: 1rem 1rem 0rem 0rem;
        }
    }
    .tag-freeEvent {
        position: absolute;
        top: 3%;
        right: 0%;
        padding-block: 1px;
        padding-inline: 8px;
        border: 0;
        cursor: pointer;
    }

    .cancelled {
        position: absolute;
        top: 2%;
        left: 2%;
        padding-block: 1px;
        padding-inline: 8px;
        cursor: pointer;
        border: 0;
        border-radius: 0.5rem;
        background: #d44456;
    }

    .title {
        color: #b9bbbf !important;
        font-weight: 700;
        font-size: 18px;
        margin-left: 4.5px;
    }
    .category {
        color: #a2a5aa !important;
        font-size: 14px;
        display: flex !important;
        align-items: center !important;
        span {
            font-weight: 500;
            font-size: 14px;
            color: #ffffff;
        }
    }
    .place {
        color: #a2a5aa !important;
        font-size: 14px;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between;
        margin-left: 4.5px;
        .price {
            backdrop-filter: blur(2px);
            border-radius: 6px;
            width: fit-content;
            padding: 3px 6px;
            background: ${({ theme }) => theme.colors.danger};
        }
        .free-event {
            background: ${({ theme }) => theme.colors.success};
        }
        .date {
            color: #a6a6a6;
        }
    }
    position: relative;
    border: none !important;
`
const CardDetails = styled.div`
    margin-top: -10px;
    padding: 16px;
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.white} !important;
    background: ${({ theme }) => theme.colors.darkGray};
    border-radius: 0 0 1rem 1rem;
`
const EventListContainer = styled.div`
    .home-btn {
        width: 200px;
        padding: 12px;
        background: #ff384e;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;
        margin: 30px auto 50px;
    }
`
const Container = styled(InfiniteScroll)`
    height: 58.7rem;
    overflow: auto;
    background-size: cover;
    ${CustomScrollY};
`
const EventContainer = styled.div`
    margin-bottom: 32px;
    .event-card {
        height: 100%;
        border-radius: 1rem;
        background: ${({ theme }) => theme.colors.darkGray};
    }
`
const NoEvent = styled.div`
    margin: 100px auto;
    font-size: 48px;
    font-weight: normal;
    text-align: center;
`
export const EventItemCard = ({
    event,
    editMode = false,
    openDeleteModal,
    disableHover = false,
    imgHeight,
    checkBox,
    goToDetailPage,
    onSelectEvent,
    selected,
    refreshList,
}) => {
    const { isAuthenticated } = useAuth()
    const { toggleModal } = useLayout()
    const addRemoveFavorite = async e => {
        e.preventDefault()
        e.stopPropagation()
        if (isAuthenticated) {
            if (event.IsFavorite) {
                await EventsService.removeFavoriteEvent(event.ProviderEventId)
            } else {
                await EventsService.addFavoriteEvent(event.ProviderEventId)
            }
            if (refreshList) refreshList(event)
        } else {
            toggleModal(AuthPopup.login)
        }
    }

    // const [open, setOpen] = useState(false)

    // const onClose = () => {
    //     setOpen(false)
    // }
    return (
        <>
            <CardLayout
                imgHeight={imgHeight}
                onClick={() => {
                    if (typeof onSelectEvent === 'function') {
                        onSelectEvent()
                    } else if (goToDetailPage) {
                        goToDetailPage()
                    }
                }}
            >
                <div className="img-container">
                    <ImageWithFallback
                        className="img"
                        src={
                            event.EventImage ||
                            'https://picsum.photos/500/200/?blur=2'
                        }
                        alt="event"
                    />
                    {!editMode && (
                        <Tag
                            className="tag-freeEvent"
                            onClick={addRemoveFavorite}
                        >
                            <Heart
                                size={40}
                                color={event.IsFavorite ? '#FF384E' : '#fff'}
                                weight={event.IsFavorite ? 'fill' : 'duotone'}
                            />
                        </Tag>
                    )}
                    {!event.IsCancelled && (
                        <Tag className="cancelled" onClick={addRemoveFavorite}>
                            <span>Cancelled</span>
                        </Tag>
                    )}
                </div>
                <CardDetails>
                    <div className="title mt-2">{event.EventName}</div>
                    <div className=" category mt-2">
                        <MapPin size={30} color="#FF384E" weight="fill" />
                        <span>{event.Address || event.EventAddress}</span>
                    </div>
                    <div className="place mt-2">
                        {event.TicketPrice || event.IsFreeEvent ? (
                            <div
                                className={`price ${
                                    event.IsFreeEvent && 'free-event'
                                }`}
                            >
                                {event.IsFreeEvent
                                    ? 'FREE'
                                    : `$${event.TicketPrice} /per person`}
                            </div>
                        ) : (
                            <div />
                        )}
                        <div className="date">
                            {DateUtility.getDateTime(
                                event.EventStartDateTime,
                                DayJSDateFormat.dayMonth,
                            )}
                        </div>
                    </div>
                </CardDetails>
                {editMode && (
                    <div
                        className={`hover-container ${
                            disableHover && 'disabled'
                        }`}
                    >
                        <div className="edit-delete">
                            <div
                                className="mr-2"
                                onClick={() => {
                                    // setOpen(event.ProviderEventId)
                                }}
                            >
                                <OutlinedButton>
                                    <span className="view-sold-ticket">
                                        Sponsors
                                    </span>
                                </OutlinedButton>
                            </div>
                            <Link
                                to={`/events/sold-ticket/${event.ProviderEventId}`}
                            >
                                <OutlinedButton>
                                    <span className="view-sold-ticket">
                                        View Sold Ticket
                                    </span>
                                </OutlinedButton>
                            </Link>
                            <OutlinedButton
                                className="ml-2"
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    openDeleteModal(event)
                                }}
                            >
                                <Trash size={22} />
                            </OutlinedButton>
                            <Link to={`/events/edit/${event.ProviderEventId}`}>
                                <OutlinedButton className="ml-2">
                                    <GearSix size={22} />
                                </OutlinedButton>
                            </Link>
                        </div>
                    </div>
                )}
                {checkBox && (
                    <div className="d-flex justify-content-end">
                        <Checkbox checked={selected} onClick={onSelectEvent} />
                    </div>
                )}
            </CardLayout>
            {/* <PopUpModal
                title="Sponsor Ticket"
                open={open}
                onCancel={() => onClose()}
            >
                <div>
                    <TicketFormScreen ProviderEventId={open} />
                </div>
            </PopUpModal> */}
        </>
    )
}

export const EventList = ({
    events,
    goToDetail,
    fetchMoreData,
    hasMoreData,
    loading,
    imgHeight,
    editMode,
    refreshList,
    addGotoHome,
    hideGotoHomeBtn,
}) => {
    const { loading: authLoading } = useAuth()
    const [init, setInit] = useState(false)
    const navigate = useNavigate()
    const clickOnEvent = event => {
        navigate(`/events/${event.ProviderEventId}`)
    }
    const goToHome = () => {
        navigate(`/`)
    }
    useEffect(() => {
        const to = setTimeout(() => setInit(true), 750)

        return () => {
            if (to) clearTimeout(to)
        }
    }, [])

    return (
        <EventListContainer className="row">
            <Container
                dataLength={events?.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                className="row"
            >
                {events?.map((item, i) => (
                    <EventContainer
                        className="col-12 col-md-6 col-sm-12 col-lg-4"
                        key={item.ProviderEventId + i + item.EventName}
                        onClick={() => clickOnEvent(item)}
                        pointer
                    >
                        <div className="event-card">
                            <EventItemCard
                                event={item}
                                goToDetail={goToDetail}
                                imgHeight={imgHeight}
                                pointer
                                editMode={editMode}
                                refreshList={refreshList}
                            />
                        </div>
                    </EventContainer>
                ))}
                {(!init || loading) && (
                    <AppListSkeleton classStyle="col-12 col-md-4 col-sm-6 col-lg-4 mb-5" />
                )}
                {init && !authLoading && events?.length === 0 && !loading && (
                    <NoEvent>
                        No result found!
                        {!hideGotoHomeBtn && (
                            <div className="home-btn" onClick={goToHome}>
                                <span>Go to Home</span>
                            </div>
                        )}
                    </NoEvent>
                )}
            </Container>
            {!hideGotoHomeBtn && addGotoHome && events?.length > 0 && !loading && (
                <div className="home-btn" onClick={goToHome}>
                    <span>Go to Home</span>
                </div>
            )}
        </EventListContainer>
    )
}
