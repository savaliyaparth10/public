import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form } from 'antd'
import { FormCheckBoxField, PrimaryButton } from 'elements'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import * as yup from 'yup'
import { DangerText } from 'components/Common'
import { TicketTable } from 'page-components'
import { toast } from 'react-toastify'

const EventSchema = yup.object().shape({
    IsTicket: yup
        .boolean()
        .default(false)
        .oneOf([true, false], 'You must select Event Type'),
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
    ${'' /* .ant-form-item {
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

export const Step4 = ({
    data,
    defaultTcList,
    defaultFaqList,
    currentStep, prev, next, submitSteps,setEventTicketRate,eventTicketRate,eventStartDateTime,
}) => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState([])
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(EventSchema),
        defaultValues: {
            FreeTicketAge: 0,
        },
    })

    const IsTicket = watch('IsTicket')

    useEffect(() => {
        if (eventTicketRate?.length) {
            setError('')
        }
    }, [eventTicketRate])

    useEffect(() => {
        if (data) {
            const resetData = {
                ...data,
                IsTicket: !data.IsTicket,
                TicketRate: eventTicketRate,
            }
            reset({ ...resetData })
            setEventTicketRate(data.TicketRate)
        } else {
            setEventTicketRate([])
        }
    }, [data, defaultTcList, defaultFaqList])

    const setTicket = data => {
        setEventTicketRate(data)
    }

    const submitCode = data => {
        setCode(data)
    }
    const submit = async formData => {
        if (eventTicketRate.length === 0 && !IsTicket) {
            setError('Ticket Information is missing')
            toast.error("Ticket Information is missings")
            return
        }
        setLoading(true)
        const formDataObj = {
            ...formData,
            TicketRate: eventTicketRate,
            IsTicket: !formData.IsTicket,
        }
        setError('')
        submitSteps(currentStep, formDataObj)
        next()
    }

    return (
        <EventLayout className="row mt-5 mb-5">
            <div>
                <Form>
                    {error && <DangerText>{error}</DangerText>}
                    <div className="row">
                        <Form.Item className="col-12 col-sm-12 col-md-6">
                            <div className="d-flex">
                                <FormCheckBoxField
                                    control={control}
                                    label=""
                                    name="IsTicket"
                                    errors={errors?.IsTicket}
                                >
                                    No Ticket
                                </FormCheckBoxField>
                            </div>
                        </Form.Item>
                        <TicketTable
                            setTicket={setTicket}
                            IsTicket={IsTicket}
                            data={eventTicketRate}
                            eventStartTime={eventStartDateTime}
                            eventStartDate={eventStartDateTime}
                            eventData={data || {}}
                            // submitTerms={submitTerms}
                            // submitFaqs={submitFaqs}
                            submitCode={submitCode}
                            // terms={terms}
                            // faqs={faqs}
                            code={code}
                        />
                    </div>
                    <div className="btns">
                        {currentStep > 0 && (
                            <Button
                                style={{ backgroundColor: ' #4a4c5e' }}
                                onClick={() => { prev() }}
                            >
                                Back
                            </Button>
                        )}
                        <PrimaryButton
                            className=" p-3 d-flex flex-row align-items-center border justify-content-center"
                            block
                            onClick={handleSubmit(submit)}
                            loading={loading}
                        >
                            Next
                        </PrimaryButton>
                    </div>
                </Form>
            </div>
        </EventLayout>
    )
}