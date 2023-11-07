import React from 'react'
import { Input, Space, Checkbox, Select } from 'antd'
import styled from 'styled-components'

const ContactInformationMain = styled.div`
    margin-top: 3rem;
    .label {
        font-size: 16px;
    }
    .imp {
        color: #ff384e;
    }
    Input {
        width: 100%;
        border-radius: 10px;
        background: #191a22;
        padding: 0.8rem 1rem;
        font-size: 16px;
        color: white;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
    .ant-input-compact-first-item {
        border-bottom: 0;
        border-top: 0;
        border-left: 0;
        border-color: #8a8a8a47;
    }
    .ant-input-compact-last-item {
        border-bottom: 0;
        border-right: 0;
        border-top: 0;
        border-color: #8a8a8a47;
    }
    Input::placeholder {
        color: #8a8a8a47;
    }
    .ant-input:focus {
        box-shadow: none !important;
    }
    .ant-checkbox-input,
    .email:focus-visible {
        box-shadow: none !important;
        border: 0;
        outline: none;
    }
    .email {
        border: 0;
    }
    .ant-checkbox-inner {
        background-color: transparent;
        border-color: white;
    }

    .ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner {
        background-color: #ff384e !important;
        border: transparent;
    }
    .ant-select-open .ant-select-selection-item {
        color: white;
    }
    .ant-select {
        border-radius: 10px;
        background-color: #191a22;
        display: inline-block !important;
        width: 100%;
        padding: 0.5rem !important;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        font-size: 16px;
        text-decoration: none;
    }
    .ant-select-selection-item {
        color: #8a8a8a47;
    }
    .ant-space-item {
        width: 100%;
    }
    .ant-select-selector {
        background: transparent !important;
        border: 0 !important;
        padding: 0;
        font-size: 16px;
    }

    .ant-space {
        display: flex;
        justify-content: space-between;
    }
    .ant-space-item {
        color: #8a8a8a47;
    }
    .ant-checkbox-wrapper:hover {
        border-color: blue;
    }
    .ant-space-compact {
        width: 100%;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        Input{
            padding: 0.8rem 0.5rem;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
    }
    @media (min-width: 769px) and (max-width: 1000px) {
    }
    @media (min-width: 1001px) and (max-width: 1220px) {
    }
`
const onChange = e => {
    console.log(`checked = ${e.target.checked}`)
}
const handleChange = value => {
    console.log(`selected ${value}`)
}
export const ContactInformation = () => {
    return (
        <ContactInformationMain>
            <div className="row">
                <div className="col-sm-12 col-lg-6">
                    <div className="details-main">
                        <div className="lable">
                            Contact name <span className="imp">*</span>
                        </div>
                        <Space.Compact>
                            <Input
                                style={{
                                    width: '20%',
                                }}
                                placeholder="+00"
                            />
                            <Input
                                // style={{
                                //     width: '80%',
                                // }}
                                placeholder="000 000 0000"
                            />
                        </Space.Compact>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="details-main">
                        <div className="lable">Contact number</div>
                        <Space.Compact>
                            <Input
                                style={{
                                    width: '20%',
                                }}
                                placeholder="+00"
                            />
                            <Input
                                style={{
                                    width: '80%',
                                }}
                                placeholder="000 000 0000"
                            />
                        </Space.Compact>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="details-main">
                        <div className="lable">
                            Email <span className="imp">*</span>
                        </div>
                        <Input
                            placeholder="Enter email"
                            type="email"
                            className="email"
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="details-main">
                        <div className="lable">
                            Website <span className="imp">*</span>
                        </div>
                        <Input
                            placeholder="Enter your website link"
                            type="email"
                            className="email"
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="age-deatils">
                        <Checkbox onChange={onChange}>
                            Kids are free under{' '}
                            <span style={{ color: '#ff384e' }}>*</span>
                        </Checkbox>
                        <Space wrap>
                            <Select
                                defaultValue="Select kids year"
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'Select kids year',
                                        label: 'Select kids year',
                                        disabled: true,
                                    },
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'Yiminghe',
                                        label: 'yiminghe',
                                    },
                                    {
                                        value: 'disabled',
                                        label: 'Disabled',
                                    },
                                ]}
                            />
                        </Space>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="age-deatils">
                        <Checkbox onChange={onChange}>
                            Is NGO
                            <span style={{ color: '#ff384e' }}>*</span>
                        </Checkbox>
                        <Space wrap>
                            <Select
                                defaultValue="Select"
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'Select',
                                        label: 'Select',
                                        disabled: true,
                                    },
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'Yiminghe',
                                        label: 'yiminghe',
                                    },
                                    {
                                        value: 'disabled',
                                        label: 'Disabled',
                                    },
                                ]}
                            />
                        </Space>
                    </div>
                </div>
            </div>
        </ContactInformationMain>
    )
}
