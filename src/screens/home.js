import React, { useEffect } from 'react'
import { FinalCarousel } from 'components'
import { GetEventBannerList, GetUpcomingEventList } from 'hooks'
import { EventCategoryList, UpcomingEventList } from 'page-components'
import { useNavigate } from 'react-router-dom'
import { CommanContainer } from 'elements'
import { useAuth } from 'context'

export const Home = () => {
    const { state } = useAuth()
    const {
        data: events,
        loading,
        fetchMoreData,
        hasMore,
        filterChanged,
        favoriteEvent,
    } = GetUpcomingEventList()
    const {
        data: bannerList,
        loading: bannerLoading,
        fetchData: fetchBanner,
    } = GetEventBannerList()
    const navigate = useNavigate()
    const cateList = [
        { label: 'Music' },
        { label: 'Drama' },
        { label: 'Movie' },
        { label: 'Party' },
    ]

    const goToDetail = id => {
        navigate(`/events/${id}`)
    }
    useEffect(() => {
        if (state) {
            filterChanged({}, true)
            setTimeout(() => fetchBanner())
        }
    }, [state?.StateId])
    return (
        <>
            <FinalCarousel
                bannerList={bannerList}
                goToDetail={goToDetail}
                loading={bannerLoading}
            />
            <CommanContainer className="container">
                <UpcomingEventList
                    hideGotoHomeBtn
                    events={events}
                    loading={loading}
                    goToDetail={goToDetail}
                    fetchMoreData={fetchMoreData}
                    hasMoreData={hasMore}
                    refreshList={favoriteEvent}
                />
                <div className="mb-4">
                    <EventCategoryList categoryList={cateList} />
                </div>
            </CommanContainer>
        </>
    )
}
