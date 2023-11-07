import React from 'react'
import { WarningOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const PaymentErrorModals = styled.div`
    padding: 50px;
    .wrong-icon {
        font-size: 64px;
        display: flex;
        justify-content: center;
    }
    .anticon-warning {
        ${'' /* width: 75px;
        height: 75px;
        border: 3px solid #ff384e;
        border-radius: 50%;
        display: grid;
        place-content: center; */}
        margin-bottom: 1rem;
    }
    .anticon-warning svg path {
        color: #ff384e !important;
    }
    .error-head {
        text-align: center;
        font-size: 26px;
        font-weight: 500;
        text-transform: uppercase;
        color: #ff384e;
        margin-bottom: 10px;
    }
    .error-desp {
        text-align: center;
        font-size: 16px;
    }
    .error-btns {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .error-btn {
        width: 70%;
        border: 0;
        background-color: #ff384e;
        border-radius: 6px;
        padding: 1rem 1rem;
    }
    .error-btn:is(:focus, :focus-visible) {
        outline: none;
        border: 0;
        box-shadow: none;
    }
`
export const PaymentErrorModal = ({ goToHome }) => {
    return (
        <PaymentErrorModals>
            <div className="wrong-icon">
                <WarningOutlined />
            </div>
            <div className="error-head">Oops! Something went wrong with your request.</div>
            <div className="error-desp">
                <p>
                    We encountered an issue while processing your payment.
                    Please try again later or contact our support team at
                    support@gtikt.com for assistance.
                </p>
                <p>
                    We apologize for the inconvenience and appreciate your
                    patience.
                </p>
            </div>
            <div className="error-btns">
                <button type="button" className="error-btn mt-4" onClick={goToHome}>
                    Go To Home
                </button>
            </div>
        </PaymentErrorModals>
    )
}
