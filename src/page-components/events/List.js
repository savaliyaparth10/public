import {
    EventList,
    FlexRow,
    FlexRowBetween,
    FlexRowWrap,
    ImageWithFallback,
} from 'components'
import { FormSelectionFieldWithoutControl, RoundedCornerButton } from 'elements'
import {
    Confetti,
    ListPlus,
    MaskHappy,
    MusicNotes,
    Ticket,
    Trash,
} from 'phosphor-react'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Routes } from 'utility'
import { Collapse, Tag, Dropdown, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { useAuth } from 'context'
import { useLayout } from 'layout'

const { Panel } = Collapse

const Filter = [
    { title: 'All', key: 'all' },
    { title: 'Free', key: 'free' },
    { title: 'Paid', key: 'paid' },
]

const FilterEvents = ({ filterChanged }) => {
    const [seletedFilter, setSelectedFilter] = useState('all')
    const onSelect = key => {
        setSelectedFilter(key)
        filterChanged(key)
    }
    return (
        <FlexRow className="justify-content-end filter">
            {Filter?.map(item => (
                <RoundedCornerButton
                    selected={seletedFilter === item.key}
                    key={item.key}
                    className="mx-1"
                    onClick={() => onSelect(item.key)}
                >
                    {item.title}
                </RoundedCornerButton>
            ))}
        </FlexRow>
    )
}

export const PublicEventList = ({
    addGotoHome,
    events,
    goToDetail,
    fetchMoreData,
    hasMoreData,
    loading,
    refreshList,
}) => {
    const { toggleModal } = useLayout()
    const { profile } = useAuth();
    const navigate = useNavigate()
    const menuClick = (url, auth) => {
        if (auth) {
            toggleModal(auth)
        } else if (url) {
            navigate(url)
        }
    }
    return (
        <div>
            <FlexRowBetween className="">
            <h2 className="d-flex align-items-center">Events</h2>
            {profile && <RoundedCornerButton className="mb-2 " selected onClick={() => menuClick(Routes.addEvent)}>
                    Add Events
                </RoundedCornerButton>}
                </FlexRowBetween>
            <EventList
                addGotoHome={addGotoHome}
                events={events}
                goToDetail={goToDetail}
                fetchMoreData={fetchMoreData}
                hasMoreData={hasMoreData}
                loading={loading}
                refreshList={refreshList}
            />
        </div>
    )
}

const HeaderWithFilter = styled.div`
    align-items: center;
    .state-dropdown {
        padding: 8px 10px;
        border: 1px solid ${({ theme }) => theme.colors.danger};
        border-radius: 4px;
    }
    .ant-form-item {
        width: auto;
        min-width: 200px;
        display: flex;
        justify-content: center;
        .ant-form-item-row {
            min-width: 200px;
        }
        .ant-select-selector {
            height: 35px !important;
            box-shadow: none !important;
            background: #252a33 !important;
            border-color: #252a33 !important;
            .ant-select-selection-search input,
            .ant-select-selection-item {
                background: #252a33 !important;
                ${'' /* color: #fff !important; */}
            }
        }
        .ant-select-arrow {
                height: unset;
                margin-top: -10px;
            }
        .ant-select-single.ant-select-open .ant-select-selection-item {
            color: #fff5 !important;
        }
    }
    @media (width < 768px) {
        text-align: center;
        .filter {
            justify-content: center !important;
            span {
                line-height: 20px;
                margin-top: 4px;
            }
        }
        .state {
            height: 40px;
            overflow: visible;
            margin-top: 10px;
        }
    }
`
const EventTag = styled(Tag)`
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 5px;
    color: white;
`

export const UpcomingEventList = ({
    hideGotoHomeBtn,
    events,
    goToDetail,
    fetchMoreData,
    hasMoreData,
    loading,
    refreshList,
}) => {
    const [filter, setFilter] = useState('all')
    const { state, setState, stateList,profile } = useAuth();
    const { toggleModal } = useLayout()
    const navigate = useNavigate()
    const filteredEventList = useMemo(() => {
        let eventList = []
        switch (filter) {
            case 'all':
                eventList = events
                break
            case 'free':
                eventList = events.filter(item => item.IsFreeEvent === true)
                break
            case 'paid':
                eventList = events.filter(item => item.IsFreeEvent === false)
                break
            default:
                eventList = events
        }
        return eventList
    }, [filter, events])

    const menuClick = (url, auth) => {
        if (auth) {
            toggleModal(auth)
        } else if (url) {
            navigate(url)
        }
    }

    return (
        <div>
            <HeaderWithFilter className="mt-3 row d-flex justify-content-between">
                <div className="col-md-3 col-sm-12 mb-2">
                {profile && <RoundedCornerButton selected onClick={() => menuClick(Routes.addEvent)}>
                    Add Events
                </RoundedCornerButton>}
                </div>
                <div className="col-md-6 col-sm-12 d-flex justify-content-center justify-content-md-center align-items-center">
                    <h2 className="pe-2">Upcoming Event List</h2>
                    <div className="state ms-4 d-none d-md-block">
                        {stateList?.length > 0 && (
                            <FormSelectionFieldWithoutControl
                                showSearch
                                name="state"
                                placeholder="Select State"
                                value={state?.value ? state : undefined}
                                options={stateList?.map((s) => ({ label: s.StateName, value: s.StateId.toString(), ...s }))}
                                onChange={(d) => setState(d)}
                            />
                        )}
                        {false && stateList?.length > 0 && (
                            <Dropdown
                                className="state-dropdown"
                                trigger={['click']}
                                menu={{
                                    items: stateList.map((s) => ({ label: s.StateName, key: s.StateId.toString() })),
                                    selectable: true,
                                    selectedKeys: [state.StateId?.toString()],
                                    // onSelect: ({ key }) => {
                                    //     // setStateId(key)
                                    // },
                                }}
                            >
                                <Typography.Link>
                                    <Space style={{ fontSize: '20px;' }}>
                                        {
                                            stateList.find(
                                                item => item.StateId.toString() === state.StateId?.toString(),
                                            )?.StateName
                                        }
                                        <DownOutlined />
                                    </Space>
                                </Typography.Link>
                            </Dropdown>
                        )}
                    </div>
                </div>
                <div className="col-sm-12 state d-sm-block d-md-none">
                    {stateList?.length > 0 && (
                        <FormSelectionFieldWithoutControl
                            showSearch
                            name="stateId"
                            placeholder="Select State"
                            value={state?.value ? state : undefined}
                            options={stateList?.map((s) => ({ label: s.StateName, value: s.StateId.toString(), ...s }))}
                            onChange={(d) => setState(d)}
                        />
                    )}
                    {false && stateList?.length > 0 && (
                        <Dropdown
                            className="state-dropdown"
                            menu={{
                                items: stateList.map((s) => ({ label: s.StateName, key: s.StateId.toString() })),
                                selectable: false,
                                selectedKeys: [state.StateId?.toString()],
                                // onSelect: ({ key }) => {
                                //     setStateId(key)
                                // },
                            }}
                        >
                            <Typography.Link>
                                <Space style={{ fontSize: '20px;' }}>
                                    {
                                        stateList.find(
                                            item => item.StateId.toString() === state.StateId?.toString(),
                                        )?.StateName
                                    }
                                    <DownOutlined />
                                </Space>
                            </Typography.Link>
                        </Dropdown>
                    )}
                </div>
                <h2 className="col-md-3 col-sm-12">
                    <FilterEvents filterChanged={key => setFilter(key)} />{' '}
                </h2>
            </HeaderWithFilter>
            <EventList
                hideGotoHomeBtn={hideGotoHomeBtn}
                events={filteredEventList}
                goToDetail={goToDetail}
                fetchMoreData={fetchMoreData}
                loading={loading}
                refreshList={refreshList}
                hasMoreData={hasMoreData}
            // editMode
            />
                {/* <TextCenter>
                    <RoundedCornerButton
                        className="col-sm-6 col-md-3 my-2"
                        color={theme.colors.gray}
                        onClick={fetchMoreData}
                        disabled={!hasMoreData}
                    >
                        Load More
                    </RoundedCornerButton>
                </TextCenter> */}
        </div>
    )
}

const Card = styled.div`
    min-height: ${({ height }) => (!height ? 144 : height)}px;
    background: #242631;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 1.4rem;
    &:hover {
    }
    p {
        color: #b9bbbf;
    }
`
const TeamCard = styled.div`
    .ant-collapse-content {
        background: ${({ theme }) => theme.colors.background};
    }
`

const CategoryCard = ({ item, goToEvents }) => {
    return (
        <Card
            onClick={() => goToEvents(item)}
            className="d-flex flex-column align-items-center justify-content-center"
        >
            {item.label === 'Music' && (
                <MusicNotes size={28} color="#ffffff" weight="fill" />
            )}
            {item.label === 'Drama' && (
                <MaskHappy size={28} color="#ffffff" weight="fill" />
            )}
            {item.label === 'Movie' && (
                <Ticket size={28} color="#ffffff" weight="fill" />
            )}
            {item.label === 'Party' && (
                <Confetti size={28} color="#ffffff" weight="fill" />
            )}
            <p>{item.label}</p>
        </Card>
    )
}

export const EventCategoryList = ({ categoryList }) => {
    const navigate = useNavigate()
    const goToEvents = item => {
        navigate(`/events/category/${item.label}`)
    }
    return (
        <div className="">
            <h2>Events Categories</h2>
            <div className="row">
                {categoryList?.map(item => (
                    <div className=" col-sm-6 col-md-3 " key={item.label}>
                        <CategoryCard item={item} goToEvents={goToEvents} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const TeamMemberCard = ({ item, onAdd, onRemove, deAssignEvent }) => {
    return (
        <TeamCard>
            <Collapse>
                <Panel
                    header={
                        <div className="d-flex align-items-center">
                            <ImageWithFallback
                                src={item.ProfilePicture}
                                height="25"
                                width="25"
                                className="mr-2"
                            />
                            {item.MemberEmail}
                        </div>
                    }
                    key="1"
                    ghost
                    extra={
                        <>
                            <ListPlus
                                size={22}
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onAdd(item)
                                }}
                            />
                            <Trash
                                className="ml-2"
                                size={22}
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onRemove(item)
                                }}
                            />
                        </>
                    }
                >
                    {item.Events?.length ? (
                        <>
                            <p className="mt-0">Assigned Events</p>
                            <FlexRowWrap>
                                {' '}
                                {item.Events.map((item, i) => {
                                    return (
                                        <EventTag
                                            onClose={deAssignEvent}
                                            key={`${item.EventName}${i}`}
                                        >
                                            {item.EventName}{' '}
                                        </EventTag>
                                    )
                                })}
                            </FlexRowWrap>
                        </>
                    ) : (
                        <p className="d-flex">No Assigned Events Found</p>
                    )}
                </Panel>
            </Collapse>
        </TeamCard>
    )
}

export const TeamList = ({ teamList, onAdd, onRemove, deAssignEvent }) => {
    return (
        <div className="">
            <div className="row">
                {teamList?.map(item => (
                    <div className="col-4 mb-2" key={item.label}>
                        <TeamMemberCard
                            onAdd={onAdd}
                            onRemove={onRemove}
                            item={item}
                            deAssignEvent={deAssignEvent}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
