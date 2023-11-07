import { yupResolver } from '@hookform/resolvers/yup'
import {
    PlusOutlined,
    LoadingOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import { Checkbox, Form, Tag, Upload, message } from 'antd'
import { DangerText, FlexRowBetween, PushNotification } from 'components'
import styled from 'styled-components'
import { PopUpModal } from 'components/PopUpModal'
import dayjs from 'dayjs'
import {
    FormCheckBoxField,
    FormDateField,
    // FormDateTimeField,
    FormDivider,
    FormNormalField,
    FormTextAreaFormField,
    FormTextFormField,
    FormTimeField,
    OutlinedButton,
    PrimaryButton,
} from 'elements'
import { NotePencil, Plus, Trash } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
    CommonUtility,
    ErrorConstant,
    EventsService,
    FileUploadService,
    NotificationStatus,
    NotificationText,
    theme,
    TicketUtility,
} from 'utility'
import * as yup from 'yup'
// import { CodeModel } from './Code';
import { Faqs } from './Faqs'
import { TermsConditions } from './T&C'
import { TeamMember } from './TeamMember'
import { DraggableAppTable } from './DragbleTable'
import { toast } from 'react-toastify'

const EventSchema = yup.object().shape({
    TicketType: yup.string().required('*Ticket Type is required').nullable(),
    TicketQty: yup
        .number()
        .min(0, '*Less then 0 is inValid ')
        .typeError('*Ticket Qty is required')
        .required('*Ticket Qty is required'),
    TicketPrice: yup
        .number()
        .min(0, '*Less then 0 is inValid ')
        .typeError('*Ticket Price is required')
        .required('*Ticket Price is required'),
    MaxPerOrder: yup
        .number()
        .min(1, '*Less then 1 is inValid ')
        .typeError('*Max Per Order is required')
        .required('*Max Per Order is required'),
    // TicketDiscount: yup
    //     .number()
    //     .transform((value) => Number.isNaN(value) ? null : value)
    //     .nullable()
    //     .min(0, '*Less then 0 is inValid ')
    //     .max(100, '*Must be less then 100')
    //     .typeError(''),
    DisplayOrder: yup
        .number()
        .transform(value => (Number.isNaN(value) ? null : value))
        .nullable()
        .min(0, '*Less then 0 is inValid ')
        .max(100, '*Must be less then 100')
        .typeError(''),
    TicketDescription: yup.string().nullable(),
    SellingStartDate: yup.date().required(),
    SellingEndDate: yup.date().required(),
    SellingStartTime: yup.date().required(),
    SellingEndTime: yup.date().required(),
    EventTicketId: yup.string(),
    SeatNo: yup.string().nullable(),
    IsSeatOption: yup
        .boolean()
        .default(false)
        .oneOf([true, false], 'You must select Event Type'),
    IsFreeEvent: yup
        .boolean()
        .default(false)
        .oneOf([true, false], 'You must select Event Type'),
    // Seats: yup.array().of(
    //     yup.object().shape({
    //         RowName: yup.string(),
    //         SeatId: yup.string(),
    //         Status: yup.string(),
    //         SeatNo: yup.string(),
    //     }),
    // ),
    // RowSeat: yup.array().of(
    //     yup.object().shape({
    //         id: yup.string(),
    //         row: yup.string().required('Row is Required'),
    //         seat: yup.string().required('*Seat Number is Required'),
    //     }),
    // ),
    GroupedTicketCount: yup
        .number()
        .transform(value => (Number.isNaN(value) ? null : value))
        .nullable()
        .when('IsGroupedTicket', (IsGroupedTicket, schema) =>
            IsGroupedTicket
                ? schema
                      .required('*No. Group Ticket Required')
                      .min(2, '*Less then 2 is inValid ')
                : schema.optional()),
})
// const EventLayout = styled.div`
//     padding: 1rem;
//     background: ${({ theme }) => theme.colors.primary};
//     box-shadow: 0px 5px 25px rgba(57, 57, 72, 10%);
//     border-radius: 10px;
//     ${'' /* width: 80%; */}
//     margin: 0 auto;

//     .disabled {
//         opacity: 0.4;
//     }
//     .absolute {
//         position: absolute;
//     }
//     .label {
//         font-size: 16px;
//     }
//     .imp {
//         color: #ff384e;
//     }
//     .title {
//         padding: 1rem 0rem;
//         font-size: 30px;
//         font-weight: 700;
//     }
//     Input,
//     textarea {
//         width: 100%;
//         border-radius: 10px;
//         background: #191a22;
//         border: 0;
//         padding: 1.5rem 1rem;
//         font-size: 16px;
//         color: white;
//         margin-top: 0.5rem;
//     }
//     textarea {
//         color: white;
//     }
//     textarea:focus {
//         box-shadow: none !important;
//     }
//     textarea:focus-visible {
//         box-shadow: none !important;
//         border: 0;
//         outline: none;
//     }
//     Input::placeholder {
//         color: #8a8a8a47;
//     }
//     .ant-input:focus {
//         box-shadow: none !important;
//     }
//     .ant-input:focus-visible {
//         box-shadow: none !important;
//         border: 0;
//         outline: none;
//     }
//     .ant-select {
//         background: ${({ theme }) => theme.colors.secondary} !important;
//         padding: 0.5rem 0rem;
//         border-radius: 10px;
//         margin-top: 0.5rem;
//     }
//     .ant-select-selector {
//         background-color: transparent !important;
//         border: 0 !important;
//         ${'' /* padding: 0 !important; */}
//         font-size: 16px;
//     }
//     .anticon-down {
//         display: none;
//     }
//     .ant-picker-suffix {
//         border-radius: 10px;
//         background-color: #ff384e;
//         font-size: 22px;
//         padding: 0.5rem;
//     }
//     .ant-checkbox-inner {
//         background-color: transparent;
//         border-color: white;
//     }

//     .ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner {
//         background-color: #ff384e !important;
//         border: transparent;
//     }
//     ${'' /* .ant-form-item {
//         margin-bottom: 1rem;
//     } */
//     }

//     .btns {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         margin-top: 4rem;
//         Button {
//             border-radius: 12px;
//             background-color: #ff384e;
//             width: 40%;
//             min-width: 200px;
//             max-width: 450px;
//             height: 50px;
//             font-size: 18px;
//             border: 0;
//             box-shadow: none;
//             text-align: center;
//             margin: 0 0.5rem 1.5rem;
//         }
//         Button:hover {
//             background-color: #ff384e;
//         }
//     }
//     .upload-btn {
//         display: flex;
//         justify-content: center;
//     }
//     .location-btn {
//         background-color: #161d2a;
//         height: 100%;
//         padding: 0.5rem;
//         border-radius: 10px;
//         cursor: pointer;
//     }
//     .ant-form-item-control-input-content {
//         .d-flex {
//             align-items: center;
//         }
//     }
// `

const DateAndTime = styled.div`
    .ant-picker-suffix {
        border-radius: 10px;
        background-color: #ff384e;
        font-size: 14px;
        padding: 0.25rem;
    }
`
export const TicketTable = ({
    setTicket,
    IsTicket,
    eventStartDate,
    eventStartTime,
    data,
    submitTerms,
    submitFaqs,
    eventData,
    terms,
    faqs,
}) => {
    const [ticketRateModal, setTicketRateModal] = useState(false)
    const [ticketRemoveModal, setTicketRemoveModal] = useState(false)
    const [ticketData, setTicketData] = useState([])
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editPreviousData, setEditPreviousData] = useState({})
    const [seatOption, setSeatOption] = useState(false)
    const [error, setError] = useState('')
    const [endTicketSell, setEndTicketSell] = useState(false)
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        context: { seatOption },
        resolver: yupResolver(EventSchema),
        defaultValues: {
            TicketImage: null,
            TicketType: '',
            TicketDescription: '',
            TicketPrice: 0,
            TicketQty: 0,
            SeatNo: '',
            RowSeat: [],
            DisplayOrder: 0,
            IsGroupedTicket: false,
            GroupedTicketCount: '',
            EventTicketId: '',
        },
        shouldUnregister: true,
    })
    const AddFreeTicket = watch('AddFreeTicket')
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'RowSeat',
    })

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    )
    const IsSeatOption = watch('IsSeatOption')
    const freeEvent = watch('IsFreeEvent')
    const TicketImage = watch('TicketImage')
    const IsGroup = watch('IsGroupedTicket')
    const SellingStartDate = watch('SellingStartDate')
    const SellingStartTime = watch('SellingStartTime')

    useEffect(() => {
        setTicketData(data)
    }, [data])

    useEffect(() => {
        setSeatOption(!!IsSeatOption)
    }, [IsSeatOption])

    useEffect(() => {
        if (!editMode) {
            // setValue('TicketDiscount', 0)
            const start = dayjs()
            const end =
                eventStartDate && eventStartTime
                    ? dayjs(
                          dayjs(eventStartDate).format('YYYY-MM-DD') +
                              ' ' +
                              dayjs(eventStartTime).format('HH:mm:ss'),
                      ).subtract(1, 'hour')
                    : null
            setValue('SellingStartDate', start)
            setValue('SellingStartTime', start)
            setValue('SellingEndDate', end)
            setValue('SellingEndTime', end)

            if (AddFreeTicket) {
                setValue('IsFreeEvent', true)
            }
        }
        setEndTicketSell(false)
    }, [ticketRateModal, editMode, eventStartDate])

    useEffect(() => {
        if (!editMode && seatOption && ticketRateModal) {
            addNew()
        }
    }, [seatOption])

    useEffect(() => {
        if (!editMode) {
            setEditPreviousData({})
        }
    }, [editMode])

    const addNew = () => {
        append({ id: '', row: '', seat: '' })
    }

    const price = watch('TicketPrice')
    const discount = watch('TicketDiscount')
    const columns = [
        {
            title: '  ',
            dataIndex: '  ',
            key: 'drag',
            render: () => <div />,
        },
        {
            title: 'Ticket Type',
            dataIndex: 'TicketType',
            key: 'TicketType',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Qty',
            dataIndex: 'TicketQty',
            key: 'TicketQty',
        },
        {
            title: 'Price',
            dataIndex: 'TicketPrice',
            key: 'TicketPrice',
        },
        // {
        //     title: 'Seat No / Quantity',
        //     dataIndex: 'SeatNo',
        //     align: "center",
        //     key: 'SeatNo',
        //     render: (row, data) => {
        //         return (<>{row || data?.TicketQty} </>)
        //     },
        // },
        {
            title: 'Action',
            dataIndex: 'TicketType',
            align: 'center',
            key: 'TicketType',
            render: (row, data) => <DropDownEditDelete row={row} data={data} />,
        },
    ]
    // ==================================image upload================================= //
    const uploadMedia = async item => {
        try {
            const { Result } = await FileUploadService.media(
                item.file,
                item.file.type,
            )
            setValue('TicketImage', Result)
        } catch (error) {
            PushNotification(
                NotificationText.defaultError,
                NotificationStatus.error,
            )
        } finally {
            setLoading(false)
        }
    }
    const beforeUpload = file => {
        const isJpgOrPng =
            file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        setLoading(true)
        return isJpgOrPng && isLt2M
    }
    const removeImg = e => {
        e.preventDefault()
        e.stopPropagation()
        setValue('TicketImage', null)
    }
    // ==================================image upload================================= //

    const DropDownEditDelete = ({ data }) => {
        const onClick = key => {
            if (key === 'edit') {
                editTicket(data.EventTicketId || data.tempId, data)
                if (data.IsSeatOption || data.Seats?.length) {
                    setSeatOption(true)
                }
            } else {
                openRemoveTicketModal(data)
            }
        }
        return (
            <div>
                <NotePencil
                    size={22}
                    className="mx-2 pointer"
                    onClick={() => onClick('edit')}
                />
                <Trash
                    size={22}
                    className="mx-2 pointer"
                    onClick={() => onClick('remove')}
                />
            </div>
        )
    }

    const openTicketModal = () => {
        setTicketRateModal(true)
        setEditMode(false)
        remove()
        reset({
            TicketType: '',
            TicketDescription: '',
            TicketQty: '',
            TicketPrice: '',
            TicketDiscount: '',
            SeatNo: '',
            RowSeat: '',
            TicketImage: null,
            DisplayOrder: 0,
            IsGroupedTicket: false,
            GroupedTicketCount: '',
            IsActive: true,
        })
    }

    const editTicket = (typeId, data) => {
        const obj = ticketData.find(
            item =>
                (item?.EventTicketId || item?.tempId) ===
                (data?.EventTicketId || typeId),
        )
        reset({
            ...obj,
            SellingEndDate: dayjs(obj.SellingEndDate),
            SellingEndTime: dayjs(obj.SellingEndDate),
            SellingStartDate: dayjs(obj.SellingStartDate),
            SellingStartTime: dayjs(obj.SellingStartDate),
            TicketImage: obj.TicketImage || null,
        })
        setEditPreviousData({
            ...obj,
            SellingEndDate: dayjs(obj.SellingEndDate),
            SellingEndTime: dayjs(obj.SellingEndDate),
            SellingStartDate: dayjs(obj.SellingStartDate),
            SellingStartTime: dayjs(obj.SellingStartDate),
        })
        setTicketRateModal(true)
        setEditMode(true)
        setValue('TicketImage', obj.TicketImage || null)
    }

    const submit = async formData => {
        setLoading(true)
        const startDate =
            dayjs(formData.SellingStartDate).format('YYYY-MM-DD') +
            ' ' +
            dayjs(formData.SellingStartTime).format('HH:mm:ss')
        const endDate =
            dayjs(formData.SellingEndDate).format('YYYY-MM-DD') +
            '  ' +
            dayjs(formData.SellingEndTime).format('HH:mm:ss')
        const submitedData = {
            ...formData,
            IsSeatOption,
            GroupedTicketCount: Number(formData.GroupedTicketCount || '0'),
            MaxPerOrder: Number(formData.MaxPerOrder || '0'),
            TicketPrice: Number(formData.TicketPrice || '0'),
            TicketDiscount: Number(formData.TicketDiscount || '0'),
            ServiceFee: Number(formData.ServiceFee || '0'),
            SellingStartDate: startDate,
            SellingEndDate: endDate,
            tempId: new Date().toISOString(),
        }
        delete submitedData.SellingEndTime
        delete submitedData.SellingStartTime
        const { seatNumber, error: suberror } = TicketUtility.RowToNumber(
            submitedData.RowSeat,
        )
        if (false && suberror && seatOption && submitedData?.RowSeat?.length) {
            setError(suberror)
            return
        }
        submitedData.SeatNo = submitedData?.SeatNo
            ? `${submitedData?.SeatNo},${seatNumber.toString()}`
            : `${seatNumber.toString()}`
        // submitedData.SeatNo =
        //     TicketUtility.NumberToCommaSeprated(submitedData.SeatNo) +
        //     (editPreviousData?.Seats?.length
        //         ? ';' +
        //           editPreviousData.Seats.map(item => item.SeatNo)
        //               .toString()
        //               .replaceAll(',', ';')
        //         : '')
        delete submitedData.RowSeat
        if (!submitedData.SeatNo) {
            delete submitedData.SeatNo
        }
        try {
            let newData = {}
            if (eventData.ProviderEventId) {
                const apiData = { ...submitedData }
                delete apiData.RowSeat
                delete apiData.Seats
                if (editPreviousData.EventTicketId) {
                    data = await EventsService.updateTicket({
                        ...editPreviousData,
                        ...apiData,
                        ProviderEventId: eventData.ProviderEventId,
                        EventTicketId: editPreviousData.EventTicketId,
                    })
                    newData = { ...data.Result }
                } else {
                    delete apiData.EventTicketId
                    data = await EventsService.addTicket({
                        ...editPreviousData,
                        ...apiData,
                        DisplayOrder: ticketData.length,
                        ProviderEventId: eventData.ProviderEventId,
                    })
                    newData = { ...data.Result }
                }
            }
            if (!editMode) {
                setTicket([{ ...submitedData,EventTicketId: newData.EventTicketId }, ...ticketData])
            } else {
                const index = ticketData.findIndex(
                    item => item.TicketType === editPreviousData.TicketType,
                )
                ticketData[index] = { ...editPreviousData, ...submitedData,EventTicketId: newData.EventTicketId }
                setTicket([...ticketData])
            }
            setLoading(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            reset({})
            setError('')
            setEditPreviousData({})
            setTicketRateModal(false)
        }
    }

    const removeTicket = async () => {
        const filteredTicket = ticketData.filter(
            item => (item?.EventTicketId || item?.tempId) !== ticketRemoveModal,
        )
        const findObj = ticketData.find(
            item => (item?.EventTicketId || item?.tempId) === ticketRemoveModal,
        )
        if (eventData?.ProviderEventId) {
            await EventsService.removeTicket(findObj.EventTicketId)
        }
        setTicketData([...filteredTicket])
        setTicket([...filteredTicket])
        PushNotification(NotificationText.removed, NotificationStatus.success)
        setTicketRemoveModal(false)
    }

    const openRemoveTicketModal = data => {
        setTicketRemoveModal(data?.EventTicketId || data?.tempId)
    }

    const removeSeat = async id => {
        await EventsService.removeSeat(id)
        setEditPreviousData({
            ...editPreviousData,
            Seats: editPreviousData.Seats.filter(item => item.SeatId !== id),
        })
    }
    useEffect(() => {
        if (freeEvent) {
            setValue('TicketPrice', 0)
            setValue('TicketDiscount', 0)
            setValue('ServiceFee', 0)
        }
    }, [freeEvent])
    const orderChanged = async ordereddata => {
        console.log(
            '🚀 ~ file: TicketTable.js ~ line 667 ~ orderChanged ~ data.ProviderEventId',
            data,
        )
        if (eventData.ProviderEventId) {
            try {
                let obj = {}
                ordereddata.map((ele, i) => {
                    obj = {
                        ...obj,
                        [ele.EventTicketId]: i,
                    }
                    return ''
                })
                await EventsService.orderTicket(obj)
            } catch {
                toast.error(ErrorConstant.default)
            }
        }
        setTicketData(ordereddata)
        setTicket(ordereddata)
    }
    return (
        <div>
            <FlexRowBetween className="my-3">
                <h2 className="heading">Ticket</h2>
                <div className="d-flex">
                    <PrimaryButton
                        className="mr-2"
                        onClick={openTicketModal}
                        disabled={IsTicket}
                    >
                        Add Ticket Rate
                    </PrimaryButton>
                    {false && (
                        <TermsConditions
                            submitTerms={submitTerms}
                            eventData={eventData}
                            terms={terms}
                        />
                    )}
                    {false && (
                        <Faqs
                            submitFaqs={submitFaqs}
                            eventData={eventData}
                            faqs={faqs}
                        />
                    )}
                    {false && (
                        <TeamMember
                            submitFaqs={submitFaqs}
                            eventData={eventData}
                            faqs={faqs}
                            disabled={!eventData.ProviderEventId}
                        />
                    )}
                    {/* <CodeModel /> */}
                </div>
            </FlexRowBetween>
            <DraggableAppTable
                keyField={
                    !eventData.ProviderEventId ? 'tempId' : 'EventTicketId'
                }
                orderChanged={orderChanged}
                columns={columns}
                data={ticketData || []}
                size="small"
            />
            <Form>
                <>
                    <PopUpModal
                        title={
                            editMode ? 'Edit Ticket Rate' : 'Add Ticket Rate'
                        }
                        open={ticketRateModal}
                        width={800}
                        onSubmit={handleSubmit(submit)}
                        onCancel={() => {
                            setTicketRateModal(false)
                            setEditMode(false)
                        }}
                        loading={loading}
                    >
                        <FormDivider />
                        <div className="col">
                            <FormCheckBoxField
                                control={control}
                                label=""
                                name="IsFreeEvent"
                            >
                                Free Ticket
                            </FormCheckBoxField>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <Upload
                                    control={control}
                                    name="TicketType"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    customRequest={uploadMedia}
                                    beforeUpload={beforeUpload}
                                >
                                    {TicketImage ? (
                                        <div className="event-ticket-img">
                                            <img
                                                src={TicketImage}
                                                alt="avatar"
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                            <div
                                                className="delete-ticket-img"
                                                onClick={removeImg}
                                            >
                                                <DeleteOutlined
                                                    style={{ fontSize: 24 }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </div>
                            <Form.Item className="col-12">
                                <FormTextFormField
                                    control={control}
                                    label="Ticket Type"
                                    name="TicketType"
                                    placeholder="Add Ticket Type"
                                    errors={errors?.TicketType}
                                    defaultValue=""
                                />
                            </Form.Item>
                            <Form.Item className="col-12">
                                <FormTextAreaFormField
                                    control={control}
                                    label="Ticket Description"
                                    name="TicketDescription"
                                    errors={errors?.TicketDescription}
                                    defaultValue=""
                                    height={50}
                                />
                            </Form.Item>
                            <Form.Item className="col-6">
                                <FormTextFormField
                                    control={control}
                                    label="Ticket Qty"
                                    name="TicketQty"
                                    placeholder="Add Ticket Qty"
                                    errors={errors?.TicketQty}
                                    defaultValue={null}
                                    type="number"
                                />
                            </Form.Item>
                            <Form.Item className="col-6">
                                <FormTextFormField
                                    control={control}
                                    label="Max Qty Per Order"
                                    name="MaxPerOrder"
                                    placeholder="Add Max Qty Per Order"
                                    errors={errors?.MaxPerOrder}
                                    defaultValue={null}
                                    type="number"
                                />
                            </Form.Item>
                            <Form.Item className="col-6">
                                <FormTextFormField
                                    control={control}
                                    label="Ticket Price"
                                    name="TicketPrice"
                                    placeholder="Add Ticket Price"
                                    errors={errors?.TicketPrice}
                                    type="number"
                                    defaultValue={freeEvent ? 0 : null}
                                    disabled={freeEvent}
                                />
                            </Form.Item>
                            {/* <Form.Item className="col-6">
                            <FormTextFormField
                                control={control}
                                label="Service Fee"
                                name="ServiceFee"
                                placeholder="Add Service Fee"
                                errors={errors?.ServiceFee}
                                type="number"
                                defaultValue={freeEvent ? 0 : null}
                                disabled={freeEvent}
                            />
                        </Form.Item> */}
                            {/* <Form.Item className="col-6">
                            <FormTextFormField
                                control={control}
                                label="Ticket Discount (%)"
                                name="TicketDiscount"
                                placeholder="Add Ticket Discount"
                                errors={errors?.TicketDiscount}
                                type="number"
                                defaultValue={freeEvent ? 0 : null}
                                disabled={freeEvent}
                            />
                        </Form.Item> */}
                            {/* <Form.Item className="col-6">
                            <FormTextFormField
                                control={control}
                                label="Display Order"
                                name="DisplayOrder"
                                placeholder="Add Display Order"
                                errors={errors?.DisplayOrder}
                                type="number"
                                defaultValue={null}
                            />
                        </Form.Item> */}
                            <Form.Item className="col-12">
                                <label className="d-flex align-items-center">
                                    <div className="lable mb-3 mr-2">
                                        Selling Start & End Date/Time
                                    </div>
                                    <span className="ml-2 mb-3">
                                        <Checkbox
                                            checked={endTicketSell}
                                            onChange={e => {
                                                setEndTicketSell(
                                                    e.target.checked,
                                                )
                                                if (e.target.checked) {
                                                    setValue(
                                                        'SellingStartDate',
                                                        SellingStartDate,
                                                    )
                                                    setValue(
                                                        'SellingStartTime',
                                                        SellingStartTime,
                                                    )
                                                    setValue(
                                                        'SellingEndDate',
                                                        dayjs(),
                                                    )
                                                    setValue(
                                                        'SellingEndTime',
                                                        dayjs(),
                                                    )
                                                }
                                            }}
                                        >
                                            End Ticket Sell
                                        </Checkbox>
                                    </span>
                                </label>
                                <DateAndTime className="row">
                                    <div className="col-6 mb-4">
                                        <div className="lable mb-3">
                                            Start Date{' '}
                                            <span className="imp">*</span>
                                        </div>
                                        <FormDateField
                                            control={control}
                                            name="SellingStartDate"
                                            errors={errors?.SellingStartDate}
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="col-6">
                                        <div className="lable mb-3">
                                            Start Time{' '}
                                            <span className="imp">*</span>
                                        </div>
                                        <FormTimeField
                                            control={control}
                                            name="SellingStartTime"
                                            errors={errors?.SellingStartTime}
                                            defaultValue=""
                                        />
                                    </div>
                                </DateAndTime>
                                <DateAndTime className="row">
                                    <div className="col-6">
                                        <div className="lable mt-3 mb-3">
                                            End Date{' '}
                                            <span className="imp">*</span>
                                        </div>
                                        <FormDateField
                                            control={control}
                                            name="SellingEndDate"
                                            errors={errors?.SellingEndDate}
                                            disabledDate={eventStartDate}
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="d-flex align-items-center">
                                            <div className="lable mt-3 mb-3">
                                                End Time{' '}
                                                <span className="imp">*</span>
                                            </div>
                                        </label>
                                        <FormTimeField
                                            control={control}
                                            name="SellingEndTime"
                                            errors={errors?.SellingEndTime}
                                            defaultValue=""
                                        />
                                    </div>
                                </DateAndTime>
                                {/* <FormDateTimeField
                                control={control}
                                // label="Selling Start & End Date/Time"
                                name="SellingStartEndDateTime"
                                errors={errors?.SellingStartEndDateTime}
                                defaultValue={null}
                            /> */}
                            </Form.Item>
                            <Form.Item className="col-6">
                                <FormCheckBoxField
                                    control={control}
                                    label=""
                                    name="IsGroupedTicket"
                                    errors={errors?.IsGroupedTicket}
                                >
                                    Is Grouped Ticket ?
                                </FormCheckBoxField>
                                <div className="col">
                                    <FormTextFormField
                                        control={control}
                                        name="GroupedTicketCount"
                                        placeholder="No. of Group Ticket"
                                        type="number"
                                        errors={errors?.GroupedTicketCount}
                                        disabled={!IsGroup}
                                    />
                                </div>
                            </Form.Item>
                            {editPreviousData?.Seats && (
                                <Form.Item className="col-12">
                                    {editPreviousData?.Seats?.filter(
                                        item => item.Status === 1,
                                    ).map(item => {
                                        return (
                                            <Tag
                                                key={item.SeatId}
                                                closable
                                                style={{
                                                    userSelect: 'none',
                                                    // marginBottom: '5px',
                                                }}
                                                color={theme.colors.secondary}
                                                onClose={() => removeSeat(item.SeatId)}
                                            >
                                                {item.SeatNo}
                                            </Tag>
                                        )
                                    })}
                                </Form.Item>
                            )}
                            <Form.Item className="col-6">
                                <FormCheckBoxField
                                    control={control}
                                    label=""
                                    name="IsActive"
                                    errors={errors?.IsActive}
                                >
                                    Active
                                </FormCheckBoxField>
                            </Form.Item>
                            {/* <Form.Item className="col-6">
                            <FormCheckBoxField
                                control={control}
                                label=""
                                name="IsFreeEvent"
                                errors={errors?.IsFreeEvent}
                                disabled={AddFreeTicket}
                                defaultValue={AddFreeTicket}
                            >
                                No Price Ticket
                            </FormCheckBoxField>
                        </Form.Item> */}
                            <Form.Item className="col-6">
                                <FormCheckBoxField
                                    control={control}
                                    label=""
                                    name="IsSeatOption"
                                    errors={errors?.IsSeatOption}
                                    disabled={freeEvent}
                                >
                                    Seat Option
                                </FormCheckBoxField>
                            </Form.Item>
                            <Form.Item className="col-6">
                                <FormCheckBoxField
                                    control={control}
                                    label=""
                                    name="IsNotForSale"
                                    errors={errors?.IsNotForSale}
                                    disabled={freeEvent}
                                >
                                    Not For Sale
                                </FormCheckBoxField>
                            </Form.Item>
                            <FormDivider className="mb-2" />
                            {false && seatOption && (
                                <Form.Item className="col-12">
                                    <FlexRowBetween className="col-12 align-items-center">
                                        <h3>Seat Details</h3>
                                        <OutlinedButton onClick={addNew}>
                                            <Plus className="mr-3" />
                                            <span className="mx-2">
                                                Add Row
                                            </span>
                                        </OutlinedButton>
                                    </FlexRowBetween>
                                    {fields.map((item, index) => {
                                        return (
                                            <Form.Item
                                                key={`seat-details-${index}`}
                                                className={`row-seat-${index}`}
                                            >
                                                <div className="row">
                                                    <div className="col-3">
                                                        <FormTextFormField
                                                            control={control}
                                                            label="Row"
                                                            name={`RowSeat.${index}.row`}
                                                            placeholder="A"
                                                            errors={
                                                                errors
                                                                    ?.RowSeat?.[
                                                                    index
                                                                ]?.row
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-9">
                                                        <FormTextFormField
                                                            control={control}
                                                            label="Seat"
                                                            name={`RowSeat.${index}.seat`}
                                                            placeholder="10-20,30"
                                                            errors={
                                                                errors
                                                                    ?.RowSeat?.[
                                                                    index
                                                                ]?.seat
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Form.Item>
                                        )
                                    })}
                                    <FormTextAreaFormField
                                        control={control}
                                        label="Seat Number"
                                        name="SeatNo"
                                        placeholder="A10-A20,10,30"
                                        errors={errors?.SeatNo}
                                    />
                                </Form.Item>
                            )}
                            <Form.Item className="col-6">
                                <FormNormalField
                                    label="Total Price"
                                    value={CommonUtility.discountedValue(
                                        price,
                                        discount,
                                    )}
                                />
                            </Form.Item>
                            <DangerText>{error && error}</DangerText>
                        </div>
                    </PopUpModal>
                    <PopUpModal
                        open={!!ticketRemoveModal}
                        onSubmit={removeTicket}
                        onCancel={() => setTicketRemoveModal(false)}
                    >
                        <h2>Are You Sure To Want To Remove Ticket Section ?</h2>
                    </PopUpModal>
                </>
            </Form>
        </div>
    )
}
