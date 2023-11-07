import React, { useState } from 'react'
import styled from "styled-components";
import { PushNotification } from './Common';
import { NotificationStatus } from 'utility';

const ApplyContainer = styled.div`
    margin-top: 20px;
    border-top: 2px solid #a6a6a65d;
    padding: 50px;
`
const CodeHeading = styled.div`
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
`
const Star = styled.span`
    color: #ff384e;
`
const ApplyInput = styled.input`
    background: #282935;
    border-radius: 10px;
    border: 0;
    padding: 15px;
    width: 100%;
`
const ApplyBtn = styled.div`
    padding: 15px;
    background: #ff384e;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    margin-top: 50px;
`
export const ApplyCodeModal = ({ applyCode }) => {
    const [code, setCode] = useState()
    const onChangeHandler = (e) => {
        const value = e.target.value.trim();
        setCode(value);
    }
    const clickOnApply = () => {
        if (!code || code.length < 4) {
            PushNotification("Please enter valid code", NotificationStatus.error)
        } else {
            applyCode(code);
        }
    }
    return (
        <ApplyContainer>
            <CodeHeading>
                Coupon code <Star>*</Star>
            </CodeHeading>
            <ApplyInput type="text" value={code} onChange={onChangeHandler} placeholder="Enter coupon code" />
            <ApplyBtn onClick={clickOnApply}>
                <span>Apply code</span>
            </ApplyBtn>
        </ApplyContainer>
    )
}
