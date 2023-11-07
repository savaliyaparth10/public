import React,{ useState,useMemo,useEffect } from 'react'
import styled from 'styled-components'
import '../screens/Css/BuyTicketModal.css'
import { PrimaryButton } from 'elements'
import { Segmented } from 'antd'
import { OfferCartService } from 'utility'
import { BrowserUtility } from 'utility/browser-utility'

const ModalContainer = styled.div`
    overflow-x: visible;
    width: 100%;
    padding: 20px;
    border-top: 2px solid #a6a6a669;
    .ant-segmented,ant-segmented-group {
        background: ${({ theme }) => theme.colors.secondary};
    }
    .ant-segmented-item-selected {
        background: ${({ theme }) => theme.colors.danger};
    }
    .ant-segmented-group {
        // display:block;
    }
`
const ModalWrapper = styled.div`
    background: #242631;
    border-radius: 14px;
    padding: 13px 20px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    .item-price{
        color: #a6a6a6;
        width: 80px;
        text-align: right;
        span {
            color: #a6a6a6;
        }
    }
`

const ErrorMessageConstant = {
    "ERR-ALREADY-ADDED-IT": "An item from this offer is already in your cart please discard one and then select or you can select any one from here and it will automatically discard the other item from the cart.",
    "ERR-ALREADY-BOUGHT-IT": "You Buy It In Past So Not Able To Re-purchase It",
}
export const OppsModal = ({ message,selectedOption,options = [],onclose }) => {
    const [selectedPrice, setSelectedPrice] = useState()
    const segmantOptions = useMemo(() => {
        return [...options.filter(ele => ele.InCartQuantity > 0),selectedOption]
    },[options,selectedOption])

    useEffect(() => {
        setSelectedPrice(segmantOptions[0].value)
    },[segmantOptions])
    const updateCart = async () => {
        try {
        const result = await OfferCartService.addToCart([{
            ProductId: segmantOptions[1].OfferID,
            ProductItemId: segmantOptions[1].OptionID,
            Qty: segmantOptions[0].InCartQuantity,
            IsUpdate: true,
        }])
        BrowserUtility.saveObj('ProductBucketId', result.Result.ProductBucketId)
        onclose(true)
    } catch (error) {
    console.log("error", error)
    }
    }
    return (
        <ModalContainer>
            <ModalWrapper className="">
                <h6>{ErrorMessageConstant[message]}</h6>
            </ModalWrapper>
            <Segmented block size="large" options={segmantOptions} onChange={setSelectedPrice} value={selectedPrice} />
            <div className="mt-3 row mx-1">
            {selectedOption?.OptionID !== selectedPrice ? <PrimaryButton className="col" onClick={() => onclose(true)}>
                Keep this previous offer
            </PrimaryButton> :
            <PrimaryButton className="  col" onClick={updateCart}>
                Change offer
            </PrimaryButton>}
            </div>
        </ModalContainer>
    )
}
