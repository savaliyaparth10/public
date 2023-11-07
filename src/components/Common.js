// import { Skeleton } from "antd";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import styled,{ css } from "styled-components";
import { NotificationStatus } from "utility";

export const FlexBox = styled.div`
  display:flex;
`

export const FlexRow = styled(FlexBox)`
  flex-direction:row;
`
export const FlexColumn = styled(FlexBox)`
    flex-direction: column;
`
export const TextCenter = styled.div`
  text-align:center;
  display:flex;
  justify-content:center;
`
export const FlexRowBetween = styled(FlexRow)`
  justify-content:space-between;
`
export const Line = styled.div`
    width: 100%;
    height: 2px;
    background: #e7eaf9;
    border: solid 0.5px #e7eaf9;
`
export const FlexRowWrap = styled(FlexRow)`
    flex-wrap:wrap;
`

export const DangerText = styled.div`
    color: red;
`

export const RedStripe = styled.div`
background: ${({ theme }) => theme.colors.red};
border-radius: 0.5rem;
`

export const ImageContainer = styled.img`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`

export const CustomScrollY = css`
  ::-webkit-scrollbar {
    width: 0.2rem !important;
  }
`
export const ProfileContainer = styled.div`
border-radius: 10px;
box-shadow: 0px 0px 11px rgb(47 44 44);
padding: 19px;
background-color: ${({ theme }) => theme.colors.primary};
`
// const SkeletonImage = styled(Skeleton.Image)`
//   width:100% !important;
//   height: 100% !important;
//   .ant-skeleton-image  {
//     width:100% !important;
//     height: 100% !important;
//   }
// `
// const LoaderConatiner = styled.div`
//   height:100%;
// `

export function ImageWithFallback({ fallback = "images/event/event.jpg",src,height,width,...rest }) {
  const [imgSrc,setImgSrc] = useState("")
  const onError = () => setImgSrc(fallback)

  useEffect(() => {
    setImgSrc(src || fallback)
  },[src])

  return (
    <>
      <ImageContainer
        src={imgSrc}
        onError={onError}
        height={height}
        width={width}
        {...rest}
      />
    </>
  )
}

export function PushNotification(text, status) {
  switch (status) {
    case NotificationStatus.success: toast.success(text, { type: "success" }); break;
    case NotificationStatus.error: toast.error(text, { type: "error" }); break;
    default: toast(text); break;
  }
}