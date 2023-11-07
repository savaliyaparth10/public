import React from 'react'
import { Select, Space, DatePicker, TimePicker } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import styled from 'styled-components'

const DateTimeMain = styled.div`
    margin-top: 3rem;
    .label {
        font-size: 16px;
    }
    .imp {
        color: #ff384e;
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
    .ant-picker {
        border-radius: 10px;
        background-color: #191a22;
        display: inline-block !important;
        width: 100%;
        padding: 0.5rem !important;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        font-size: 16px;
        text-decoration: none;
        border: 0;
    }
    input::placeholder {
        color: #8a8a8a47 !important;
    }
    .ant-picker-suffix {
        border-radius: 10px;
        background-color: #ff384e;
        font-size: 22px;
        padding: 0.5rem;
    }
    .ant-picker .ant-picker-input >input {
        color: white;
    }
`
const handleChange = value => {
    console.log(`selected ${value}`)
}
const onChange = (date, dateString) => {
    console.log(date, dateString)
}
dayjs.extend(customParseFormat)
const onChanges = (time, timeString) => {
    console.log(time, timeString)
}
export const DateTimeDetails = () => {
    return (
        <DateTimeMain>
            <div className="row">
                <div className="col-12">
                    <div className="lable">
                        Start time <span className="imp">*</span>
                    </div>
                    <Space wrap>
                        <Select
                            defaultValue="Select time zone"
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'Select time zone',
                                    label: 'Select time zone',
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
                        Start Date <span className="imp">*</span>
                    </div>
                    <Space direction="vertical">
                        <DatePicker
                            onChange={onChange}
                            placeholder=" 00 - 00 - 0000"
                        />
                    </Space>
                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="lable">
                        Start Time <span className="imp">*</span>
                    </div>
                    <TimePicker
                        onChange={onChanges}
                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        placeholder="00 - 00 PM"
                    />
                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="lable">
                        End Date <span className="imp">*</span>
                    </div>
                    <Space direction="vertical">
                        <DatePicker
                            onChange={onChange}
                            placeholder=" 00 - 00 - 0000"
                        />
                    </Space>
                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="lable">
                        End Time <span className="imp">*</span>
                    </div>
                    <TimePicker
                        onChange={onChanges}
                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        placeholder="00 - 00 PM"
                    />
                </div>
            </div>
        </DateTimeMain>
    )
}
