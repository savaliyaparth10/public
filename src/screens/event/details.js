import React from 'react'
import styled from 'styled-components'
import CoverImage from 'assets/default-cover.png'
import { EventDetails } from 'page-components/events/EventDetails'
import { GetPublicEventDetails } from 'hooks'
import { useParams } from 'react-router-dom'
import { Loader } from 'components'
import { Carousel } from 'antd'

const BookEventMain = styled.div`
    @media (width < 600px) {
        ${'' /* padding: 0px; */}
    }
`
const CoversImage = styled.div`
    width: 100%;
    padding: 10px;
    @media (width < 768px) {
        padding: 10px 0;
    }
`
const ImageTag = styled.img`
    width: 100% !important;
    aspect-ratio: 12/5;
    margin: 2rem 0 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.imgBg};
    @media (width < 768px) {
        margin: 0rem 0;
    }
`

const settings = {
    // className: 'center',
    // centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 1000,
    dots: true,
    autoplaySpeed: 3500,
    swipeToSlide: true,
    focusOnSelect: false,
    autoplay: true,
}

export const EventsDetailScreen = () => {
    const { id } = useParams()
    const { data, loading, fetchData } = GetPublicEventDetails(id)
    // const img =
    //     data?.EventImages?.filter(img => img.ImageCategoryId === 11)[0]?.Image ||
    //     CoverImage
    const imgs =
        data?.EventImages?.filter(img => img.ImageCategoryId === 11) ||
        [{ Image: CoverImage }]
    return (
        <BookEventMain className="container">
            <Carousel {...settings}>
                {imgs?.map((img, idx) =>
                    <CoversImage key={`event-img-${idx}`}>
                        <ImageTag src={img.Image} alt="" />
                    </CoversImage>)}
            </Carousel>
            <EventDetails data={data} refreshList={() => fetchData()} />
            {/* <DjLineup /> */}
            <Loader loading={loading} />
        </BookEventMain>
    )
}
