import React from 'react';
import { AppListSkeleton, CustomScrollY, ProfileContainer, EventItemCard } from 'components';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GetFavoriteEvents } from 'hooks';
import { RoundedCornerButton } from 'elements';
import { useNavigate } from 'react-router-dom';

const Container = styled(InfiniteScroll)`
    height: 58.7rem;
    overflow: auto;
    background-size: cover;
    }
    ${CustomScrollY};
`
const NoEvent = styled.div`
  margin: 100px auto;
  font-size: 48px;
  font-weight: normal;
  text-align: center;
`
export const FavoriteEvents = ({ }) => {
  const { data: events, loading, fetchMoreData, hasMore, favoriteEvent } = GetFavoriteEvents();
  return (
    <>
      <div className="mb-5 mt-3 col-md-12">
        <div className="">
          <ProfileContainer>
            <FavoriteEventsList
              events={events}
              loading={loading}
              fetchMoreData={fetchMoreData}
              hasMoreData={hasMore}
              goToDetail
              refreshList={favoriteEvent}
            // editMode
            />
          </ProfileContainer>
        </div>
      </div>
    </>
  )
}

export const FavoriteEventsList = ({ events, goToDetail, fetchMoreData, hasMoreData, loading, editMode, imgHeight, loadMore, checkBox, pointer, refreshList }) => {
  const navigate = useNavigate()
  const goToDetailPage = (id) => {
    if (goToDetail) {
      navigate(`/events/${id}`)
    }
  }

  return (
    <div className="row">
      <Container
        dataLength={events?.length}
        next={fetchMoreData}
        hasMore={hasMoreData}
        className="row"
      >
        {events?.map((item) => (
          <div
            className="col-12 col-md-4 col-sm-6 col-lg-4 mb-md-5"
            key={item.ProviderEventId}
          >
            <EventItemCard
              event={item}
              goToDetail={goToDetail}
              editMode={editMode}
              imgHeight={imgHeight}
              checkBox={checkBox}
              goToDetailPage={() => goToDetailPage(item.ProviderEventId)}
              pointer={pointer}
              refreshList={refreshList}
            />
          </div>))}
        {loading && <AppListSkeleton classStyle="col-12 col-md-4 col-sm-6 col-lg-4 mb-5" />}
        {events?.length === 0 && !loading && <NoEvent> No result found! </NoEvent>}
        {loadMore && <div className="d-flex justify-content-center"><RoundedCornerButton className="col-5" onClick={fetchMoreData}>
          Load More
        </RoundedCornerButton></div>}
      </Container>
    </div>
  )
}