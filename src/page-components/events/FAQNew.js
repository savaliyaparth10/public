import React from 'react'
import styled from 'styled-components'

const FAQMain = styled.div`
    border-bottom: 2px solid #a6a6a637;
    margin: 0rem 0 1.5rem;
    padding-bottom: 2rem !important;
    .heading {
        font-weight: 600;
        font-size: 24px;
        color: #ffffff;
        margin-bottom: 10px;
        @media (width <768px) {
            padding: 0px 10px;
            font-size: 18px;
        }
    }
    .faq-section {
        padding: 10px;
    }
    .question-section {
        font-size: 14px;
        font-weight: 600;
        color: #a6a6a6;
    }
    .answer-section {
        font-size: 14px;
    }
`
export const FAQNew = ({ data }) => {
    return (
        <FAQMain>
            <h1 className="heading">FAQ's</h1>
            <ol>
                {data?.EventFAQ?.map((items, i) => (
                    <li className="faq-section" key={i}>
                        <div className="answer-section">{items.FAQ}</div>
                        <div className="question-section">{items.Answer}</div>
                    </li>
                ))}
            </ol>
        </FAQMain>
    )
}
