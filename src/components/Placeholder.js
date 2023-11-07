import { Skeleton } from "antd";
import { useMemo } from "react";
import styled from "styled-components";

const CardLayout = styled.div`
    box-shadow: 0px 5px 25px rgba(57, 57, 72, 0.05);
	border-radius: 10px;
    position: relative;
    height: 385px;
    display:flex;
    flex-direction:column;  
    .img-container {
        height : 100%;
        img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            overflow: hidden;
            aspect-ratio: 1 / 1;
        }
    }
    .card-details {
        position : absolute;
        bottom: 0;
        left : 0;
        width : 100%;
        padding : 10px;
    }
      
    .tag-freeEvent {
        float: right;
        position: relative;
    }

    .ant-skeleton-image {
        height: 400px !important;
        width:100% !important;
        border-radius: 10px !important;
    }
`

const ImageContainer = styled.div`
    width:100%;
    height:100%;
    .ant-skeleton {
        width:100%;
        height:100%;
    }
    .ant-skeleton-image {
        height: 100% !important;
        width:100% !important;
        border-radius: 10px !important;
     }
`

export function AppListSkeleton({ size = 8, classStyle }) {
    const lines = useMemo(() => Array.from({ length: size }, (_, k) => k), [size]);

    return (
        <>
            {lines.map((line) => (
                <div className={classStyle} key={line}>
                <CardLayout>
                    <Skeleton.Image active />
                    <div className="mt-2  tag-freeEvent"><Skeleton.Button size="small" /></div>
                    <div className="card-details">
                        <div className="mt-2"><Skeleton.Input size="small" /></div>
                        <div className="mt-2"><Skeleton.Input size="small" /></div>
                        <div className="mt-2"><Skeleton.Input size="small" /></div>
                        <div className="mt-2"><Skeleton.Input size="small" /></div>
                    </div>
                </CardLayout>
                </div>
            ))}
        </>
    )
}

export function OrderListSkeleton({ size = 8, classStyle }) {
    const lines = useMemo(() => Array.from({ length: size }, (_, k) => k), [size]);

    return (
        <>
            {lines.map((line) => (
                <div className={classStyle} key={line}>
                <div>
                    <Skeleton.Image active />
                    <div className="card-details">
                        <div className="mt-2  tag-freeEvent"><Skeleton.Button size="small" /></div>
                        <div className="mt-2"><Skeleton.Input size="small" /></div>
                        <div className="mt-2"><Skeleton.Input size="small" /></div>
                        <div className="mt-2"><Skeleton.Input size="small" /></div>
                        <div className="mt-2"><Skeleton.Input size="small" /></div>
                        <div className="mt-2"><Skeleton.Input block size="large" /></div>
                    </div>
                </div>
                </div>
            ))}
        </>
    )
}

export const ImagePlaceHolder = () => {
    return (
        <ImageContainer>
            <Skeleton.Image active />
        </ImageContainer>
    )
}