import React from 'react'
import { FlexColumn, ImageWithFallback, RedStripe } from './Common'
import { CalendarBlank, MapPin } from 'phosphor-react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import { ImagePlaceHolder } from './Placeholder'

const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 1000,
    dots: true,
    autoplaySpeed: 3500,
    swipeToSlide: true,
    focusOnSelect: false,
    autoplay: true,
}
const ImgCarousel = styled(Carousel)`
    .slick-dots {
        z-index: 1 !important;
    }
    .slick-dots li button:before,
    .slick-dots li.slick-active button:before {
        display: none !important;
        opacity: 0 !important;
    }
    .slick-dots li.slick-active button {
        background: ${({ theme }) => theme.colors.danger};
    }
`
const ImageContainer = styled.div`
    margin-top: 30px;
    aspect-ratio: 3/1;
    img {
        width: calc(100% - 15px) !important;
        border-radius: 20px;
        margin: 0 auto;
        aspect-ratio: 3/1;
    }
`
const Banner = styled.div`
    margin-top: 30px;
    outline: none;
    position: relative;
    .banner-image {
        aspect-ratio: 3/1;
        cursor: pointer;
    }
    img {
        width: calc(100% - 15px) !important;
        border-radius: 20px;
        margin: 0 auto;
        aspect-ratio: 3/1;
    }
    .banner-name {
        position: absolute;
        width: 90%;
        justify-content: space-between;
        font-size: 18px;
        bottom: 40px;
        margin-left: 50px;
        color: ${({ theme }) => theme.colors.white};
        display: flex;
        align-items: center;
    }
    .banner-btn {
        button {
            cursor: pointer;
            background: #ff384e;
            border-radius: 10px;
            padding: 14px 40px;
            border: 0;
        }
    }
    .banner-details {
        font-weight: 800;
        span {
            font-weight: 500;
        }
    }
    @media (min-width: 200px) and (max-width: 480px) {
        .banner-name {
            font-size: 12px;
            margin-left: 23px;
            bottom: -5px;
        }
        .banner-btn {
            display: none;
        }
        .banner-image {
            aspect-ratio: 16/9;
        }
        img {
            aspect-ratio: 16/9;
        }
    }
    @media (min-width: 480px) and (max-width: 579px) {
        .banner-name {
            font-size: 14px;
            margin-left: 23px;
            bottom: 20px;
        }
        .banner-btn {
            display: none;
        }
        .banner-image {
            aspect-ratio: 16/9;
        }
        img {
            aspect-ratio: 16/9;
        }
    }
    @media (min-width: 580px) and (max-width: 688px) {
        .banner-name {
            font-size: 14px;
            margin-left: 23px;
        }
        button {
            padding: 2px 4px !important;
        }
    }
    @media (min-width: 689px) and (max-width: 702px) {
        button {
            padding: 2px 4px !important;
        }
    }
    @media (max-width: 768px) {
        button {
            padding: 11px 11px !important;
        }
    }
`
export const FinalCarousel = ({ bannerList, loading, goToDetail }) => {
    return (
        <ImgCarousel {...settings}>
            {bannerList?.map(item => (
                <Banner
                    key={item.BannerId}
                    onClick={() => item.EventId !== 0 && goToDetail(item.EventId)}
                >
                    <ImageWithFallback
                        src={item.Banner}
                        alt="banner"
                        className="banner-image"
                    />
                    <div className="banner-name d-none">
                        <div className="banner-details">
                            <p className="mx-1">{item.BannerName}</p>
                            <p className="d-flex">
                                <span className="d-flex align-items-center">
                                    <CalendarBlank size={22} className="mx-1" />
                                    Friday, 30 December, 6:00 PM
                                </span>
                                <span className="d-flex align-items-center mx-4">
                                    <MapPin size={22} className="mx-1" />
                                    Rajpath Club
                                </span>
                            </p>
                        </div>
                        <div
                            className="banner-btn"
                            onClick={() => goToDetail(item.EventId)}
                        >
                            <button type="submit">Book now</button>
                        </div>
                    </div>
                </Banner>
            ))}
            {loading && (
                <ImageContainer>
                    <ImagePlaceHolder />
                </ImageContainer>
            )}
        </ImgCarousel>
    )
}

export const OfferCarousel = ({ bannerList, loading, goToDetail }) => {
    return (
        <ImgCarousel {...settings}>
            {bannerList?.map(item => (
                <Banner
                    key={item.SpotlightId}
                    onClick={() => goToDetail(item.SpotlightId)}
                >
                    <ImageWithFallback
                        src={item.ImageUrl}
                        alt="banner"
                        className="banner-image"
                    />
                    <div className="banner-name">
                        <div className="banner-details">
                            <p className="mx-1">{item.Title}</p>
                            <p className="d-flex">
                                <span className="d-flex align-items-center">
                                    {item.Title}
                                </span>
                            </p>
                        </div>
                        <FlexColumn className="align-items-center">
                        <RedStripe className="p-2 font-16">
                            {item.SubTitle}
                        </RedStripe>
                        </FlexColumn>
                    </div>
                </Banner>
            ))}
            {loading && (
                <ImageContainer>
                    <ImagePlaceHolder />
                </ImageContainer>
            )}
        </ImgCarousel>
    )
}