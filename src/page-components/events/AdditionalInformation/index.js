import React, { useState } from 'react'
import { Radio } from 'antd'
import styled from 'styled-components'

import { TermsConditions } from './TermsConditions'
import { Faqs } from './Faqs'

const AdditionalInformationMain = styled.div`
    margin-top: 3rem;
    .heading h2 {
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    .ant-radio-checked .ant-radio-inner {
        border-color: #ff384e !important;
        background-color: #ff384e !important;
    }
    .ant-radio-wrapper .ant-radio-inner {
        background-color: transparent;
        width: 25px;
        height: 25px;
        margin-bottom: 1rem;
    }
    .ant-radio-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }
    .header-main,
    .header-mains {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .policiesbtn {
        border: 0;
        background-color: #ff384e;
        border-radius: 6px;
        padding: 0.5rem 1rem;
    }
    .terms-condition-content {
        margin-top: 1rem;
        border-bottom: 2px solid #8a8a8a47;
        padding-bottom: 2rem;
        .ant-form-item {
            margin-bottom: 0 !important;
        }
    }
    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #191a22;
        padding: 0.8rem 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
    }
    p {
        margin: 0;
    }
    .anticon-delete {
        border-radius: 10px;
        background-color: #ff384e;
        font-size: 22px;
        padding: 0.5rem;
    }
    .header-mains {
        padding-top: 3rem;
    }
    .faq-content {
        background-color: #191a22;
        padding: 0.8rem 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
    }
    .faq-content-main {
        margin-top: 1rem;
    }
    .questions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #8a8a8a47;
        padding-bottom: 1rem;
    }
    .answer {
        padding-top: 1rem;
    }
    .questions,
    .answer span {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
    }
    .questions,
    .answer > span > p {
        font-size: 14px;
        font-style: normal;
        font-weight: 400 !important;
        margin: 0;
    }
    .anticon-delete {
        border-radius: 10px;
        background-color: #ff384e;
        font-size: 22px !important;
        padding: 0.5rem;
        cursor: pointer;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        .save-btn {
            padding: 0.5rem 2rem;
            width: 100%;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
    }
    @media (min-width: 769px) and (max-width: 1000px) {
    }
    @media (min-width: 1001px) and (max-width: 1220px) {
    }
`
export const AdditionalInformation = ({ settcList,setfaqList,control, errors, changeEventPrivate,eventData,defaultTcList,defaultFaqList,IsPrivate }) => {
    const [value, setValue] = useState(IsPrivate ? 1 : 0)
    // const [loading, setLoading] = useState(false)
    const onChange = e => {
        console.log('radio checked', e.target.value)
        setValue(e.target.value)
        changeEventPrivate(!!e.target.value)
    }
    return (
        <>
            <AdditionalInformationMain>
                <div className="heading">
                    <h2>Listing privacy</h2>
                </div>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={0}>
                        Public page: put your event in front of millions of
                        ticket buyers on gtikit and search engines like google
                    </Radio>
                    <Radio value={1}>
                        Private page: do not list this event publicly
                    </Radio>
                </Radio.Group>
                <TermsConditions control={control} errors={errors} eventData={eventData} list={defaultTcList} settcList={settcList} />
                <Faqs control={control} errors={errors} eventData={eventData} list={defaultFaqList} setfaqList={setfaqList} />
            </AdditionalInformationMain>
        </>
    )
}