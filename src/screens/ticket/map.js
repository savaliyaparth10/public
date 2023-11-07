import { OrderSummary } from 'hooks';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'

const MapOuter = styled.div`
    position: relative;
    text-align: center;
    min-height: 510px;
    width: 100%;
    margin-top: 50px;
    .gmap_canvas {
        overflow: hidden;
        background: none !important;
        min-height: 510px;
        width: 100%;
    }
    .gmap_canvas ifram {
        margin: 0 auto;
    }
    .btn-group {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .back-btn {
        width: 220px;
        margin-right: 10px;
        padding: 12px 12px;
        background: #4a4c5e;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
    }
    .home-btn {
        width: 220px;
        margin-left: 5px;
        padding: 12px;
        background: #ff384e;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        padding: 1rem;
    }
    @media (min-width: 481px) and (max-width: 768px) {
        padding: 1rem;
    }
`
export const MapScreen = () => {
    const { ticketBucketId } = useParams();
    const query = new URLSearchParams(window.location.search);
    const lat = query.get("lat");
    const long = query.get("long");
    const { data } = OrderSummary(ticketBucketId);
    const navigate = useNavigate()
    const goToHome = () => {
        navigate(`/`)
    }
    // const clickOnBack = () => {
    //     navigate(-1)
    // }
    return (
        <MapOuter>
            <div className="gmap_canvas">
                <iframe
                    src={`https://maps.google.com/maps?q=${lat},${long}&t=${data.EventLocaiton || ''}&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="600"
                    height="450"
                    title={data.EventLocaiton}
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                />
                <div className="btn-group">
                    {/* <div className="back-btn" onClick={clickOnBack}>
                        <span>Back</span>
                    </div> */}
                    <div className="home-btn" onClick={goToHome}>
                        <span>Go to Home</span>
                    </div>
                </div>
            </div>
        </MapOuter>
    )
}
