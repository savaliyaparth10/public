import React from 'react'
import { Input, Select, Space } from 'antd'
import { EnvironmentFilled } from '@ant-design/icons'
import styled from 'styled-components'

const handleChange = value => {
    console.log(`selected ${value}`)
}
const BasicDetailsMain = styled.div`
    margin-top: 3rem;
    .upload-image-section {
        text-align: center;
    }
    .label {
        font-size: 16px;
    }
    .imp {
        color: #ff384e;
    }
    Input,
    textarea {
        width: 100%;
        border-radius: 10px;
        background: #191a22;
        border: 0;
        padding: 0.8rem 1rem;
        font-size: 16px;
        color: white;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
    textarea {
        color: white;
    }
    textarea:focus {
        box-shadow: none !important;
    }
    textarea:focus-visible {
        box-shadow: none !important;
        border: 0;
        outline: none;
    }
    Input::placeholder {
        color: #8a8a8a47;
    }
    .ant-input:focus {
        box-shadow: none !important;
    }
    .ant-input:focus-visible {
        box-shadow: none !important;
        border: 0;
        outline: none;
    }
    .ant-input-affix-wrapper {
        font-size: 16px;
        background: #191a22;
        border: 0;
        margin-top: 0.5rem;
        padding: 0.5rem 1rem;
    }
    ${
        '' /* .anticon {
        font-size: 25px;
        padding: 0.3rem;
        border-radius: 6px;
        background-color: #ff384e;
        border-radius: 10px;
    } */
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
    .anticon-environment {
        background-color: #ff384e;
        font-size: 30px;
        padding: 0.3rem;
        border-radius: 10px;
        margin-left: 0.3rem;
    }
    @media (min-width: 200px) and (max-width: 480px) {
  
    }
    @media (min-width: 481px) and (max-width: 768px) {
  
    }
    @media (min-width: 769px) and (max-width: 1000px) {

    }
    @media (min-width: 1001px) and (max-width: 1220px) {
    }
`
export const BasicDetails = () => {
    return (
        <BasicDetailsMain>
            <div className="upload-image-section">Uplaod Image</div>
            <div className="add-event-basic-details-form">
                <div className="row">
                    <div className="col-sm-12 col-lg-6">
                        <div className="details-main">
                            <div className="lable">
                                Event name <span className="imp">*</span>
                            </div>
                            <Input placeholder="Enter event name" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div className="details-main">
                            <div className="lable">
                                Select place <span className="imp">*</span>
                            </div>
                            <Space wrap>
                                <Select
                                    defaultValue="Select Place"
                                    onChange={handleChange}
                                    suffixIcon={<EnvironmentFilled />}
                                    options={[
                                        {
                                            value: 'Select Place',
                                            label: 'Select Place',
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
                        <div className="lable">
                            Organiser <span className="imp">*</span>
                        </div>
                        <Space wrap>
                            <Select
                                defaultValue="Select Organiser"
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'Select Organiser',
                                        label: 'Select Organiser',
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
                    <div className="col-sm-12 col-lg-6">
                        <div className="lable">
                            Category <span className="imp">*</span>
                        </div>
                        <Space wrap>
                            <Select
                                defaultValue="Select Category"
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'Select Category',
                                        label: 'Select Category',
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
                    <div className="col-sm-12 col-lg-6">
                        <div className="lable">
                            Language <span className="imp">*</span>
                        </div>
                        <Space wrap>
                            <Select
                                defaultValue="Select Language"
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'Select Language',
                                        label: 'Select Language',
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
                    <div className="col-sm-12 col-lg-6">
                        <div className="details-main">
                            <div className="lable">
                                Tag <span className="imp">*</span>
                            </div>
                            <Input placeholder="Add tags" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="details-main">
                            <div className="lable">
                                Tag <span className="imp">*</span>
                            </div>
                            <textarea
                                name=""
                                id=""
                                rows="10"
                                placeholder="Enter description here"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </BasicDetailsMain>
    )
}
