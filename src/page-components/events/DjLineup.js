import React, { useState } from 'react'
import { data } from '../../screens/data/djData'
import { Modal } from 'antd'
import styled from 'styled-components'
import { BuyTicketModal } from 'components/BuyTicketModal'

const DjHeading = styled.h2`
  @media (width < 600px) {
        padding: 0px 10px;
    }
`
const DjSection = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 40px;
    margin-bottom: 100px;
    @media (width < 600px) {
        flex-wrap: nowrap;
        gap: 5px;
        overflow-x: auto;
        margin-bottom: 35px;
    }
`
const DjDetails = styled.div`
    min-width: 180px;
    padding: 10px;
`
const DjImage = styled.div`
    width: 100%;
    border-radius: 14px;
`
const DjName = styled.div`
    font-weight: 600;
    font-size: 18px;
`
const DjTime = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: #a6a6a6;
`
const MobileBtn = styled.div`
    @media (width > 600px) {
     display: none;
    }
    margin-bottom: 20px;
`
const BuyNowBtn = styled.div`
    padding: 15px;
    width: 100%;
    background: #ff384e;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
`
export const DjLineup = () => {
        const [isModalOpen, setIsModalOpen] = useState(false)
        const showModal = () => {
            setIsModalOpen(true)
        }
        const handleOk = () => {
            setIsModalOpen(false)
        }
        const handleCancel = () => {
            setIsModalOpen(false)
        }
    return (

        <>
            <DjHeading>Dj Lineup</DjHeading>
            <DjSection>
                {data.map(({ name, image, time }) => (
                    <DjDetails>
                        <DjImage>
                            <img src={image} alt="" />
                        </DjImage>
                        <DjName>{name}</DjName>
                        <DjTime>{time}</DjTime>
                    </DjDetails>
                ))}
            </DjSection>
            <MobileBtn>
                <BuyNowBtn onClick={showModal}>
                    <span>Buy Now</span>
                </BuyNowBtn>
            </MobileBtn>
            <Modal
                title="Select tickets categories"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={null}
            >
                <BuyTicketModal />
            </Modal>
        </>
    )
}
