import { useAuth } from 'context'
import { CommanContainer } from 'elements'
import { GetPublicEventList } from 'hooks'
import { PublicEventList } from 'page-components'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const EventsListScreen = () => {
  const { state } = useAuth();
  const { data: events, loading, fetchMoreData, hasMore, filterChanged, favoriteEvent } = GetPublicEventList();
  const navigate = useNavigate()

  const goToDetail = (id) => {
    navigate(`/events/${id}`)
  }
  useEffect(() => {
    filterChanged({});
  }, [state])
  return (
    <CommanContainer className="container">
      <PublicEventList
        events={events}
        loading={loading}
        goToDetail={goToDetail}
        fetchMoreData={fetchMoreData}
        hasMoreData={hasMore}
        refreshList={favoriteEvent}
      />
    </CommanContainer>
  )
}
