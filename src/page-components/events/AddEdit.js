import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Steps } from 'antd'
import { DangerText } from 'components'
import {
    PrimaryButton,
    OutlinedButton,
    FormDivider,
} from 'elements'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useAuth } from 'context'
import { Step1, Step2, Step3, Step4, Step5 } from 'components/EventForms'
// import { TicketTableDetails } from './TicketTableDetails'

const EventSchema = yup.object().shape({
    EventName: yup.string().required('*Event Name is required'),
    ProviderId: yup.number().required('*Organizer is required'),
    CategoryId: yup.string().required('*Category is required'),
    PlaceId: yup.string().required('*Place is required'),
    WebSite: yup.string(),
    Email: yup.string().email(),
    ContactName: yup.string().required('*Contact Name is required'),
    ContactNumber: yup.string(),
    IsTicket: yup
        .boolean()
        .default(false)
        .oneOf([true, false], 'You must select Event Type'),
    LanguageId: yup.string().required('*Language is required'),
    TimeZoneName: yup.string().required('*Language is required'),
    Description: yup.string(),
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
    FreeTicketAge: yup
        .number()
        .when('$childFree', (childFree, schema) =>
            childFree
                ? schema.required('*Year is Required')
                : schema.optional()),
    TC: yup.array().of(
        yup.object().shape({
            TC: yup.string().required('terms & condition is Required'),
        }),
    ),
    EventFAQ: yup.array().of(
        yup.object().shape({
            FAQ: yup.string().required('question is Required'),
            Answer: yup.string().required('answer is Required'),
        }),
    ),
    NGOId: yup
        .string()
        .when('$IsNGO', (IsNGO, schema) =>
            IsNGO ? schema.required('*NGO is Required') : schema.optional()),
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
const steps = [
    {
        title: 'Basic Event Details',
    },
    {
        title: 'Date / Time Details',
    },
    {
        title: 'Contact Information',
    },
    {
        title: 'Ticket',
    },
    {
        title: 'Additional Information',
    },
]

export const AddEditEventForm = ({
    submitEvent,
    openPlaceModal,
    data,
    languageList,
    categoryList,
    imageCategoryList,
    placeList,
    timeZoneList,
    providerList,
    addProvider,
    defaultTcList,
    defaultFaqList,
    onPlaceSearch,
}) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [error, setError] = useState('')
    const [imagefiles, setImageFiles] = useState([])
    const [eventTicketRate, setEventTicketRate] = useState([])
    const [loading, setLoading] = useState(false)
    const [childFree, setChildFree] = useState(false)
    const [IsNGO, setIsNgo] = useState(false)
    const [stepData, setStepData] = useState({})
    const { CountryId } = useAuth()
    const params = useParams()
    const navigate = useNavigate()
    const {
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(EventSchema),
        context: { childFree, IsNGO },
        defaultValues: {
            EventName: '',
            FreeTicketAge: 2,
        },
    })

    const IsTicket = watch('IsTicket')
    const eventStartDate = watch('EventStartDate')
    const EOTD = watch('EOTD')
    const Tags = watch('Tags')

    useEffect(() => {
        setValue('PlaceId', '')
    }, [CountryId])

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
        setChildFree(true)
        reset({ FreeTicketAge: 2 })
    }, [])

    useEffect(() => {
        if (eventTicketRate.length) {
            setError('')
        }
    }, [eventTicketRate])

    useEffect(() => {
        if (data?.ProviderEventId) {
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
                IsTicket: !data.IsTicket,
                IsPrivate: !!data.IsPrivate,
                Tags: data.Tags?.split(';'),
            }
            if (data.Tags?.length === 0) {
                delete resetData.Tags
            }
            setChildFree(resetData.FreeTicketAge > 0)
            reset({ ...resetData })
            setIsNgo(data.IsNGO)
            setEventTicketRate(data.TicketRate)
            setImageFiles([...data.EventImages])
        } else {
            reset({
                EventName: '',
                TC: defaultTcList,
                EventFAQ: defaultFaqList,
            })
            setImageFiles([])
            setEventTicketRate([])
        }
    }, [data, defaultTcList, defaultFaqList])

    useEffect(() => {
        if (data?.ProviderEventId) {
            setImageFiles([...data.EventImages])
            setStepData({
                0: {
                    EventName: data.EventName,
                    ProviderId: data.ProviderId,
                    CategoryId: data.CategoryId,
                    PlaceId: data.PlaceId,
                    LanguageId: data.LanguageId,
                    Description: data.Description,
                    Tags: data.Tags,
                    ProviderEventId: data.ProviderEventId,
                },
                1: {
                    TimeZoneName: data.TimeZoneName,
                    EventStartDateTime: data.EventLocalStartTime,
                    EventEndDateTime: data.EventLocalEndTime,
                    ProviderEventId: data.ProviderEventId,
                    ShowEndTime: data.ShowEndTime,
                },
                2: {
                    WebSite: data.WebSite,
                    Email: data.Email,
                    ContactName: data.ContactName,
                    ContactNumber: data.ContactNumber,
                    NGOId: data.NGOId,
                    IsNGO: data.IsNGO,
                    FreeTicketAge: data.FreeTicketAge,
                    ProviderEventId: data.ProviderEventId,
                },
                3: {
                    IsTicket: data.IsTicket,
                    ProviderEventId: data.ProviderEventId,
                    TicketRate: data.TicketRate,
                },
                4: {
                    TC: data.TC,
                    EventFAQ: data.EventFAQ,
                    IsPrivate: data.IsPrivate,
                    ProviderEventId: data.ProviderEventId,
                },
            })
        }
    }, [data])

    const submit = async formData => {
        try {
            if (eventTicketRate.length === 0 && !IsTicket) {
                setError('Ticket Information is missing')
                return
            }
            // setLoading(true)
            const imageArray = imagefiles?.map(image => {
                return {
                    ...image,
                    Image: image.Image,
                    ImageCategoryId: image.ImageCategoryId,
                    IsActive: true,
                }
            })
            const startDate =
                dayjs(formData.EventStartDate).format('YYYY-MM-DD') +
                ' ' +
                dayjs(formData.EventStartTime).format('HH:mm:ss')
            const endDate =
                dayjs(formData.EventEndDate).format('YYYY-MM-DD') +
                ' ' +
                dayjs(formData.EventEndTime).format('HH:mm:ss')
            const formDataObj = {
                ...formData,
                EventTicketRate: eventTicketRate.map((ele,i) => ({ ...ele, DisplayOrder: i })),
                EventImages: imageArray,
                EventStartDateTime: startDate,
                EventEndDateTime: endDate,
                CategoryId: formData.CategoryId,
                // EventFAQ: faqs,
                // TC: terms,
                IsTicket: !formData.IsTicket,
                IsPrivate: !!formData.IsPrivate,
                Tags: Tags?.toString().replaceAll(',', ';') || '',
                IsNGO,
            }
            delete formDataObj.EventStartDate
            delete formDataObj.EventEndDate
            delete formDataObj.EventStartTime
            delete formDataObj.EventEndTime
            delete formDataObj.EOTD
            submitEvent(formDataObj)
            setChildFree(false)
            setEventTicketRate([])
            setError('')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    console.log('🚀 ~ file: AddEdit.js:431 ~ submit ~ submit:', submit)

    const cancelAddEdit = () => {
        navigate(-1)
    }

    const next = () => {
        window.scrollTo(0, 0)
        if (currentStep !== 4) {
            setCurrentStep(currentStep + 1)
        }
    }
    const prev = () => {
        setCurrentStep(currentStep - 1)
    }
    const submitSteps = (step, data) => {
        setStepData({
            ...stepData,
            [step]: data,
        })
        if (step === 4) {
            submitEvent({
                ...stepData[0],
                ...stepData[1],
                ...stepData[2],
                ...stepData[3],
                ...data,
                EventTicketRate: stepData[3].TicketRate,
                // ...stepData[4],
            })
        }
    }
    return (
        <EventLayout className="row mt-5 mb-5">
            <div>
                <Form>
                    <div className="d-flex align-items-center justify-content-between">
                        <h1 className="title">
                            {!params?.id ? 'Add' : 'Edit'} Event
                        </h1>
                        <div className="d-flex">
                            <OutlinedButton
                                className="col mr-2  p-3 d-flex flex-row align-items-center border justify-content-center"
                                block
                                onClick={cancelAddEdit}
                            >
                                Cancel
                            </OutlinedButton>
                            {/* <PrimaryButton
                                className="col p-3 d-flex flex-row align-items-center border justify-content-center"
                                block
                                onClick={handleSubmit(submit)}
                                loading={loading}
                            >
                                Save
                            </PrimaryButton> */}
                        </div>
                    </div>
                    <Steps
                        current={currentStep}
                        labelPlacement="vertical"
                        items={steps}
                    />
                    <FormDivider className="mt-0" />
                    {error && <DangerText>{error}</DangerText>}
                    {currentStep === 0 && (
                        <Step1
                            openPlaceModal={openPlaceModal}
                            data={stepData['0']}
                            editData={data}
                            imagefiles={imagefiles}
                            setImageFiles={setImageFiles}
                            languageList={languageList}
                            categoryList={categoryList}
                            imageCategoryList={imageCategoryList}
                            placeList={placeList}
                            providerList={providerList}
                            addProvider={addProvider}
                            onPlaceSearch={onPlaceSearch}
                            next={() => {
                                next()
                            }}
                            setCurrentStep={setCurrentStep}
                            currentStep={currentStep}
                            submitSteps={submitSteps}
                        />
                    )}
                    {currentStep === 1 && (
                        <Step2
                            data={stepData['1']}
                            editData={data}
                            timeZoneList={timeZoneList}
                            providerList={providerList}
                            defaultTcList={defaultTcList}
                            defaultFaqList={defaultFaqList}
                            currentStep={currentStep}
                            submitSteps={submitSteps}
                            next={next}
                            prev={prev}
                        />
                    )}
                    {currentStep === 2 && (
                        <Step3
                            data={stepData['2']}
                            editData={data}
                            providerList={providerList}
                            defaultTcList={defaultTcList}
                            defaultFaqList={defaultFaqList}
                            currentStep={currentStep}
                            submitSteps={submitSteps}
                            next={next}
                            prev={prev}
                        />
                    )}
                    {currentStep === 3 && (
                        <Step4
                            data={stepData['3']}
                            editData={data}
                            allData={data}
                            providerList={providerList}
                            defaultTcList={defaultTcList}
                            defaultFaqList={defaultFaqList}
                            eventStartDateTime={stepData[1]?.EventStartDateTime}
                            currentStep={currentStep}
                            submitSteps={submitSteps}
                            eventTicketRate={eventTicketRate}
                            setEventTicketRate={setEventTicketRate}
                            next={next}
                            prev={prev}
                        />
                    )}
                    {currentStep === 4 && (
                        <Step5
                            editData={data}
                            data={stepData['4']}
                            providerList={providerList}
                            defaultTcList={defaultTcList}
                            defaultFaqList={defaultFaqList}
                            currentStep={currentStep}
                            submitSteps={submitSteps}
                            next={next}
                            prev={prev}
                        />
                    )}
                </Form>
                <div className="btns d-none">
                    {currentStep > 0 && (
                        <PrimaryButton
                            style={{ backgroundColor: ' #4a4c5e' }}
                            onClick={() => prev()}
                            loading={loading}
                        >
                            Back
                        </PrimaryButton>
                    )}
                    {currentStep < steps.length - 1 && (
                        <PrimaryButton type="primary" onClick={() => next()}>
                            Next
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </EventLayout>
    )
}
