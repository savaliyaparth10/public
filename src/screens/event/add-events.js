import React, { useState } from 'react'
import { Steps } from 'antd'
import styled from 'styled-components'
// import { BasicDetails } from 'page-components/events/BasicDetails'
// import { DateTimeDetails } from 'page-components/events/DateTimeDetails'
// import { ContactInformation } from 'page-components/events/ContactInformation'
// import { TicketTableDetails } from 'page-components/events/TicketTableDetails'
// import { AdditionalInformation } from 'page-components/events/AdditionalInformation'

const steps = [
    {
        title: 'Basic event details',
        // content: <BasicDetails />,
    },
    {
        title: 'Date / Time details',
        // content: <DateTimeDetails />,
    },
    {
        title: 'Contact information',
        // content: <ContactInformation />,
    },
    {
        title: 'Ticket table',
        // content: <TicketTableDetails />,
    },
    {
        title: 'Additional information',
        // content: <AdditionalInformation />,
    },
]
const AddEventMain = styled.div`
    .title {
        padding: 1rem 0rem;
        font-size: 30px;
        font-weight: 700;
        border-bottom: 1.5px solid #8a8a8a47;
    }
    .ant-steps {
        margin: 2rem 0rem;
    }
    .ant-steps-item-icon {
        background-color: #50515a !important;
        border-color: #50515a !important;
        font-size: 22px;
        width: 40px;
        height: 40px;
        text-align: center;
    }
    .ant-steps-icon {
        position: relative;
        top: 0px;
    }
    .ant-steps-item-process .ant-steps-item-icon {
        background-color: #ff384e !important;
        border-color: #ff384e !important;
    }
    .ant-steps-item-finish .ant-steps-item-icon {
        background-color: #ff384e !important;
        border-color: #ff384e !important;
    }
    .btns {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        Button {
            border-radius: 12px;
            background: #ff384e;
            width: 30%;
            height: 100%;
            padding: 0.5rem;
            font-size: 18px;
            border: 0;
            box-shadow: none;
            text-align: center;
        }
        Button:hover {
            background: #ff384e;
        }
    }
    .ant-btn {
        padding: 0;
    }
    .ant-steps
        .ant-steps-item-finish
        > .ant-steps-item-container
        > .ant-steps-item-tail::after {
        background: #ff384e;
    }
    .ant-steps.ant-steps-label-vertical .ant-steps-item-content {
        display: block;
        width: 100% !important;
        margin-top: 12px;
        text-align: left;
    }
    .ant-steps
        .ant-steps-item-finish
        > .ant-steps-item-container
        > .ant-steps-item-content
        > .ant-steps-item-title {
        color: white;
    }
    .ant-steps
        .ant-steps-item-process
        > .ant-steps-item-container
        > .ant-steps-item-content
        > .ant-steps-item-title {
        color: white;
    }
    .ant-steps
        .ant-steps-item-wait
        > .ant-steps-item-container
        > .ant-steps-item-content
        > .ant-steps-item-title {
        color: #8a8a8a47 !important;
    }
    .ant-steps .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
        color: white !important;
    }
    .ant-steps .ant-steps-item-icon .ant-steps-icon {
        position: relative;
        top: 0;
    }
    .ant-steps
        .ant-steps-item-process
        > .ant-steps-item-container
        > .ant-steps-item-tail::after {
        background: #8a8a8a47;
    }
    .ant-steps-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ant-steps
        .ant-steps-item-wait
        > .ant-steps-item-container
        > .ant-steps-item-tail::after {
        background: #8a8a8a47;
        height: 3px;
    }
    .ant-steps.ant-steps-label-vertical .ant-steps-item-tail {
        margin-inline-start: 62px;
    }

    @media (min-width: 200px) and (max-width: 480px) {
        width: 90% !important;
        margin: 2.1rem auto;
        padding: 1rem;
        .ant-steps-item-tail {
            display: none !important;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
        width: 90% !important;
        margin: 2.1rem auto;
        padding: 1rem;
        .ant-steps.ant-steps-vertical {
            display: flex !important;
            flex-direction: column !important;
        }
    }
    @media (min-width: 769px) and (max-width: 1000px) {
        width: 90% !important;
        margin: 2.1rem auto;
        padding: 1rem;
    }
    @media (min-width: 1001px) and (max-width: 1220px) {
        width: 90% !important;
        margin: 2.1rem auto;
        padding: 1rem;
    }
`
export const AddEventScreen = () => {
    const [current] = useState(0)
    const items = steps.map(item => ({
        key: item.title,
        title: item.title,
    }))
    return (
        <AddEventMain>
            <Steps current={current} labelPlacement="vertical" items={items} />
            <div>{steps[current].content}</div>
        </AddEventMain>
    )
}
