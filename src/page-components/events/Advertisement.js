import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'antd'
// import ImageIcon from '../../assets/Icons/Image.svg'
const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3, // Adjust the number of visible slides as per your preference
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
}

const AdvertisementMain = styled.div`
    border-radius: 14px;
    background: #242631;
    border: 1px solid rgba(166, 166, 166, 0.09);
    padding: 1.5rem;
    .heading {
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        margin: 0;
        padding-bottom: 0.5rem; 
    }
`
const AdsCarousel = styled(Carousel)`
    margin-top: 1rem;
    ${'' /* overflow: hidden; */}
    ${'' /* .advertisement-card {
        display: grid;
        place-content: center;
        margin-bottom: 1.2rem;
    } */}
    .ads-img {
        aspect-ratio: 16/9;
        border-radius: 10px;
        background: #2d303f;
        width: 100%;
        margin-bottom: 1.2rem;
    }
    .ads-pointer {
        cursor:pointer;
    }
`

export const Advertisement = ({ data }) => {
    console.log("Advertisement => ", data?.AdData)
    if (!data?.AdData || data?.AdData.length === 0) return null;
    const n = 3;
    return (
        <AdvertisementMain>
            <h6 className="heading">Advertisement</h6>
            <AdsCarousel
                {...settings}
                slidesToShow={data.AdData.length > n ? n : data.AdData.length}
                autoplay={data.AdData.length > n}
                infinite={data.AdData.length > n}>
                {data?.AdData.map(ad => (
                    <img key={`ad-${ad.Id}`} className={`ads-img ${ad.WebUrl && 'ads-pointer'}`} onClick={() => ad.WebUrl && window.open(ad.WebUrl, "_blank")} src={ad.ImageUrl} alt="" />
                ))}
                {!(data.AdData.length > n) && <div />}
            </AdsCarousel>
        </AdvertisementMain>
    )
}
