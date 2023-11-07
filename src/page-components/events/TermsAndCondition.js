import React from 'react'
import styled from 'styled-components'

const TermsAndConditionMain = styled.div`
    border-top: 2px solid #a6a6a637;
    border-bottom: 2px solid #a6a6a637;
    padding-top: 1.5rem !important;
    padding-bottom: 2rem !important;
    .heading {
        font-weight: 600;
        font-size: 24px;
        color: #ffffff;
        margin-bottom: 10px;
        @media (width < 768px) {
            padding: 0px 10px;
            font-size: 18px;
        }
    }
    ul {
        @media (width < 600px) {
            padding: 0px 5px;
        }
    }
    li {
        font-size: 14px;
        text-align: justify;
        color: #a6a6a6;
        padding: 0px 10px;
    }
`
export const TermsAndCondition = ({ data }) => {
    return (
        <TermsAndConditionMain>
            <h1 className="heading">Terms And Condition</h1>
            {data?.TC?.map((items, i) => (
                <div className="terms-main" key={i}>
                    <ul>
                        <li>{items.TC}</li>
                    </ul>
                </div>
            ))}
        </TermsAndConditionMain>
    )
}
