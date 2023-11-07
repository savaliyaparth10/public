import React, { useState } from 'react';
import { AppListSkeleton, CustomScrollY, ProfileContainer, EventItemCard, PopUpModal, PushNotification } from 'components';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GetMyEvent } from 'hooks';
import { EventsService, NotificationStatus, NotificationText } from 'utility';
import { RoundedCornerButton } from 'elements';
import { useNavigate } from 'react-router-dom';

const Container = styled(InfiniteScroll)`
    overflow: auto;
    background-size: cover;
    ${CustomScrollY};
`
const NoEvent = styled.div`
  margin: 100px auto;
  font-size: 48px;
  font-weight: normal;
  text-align: center;
`

export const MyEvents = ({ }) => {
  const { data: events, loading, fetchMoreData, hasMore, setData, favoriteEvent } = GetMyEvent();
  const [deleteModal, setDeleteModal] = useState(false)
  const [removeEventId, setRemoveEventId] = useState(false)

  const openDeleteModal = (id) => {
    setDeleteModal(true)
    setRemoveEventId(id)
  }

  const onRemove = async () => {
    try {
    await EventsService.removeEvent(removeEventId.ProviderEventId)
    setData(events.filter(item => item.ProviderEventId !== removeEventId.ProviderEventId))
    PushNotification(NotificationText.removed,NotificationStatus.success)
    } catch (error) {
      PushNotification(NotificationText.defaultError,NotificationStatus.error)
    }
    onCancel()
  }

  const onCancel = () => {
    setDeleteModal(false)
    setRemoveEventId("")
  }

  return (
    <>
      <div className="mb-5 mt-3 col-md-12">
        <div className="">
          <ProfileContainer>
            <MyEventList
              events={events}
              loading={loading}
              openDeleteModal={openDeleteModal}
              fetchMoreData={fetchMoreData}
              hasMoreData={hasMore}
              goToDetail
              editMode
              refreshList={favoriteEvent}
            />
            <PopUpModal open={deleteModal} onSubmit={onRemove} onCancel={onCancel}>
             <h2>Are You Sure To Want Delete Event ?</h2>
              <EventItemCard event={removeEventId} disableHover />
            </PopUpModal>
          </ProfileContainer>
        </div>
      </div>
    </>
  )
}

export const MyEventList = ({ events, goToDetail, fetchMoreData, hasMoreData, loading, editMode, openDeleteModal, imgHeight, loadMore, checkBox, onSelectEvent, pointer, selectedEvents = [], refreshList }) => {
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
          <div className="col-12 col-md-4 col-sm-6 col-lg-4 mb-md-5" key={item.ProviderEventId}>
            <EventItemCard
              event={item}
              goToDetail={goToDetail}
              editMode={editMode}
              openDeleteModal={openDeleteModal}
              imgHeight={imgHeight}
              checkBox={checkBox}
              goToDetailPage={() => goToDetailPage(item.ProviderEventId)}
              onSelectEvent={() => {
                if (onSelectEvent) onSelectEvent(item.ProviderEventId)
              }}
              pointer={pointer}
              selected={selectedEvents.includes(item.ProviderEventId)}
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