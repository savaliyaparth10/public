import { useAuth } from 'context'
import { CommanContainer } from 'elements'
import { GetCategoryList, SearchEvent } from 'hooks'
import { PublicEventList } from 'page-components'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const SearchEventScreen = () => {
  const { state } = useAuth();
  const [categoryIds, setCategoryIds] = useState(null);
  const { data: events, loading, fetchMoreData, hasMore, filterChanged, favoriteEvent } = SearchEvent();
  const { data: categoryList } = GetCategoryList()
  const navigate = useNavigate()
  const { category } = useParams()
  const goToDetail = (id) => {
    navigate(`/events/${id}`)
  }
  useEffect(() => {
    if (categoryIds && state) filterChanged({ CategoryId: categoryIds });
  }, [state, categoryIds])
  useEffect(() => {
    const ids = categoryList.filter(c => c.CategoryName === category).map(c => c?.CategoryId).join(';');
    setCategoryIds(ids);
  }, [categoryList])
  return (
    <CommanContainer className="container">
      <PublicEventList
        addGotoHome
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
