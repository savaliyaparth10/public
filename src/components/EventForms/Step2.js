import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form } from 'antd'
import styled from 'styled-components'
import { DangerText } from 'components'
import {
    PrimaryButton,
    FormSelectionField,
    FormCheckBoxField,
    FormDivider,
    FormTimeField,
    FormDateField,
} from 'elements'
import React, { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuth } from 'context'
import dayjs from 'dayjs'

const EventSchema = yup.object().shape({
    TimeZoneName: yup.string().required(),
    ShowEndTime: yup.boolean(),
    EventStartDate: yup
        .string()
        .required('*Event Start Date is required')
        .required('*Event Start Date is required')
        .nullable(true),
    EventEndDate: yup
        .string()
        .required('*Event End Date is required')
        .required('*Event End Date is required')
        .nullable(true),
    EventStartTime: yup
        .string()
        .typeError('*Event Start Time is required')
        .required('*Event Start Time is required')
        .nullable(true),
    EventEndTime: yup
        .string()
        .typeError('*Event End Time is required')
        .required('*Event End Time is required')
        .nullable(true),
})

const EventLayout = styled.div`
    padding: 1rem;
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0px 5px 25px rgba(57, 57, 72, 10%);
    border-radius: 10px;
    ${'' /* width: 80%; */}
    margin: 0 auto;

    .disabled {
        opacity: 0.4;
    }
    .absolute {
        position: absolute;
    }
    .label {
        font-size: 16px;
    }
    .imp {
        color: #ff384e;
    }
    .title {
        padding: 1rem 0rem;
        font-size: 30px;
        font-weight: 700;
    }
    Input,
    textarea {
        width: 100%;
        border-radius: 10px;
        background: #191a22;
        border: 0;
        padding: 1.5rem 1rem;
        font-size: 16px;
        color: white;
        margin-top: 0.5rem;
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
    .ant-select {
        background: ${({ theme }) => theme.colors.secondary} !important;
        padding: 0.5rem 0rem;
        border-radius: 10px;
        margin-top: 0.5rem;
    }
    .ant-select-selector {
        background-color: transparent !important;
        border: 0 !important;
        ${'' /* padding: 0 !important; */}
        font-size: 16px;
    }
    .anticon-down {
        display: none;
    }
    .ant-picker-suffix {
        border-radius: 10px;
        background-color: #ff384e;
        font-size: 22px;
        padding: 0.5rem;
    }
    .ant-checkbox-inner {
        background-color: transparent;
        border-color: white;
    }

    .ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner {
        background-color: #ff384e !important;
        border: transparent;
    }
    ${
        '' /* .ant-form-item {
        margin-bottom: 1rem;
    } */
    }

    .btns {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 4rem;
        Button {
            border-radius: 12px;
            background-color: #ff384e;
            width: 40%;
            min-width: 200px;
            max-width: 450px;
            height: 50px;
            font-size: 18px;
            border: 0;
            box-shadow: none;
            text-align: center;
            margin: 0 0.5rem 1.5rem;
        }
        Button:hover {
            background-color: #ff384e;
        }
    }
    .upload-btn {
        display: flex;
        justify-content: center;
    }
    .location-btn {
        background-color: #161d2a;
        height: 100%;
        padding: 0.5rem;
        border-radius: 10px;
        cursor: pointer;
    }
    .ant-form-item-control-input-content {
        .d-flex {
            align-items: center;
        }
    }
`

export const Step2 = ({
    data,
    timeZoneList,
    providerList,
    defaultTcList,
    defaultFaqList,
    submitSteps,
    currentStep,
    prev,
    next,
}) => {
    const [error, setError] = useState('')
    const [eventTicketRate, setEventTicketRate] = useState([])
    const { profile } = useAuth()
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(EventSchema),
        defaultValues: {
            ShowEndTime: true,

        },
    })

    const eventStartDate = watch('EventStartDate')
    const EOTD = watch('EOTD')

    const UserProviderList = useMemo(() => {
        const list = [...providerList]
        if (
            !providerList.find(item => item.ProviderId === profile?.Id) &&
            profile?.Id
        ) {
            list.push({ value: profile?.Id, label: profile?.FullName })
        }
        return list
    }, [providerList, profile])

    useEffect(() => {
        if (profile?.Id) {
            setValue('ProviderId', profile?.Id)
        }
    }, [UserProviderList])

    useEffect(() => {
        if (EOTD) {
            const end = new Date()
            end.setHours(23, 59, 59, 999)
            setValue('EventEndTime', dayjs(end))
        }
    }, [EOTD])

    useEffect(() => {
        if (!data?.ProviderEventId) {
            setValue('EventEndDate', eventStartDate)
        }
    }, [eventStartDate])

    useEffect(() => {
        if (eventTicketRate?.length) {
            setError('')
        }
    }, [eventTicketRate])

    useEffect(() => {
        if (data) {
            console.log(
                '🚀 ~ file: Step2.js ~ line 246 ~ useEffect ~ data',
                data,
            )
            const resetData = {
                ...data,
                EventStartDate: dayjs(
                    data.EventLocalStartTime || data.EventStartDateTime,
                ),
                EventStartTime: dayjs(
                    data.EventLocalStartTime || data.EventStartDateTime,
                ),
                EventEndDate: dayjs(
                    data.EventLocalEndTime || data.EventEndDateTime,
                ),
                EventEndTime: dayjs(
                    data.EventLocalEndTime || data.EventEndDateTime,
                ),
            }
            console.log(
                '🚀 ~ file: Step2.js ~ line 248 ~ useEffect ~ resetData',
                resetData,
            )
            reset({ ...resetData })
            setEventTicketRate(data.TicketRate)
        } else {
            reset({
                TC: defaultTcList,
                EventFAQ: defaultFaqList,
            })
            setEventTicketRate([])
        }
    }, [data, defaultTcList, defaultFaqList])

    const submit = async formData => {
        console.log("🚀 ~ file: Step2.js:284 ~ submit ~ formData:", formData)
        const startDate =
            dayjs(formData.EventStartDate).format('YYYY-MM-DD') +
            ' ' +
            dayjs(formData.EventStartTime).format('HH:mm:ss')
        const endDate =
            dayjs(formData.EventEndDate).format('YYYY-MM-DD') +
            ' ' +
            dayjs(formData.EventEndTime).format('HH:mm:ss')
        console.log(
            '🚀 ~ file: Step2.js ~ line 278 ~ submit ~ endDate',
            endDate,
        )
        const formDataObj = {
            ...formData,
            EventStartDateTime: startDate,
            EventEndDateTime: endDate,
        }
        delete formDataObj.EventStartDate
        delete formDataObj.EventEndDate
        delete formDataObj.EventStartTime
        delete formDataObj.EventEndTime
        delete formDataObj.EOTD
        setEventTicketRate([])
        setError('')
        submitSteps(1, formDataObj)
        next()
        console.log(error)
    }

    return (
        <EventLayout className="row mt-5 mb-5">
            <div>
                <Form>
                    <FormDivider className="mt-0" />
                    {error && <DangerText>{error}</DangerText>}
                    <div className="row">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div className="lable">
                                    Time Zone <span className="imp">*</span>
                                </div>
                                <FormSelectionField
                                    control={control}
                                    name="TimeZoneName"
                                    placeholder="Select TimeZone"
                                    errors={errors?.TimeZoneName}
                                    defaultValue=""
                                    options={timeZoneList}
                                    showSearch
                                />
                            </div>
                            <div className="col-6 mb-4">
                                <div className="lable mb-3">
                                    Start Date <span className="imp">*</span>
                                </div>
                                <FormDateField
                                    control={control}
                                    name="EventStartDate"
                                    errors={errors?.EventStartDate}
                                    defaultValue=""
                                />
                            </div>
                            <div className="col-6">
                                <div className="lable mb-3">
                                    Start Time <span className="imp">*</span>
                                </div>
                                <FormTimeField
                                    control={control}
                                    name="EventStartTime"
                                    errors={errors?.EventStartTime}
                                    defaultValue=""
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="lable mt-3 mb-3">
                                    End Date <span className="imp">*</span>
                                </div>
                                <FormDateField
                                    control={control}
                                    name="EventEndDate"
                                    errors={errors?.EventEndDate}
                                    disabledDate={eventStartDate}
                                    defaultValue=""
                                />
                            </div>
                            <div className="col-6">
                                <label className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                    <div className="lable mt-3 mb-3">
                                        End Time <span className="imp">*</span>
                                    </div>
                                        <span className="ml-2">
                                            <FormCheckBoxField
                                                control={control}
                                                label=""
                                                name="EOTD"
                                                errors={errors?.EOTD}
                                            >
                                                End Of The Day
                                            </FormCheckBoxField>
                                        </span>
                                    </div>
                                    <div>
                                        <FormCheckBoxField
                                            control={control}
                                            label=""
                                            name="ShowEndTime"
                                            errors={errors?.ShowEndTime}
                                        >
                                            ShowEndTime
                                        </FormCheckBoxField>
                                    </div>
                                </label>
                                <FormTimeField
                                    control={control}
                                    name="EventEndTime"
                                    errors={errors?.EventEndTime}
                                    defaultValue=""
                                />
                            </div>
                        </div>
                    </div>
                </Form>
                <div className="btns">
                    {currentStep > 0 && (
                        <Button
                            style={{ backgroundColor: ' #4a4c5e' }}
                            onClick={() => {
                                prev()
                            }}
                        >
                            Back
                        </Button>
                    )}
                    <PrimaryButton
                        className=" p-3 d-flex flex-row align-items-center border justify-content-center"
                        block
                        onClick={handleSubmit(submit)}
                    >
                        Next
                    </PrimaryButton>
                </div>
            </div>
        </EventLayout>
    )
}
