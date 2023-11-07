import { CalendarBlank, MapPin, Star } from 'phosphor-react';
import React from 'react'
import Slider from "react-slick";
import styled from 'styled-components';
import { ImageWithFallback } from './Common';
import { ImagePlaceHolder } from './Placeholder';

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  slidesToShow: 1,
  speed: 500,
  dots: true,
  autoplaySpeed: 100,
  swipeToSlide: true,
  focusOnSelect: false,
};

const contentStyle = {
  width: '100%',
  aspectRatio: '3/1',
};

const SliderWrapper = styled(Slider)`
    background: ${({ theme }) => theme.colors.secondary};
    .banner {
      outline:none;
      position: relative;
      img {
        margin: 0 10px;
        width: calc(100% - 20px) !important;
        border-radius: 20px;
      }
    }
    .banner-name{
      position: absolute;
      font-size:18px;
      bottom: 40px;
      margin-left: 50px;
      color: ${({ theme }) => theme.colors.white}
    }
    .slick-dots {
      bottom:0px;
    }
    overflow:hidden;
`
const SliderContainer = styled.div`
  position: relative;
  margin-top: 25px;
  .slick-list {
    padding: 0 calc((100% - 1320px) / 2) !important;
    height: calc(1320px / 3) !important;
    .slick-track {
      width: calc(1320px * 6);
      transform: translate3d(-3960px , 0px, 0px) !important;
    }
  }
  .slick-slide{
    width: 1320px !important;
    height: calc(1320px / 3) !important;
  }
  .slick-slide.slick-active {
    aspect-ratio: 3/1;
    max-width: 1320px;
    height: calc(1320px / 3) !important;
  }
  @media (max-width: 1400px)  {
    .slick-list {
      padding: 0 calc((100% - 1140px) / 2) !important;
      height: calc(1140px / 3) !important;
      .slick-track {
        width: calc(1140px * 6);
        transform: translate3d(-3420px, 0px, 0px) !important;
      }
    }
    .slick-slide{
      width: 1140px !important;
      height: calc(1140px / 3) !important;
    }
    .slick-slide.slick-active {
      max-width: 1140px;
    }
  }
  @media (max-width: 1199px)  {
    .slick-list {
      padding: 0 calc((100% - 960px) / 2) !important;
       height: calc(960px / 3) !important;
      .slick-track {
        width: calc(960px * 6) !important;
        transform: translate3d(-2880px, 0px, 0px) !important;
      }
    }
    .slick-slide{
      width: 960px !important;
      height: calc(960px / 3) !important;
    }
    .slick-slide.slick-active {
      max-width: 960px;
    }
  }
  @media (max-width: 992px)  {
    .slick-list {
      padding: 0 calc((100% - 720px) / 2) !important;
      height: calc(720px / 3) !important;
      .slick-track {
        width: calc(720px * 6) !important;
        transform: translate3d(-2160px, 0px, 0px) !important;
      }
    }
    .slick-slide{
      width: 720px !important;
      height: calc(720px / 3) !important;
    }
    .slick-slide.slick-active {
      max-width: 720px;
    }
  }
  @media (max-width: 768px)  {
    .slick-list {
      padding: 0 calc((100% - 540px) / 2) !important;
      max-height: calc(540px / 3) !important;
      .slick-track {
        max-width: calc(540px * 6) !important;
        transform: translate3d(-1620px, 0px, 0px) !important;
      }
    }
    .slick-slide{
      max-width: 540px !important;
      max-height: calc(540px / 3) !important;
    }
    .slick-slide.slick-active {
      max-width: 540px;
    }
  }
`
export const CarouselSlider = ({ bannerList, loading }) => {
  return (
    <SliderContainer>
      <SliderWrapper {...settings} className="">
        {bannerList?.map((item) =>
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
          </div>)}
      </SliderWrapper>
      {loading && <div style={contentStyle}><ImagePlaceHolder /></div>}
    </SliderContainer>
  )
}