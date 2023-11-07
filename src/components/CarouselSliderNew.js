import React from 'react'
import styled from 'styled-components'
import { Carousel } from '3d-react-carousal'
import { ImageWithFallback } from './Common'
import { CalendarBlank, MapPin, Star } from 'phosphor-react'

// const slides = [
//     <img src="https://picsum.photos/800/300/?random" alt="1" />,
//     <img src="https://picsum.photos/800/301/?random" alt="2" />,
//     <img src="https://picsum.photos/800/302/?random" alt="3" />,
//     <img src="https://picsum.photos/800/303/?random" alt="4" />,
//     <img src="https://picsum.photos/800/304/?random" alt="5" />,
// ]

const CarousalMain = styled.div`
    max-width: 1320px;
    margin: 0 auto 80px;
    aspect-ratio: 3/1;
    .slider-left {
        display: none !important;
    }
    .slider-right {
        display: none !important;
    }
    .react-3d-carousel .slider-container .slider-content {
        position: relative;
        left: 50%;
        top: 50%;
        width: 100%;
        height: 100%;
        transform: translateX(-50%);
    }
    .slider-content {
        top: 40px !important;
    }
    .react-3d-carousel .slider-container .slider-content .slider-single .slider-single-content img{
        aspect-ratio: 2/1;
        border-radius: 10px ;
    }
    .banner {
        outline:none;
        position: relative;
        width: calc(100% - 15rem);
        img {
            margin: 0 10px;
            width: 100% !important;
            border-radius: 20px;
            aspect-ratio: 2/1;
        }
    }
    .banner-name{
      position: absolute;
      font-size:18px;
      bottom: 20px;
      margin-left: 50px;
      color: ${({ theme }) => theme.colors.white}
    }
    @media (max-width: 1400px)  {
       max-width: 1140px;
       margin: 0 auto 70px;
    }
    @media (max-width: 1199px)  {
       max-width: 960px;
       margin: 0 auto 50px;
    }
    @media (max-width: 992px)  {
       max-width: 720px;
       margin: 0 auto 40px;
    }
    @media (max-width: 768px)  {
       max-width: 540px;
       margin: 0 auto 30px;
    }
`
export const CarouselSliderNew = ({ bannerList }) => {
    // const slides = bannerList.map((banner) => <img src={banner.Banner} alt="1" />)
    const contentStyle = {
        aspectRatio: '2/1',
    };
    return (
        <CarousalMain>
            <Carousel
                slides={bannerList.map((item) => (
                    <div className="banner" key={item.BannerId}>
                        <ImageWithFallback src={item.Banner} alt="banner" style={contentStyle} />
                        <div className="banner-name">
                            <p className="mx-1">{item.BannerName}</p>
                            <p className="d-flex">
                                <span className="d-flex align-items-center">
                                    <CalendarBlank size={22} className="mx-1" />Friday, 30 December, 6:00 PM
                                </span>
                                <span className="d-flex align-items-center mx-4">
                                    <MapPin size={22} className="mx-1" />Rajpath Club
                                </span>
                                <span className="d-flex align-items-center mx-4">
                                    <Star size={22} className="mx-1" />Business
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
                interval={1000} />
        </CarousalMain>
    )
}
