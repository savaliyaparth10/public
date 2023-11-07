import React, { useState } from 'react'
import { Form, Table } from 'antd'
import { FormTextFormField, PrimaryButton, FormDivider, FormCheckBoxField } from 'elements'
import * as yup from 'yup'
import { DangerText } from 'components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { EventsService } from 'utility'
import { GetSponsersTicketByEvent } from 'hooks'

const EventSchema = yup.object().shape({
    TicketType: yup.string().required('*Ticket Name is required'),
    TicketQty: yup.number().required('*TicketQty is required'),
    IsActive: yup.boolean(),
})

const TicketFormScreen = ({ ProviderEventId }) => {
    const [error, setError] = useState('')
    const [isEditing, setIsEditing] = useState(false) // Track edit mode
    const [editIndex, setEditIndex] = useState(null) // Index of the record being edited
    const { data, setData } = GetSponsersTicketByEvent(634 || ProviderEventId)
    console.log(
        '🚀 ~ file: ticket-form.js:25 ~ TicketFormScreen ~ data:',
        data,
        ProviderEventId,
    )
    const {
        control,
        handleSubmit,
        reset,
        setValue, // Function to set form field values
        formState: { errors },
    } = useForm({
        resolver: yupResolver(EventSchema),
        defaultValues: {
            TicketType: '',
            TicketQty: '',
        },
    })

    const submit = async formData => {
        console.log(
            '🚀 ~ file: ticket-form.js:40 ~ submit ~ formData:',
            formData,
        )
        try {
            setError('')
            if (isEditing) {
                const updatedData = [...data]
                updatedData[editIndex] = formData
                await EventsService.addSponserTicket({
                    TicketQty: formData.TicketQty,
                    TicketType: formData.TicketType,
                    ProviderEventId: 634,
                    IsActive: formData.IsActive,
                    IsSponsorTicket: true,
                })
                setData(updatedData)
                setIsEditing(false) // Exit edit mode
                setEditIndex(null)
            } else {
                await EventsService.addSponserTicket({
                    TicketQty: formData.TicketQty,
                    TicketType: formData.TicketType,
                    ProviderEventId: 634,
                    IsActive: formData.IsActive,
                    IsSponsorTicket: true,
                    TicketDescription: '',
                })
                setData(prevData => [...prevData, formData])
            }
            reset()
        } catch (error) {
            console.log('🚀 ~ file: ticket-form.js:63 ~ submit ~ error:', error)
        }
    }

    const handleEdit = (record, index) => {
        setValue('TicketType', record.TicketType)
        setValue('TicketQty', record.TicketQty)

        setIsEditing(true)
        setEditIndex(index)
    }
    const handleDelete = (index) => {
        const updatedData = [...data];
        updatedData.splice(index, 1);
        setData(updatedData);
    }

    const handleCancelEdit = () => {
        setValue('TicketType', '')
        setValue('TicketQty', '')
        setIsEditing(false)
        setEditIndex(null)
    }

    const columns = [
        {
            title: 'Ticket Type',
            dataIndex: 'TicketType',
            key: 'TicketType',
            render: text => <a>{text}</a>,
        },
        {
            title: 'TicketQty',
            dataIndex: 'TicketQty',
            key: 'TicketQty',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record, index) => (
                <div>
                    <EditOutlined
                        style={{ fontSize: '18px' }}
                        onClick={() => handleEdit(record, index)}
                    />
                    <DeleteOutlined
                        style={{ fontSize: '18px', margin: '10px' }}
                        onClick={() => handleDelete(index)}
                    />
                </div>
            ),
        },
    ]

    return (
        <div>
            <FormDivider className="mt-0" />
            {error && <DangerText>{error}</DangerText>}

            <div style={{ background: '#000000' }} className="p-4">
                <div className="row px-4 col-12">
                    <div className="col-12">
                        <Form.Item className="col-12 col-sm-12 col-md-12">
                            <div className="label pb-1">
                                Ticket Name
                                <span className="imp">*</span>
                            </div>
                            <FormTextFormField
                                control={control}
                                name="TicketType"
                                placeholder="Ticket Type"
                                errors={errors?.TicketType?.message}
                            />
                        </Form.Item>
                    </div>

                    <div className="col-12">
                        <Form.Item className="col-12 col-sm-12 col-md-12">
                            <div className="label pb-1">
                                Ticket Quantity <span className="imp">*</span>
                            </div>
                            <FormTextFormField
                                control={control}
                                name="TicketQty"
                                type="number"
                                placeholder="TicketQty"
                                errors={errors?.TicketQty?.message}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-12">
                        <Form.Item className="col-12 col-sm-12 col-md-12">
                            <div className="label pb-1">
                                Is Active <span className="imp">*</span>
                            </div>
                            <FormCheckBoxField
                                control={control}
                                name="IsActive"
                                placeholder="IsActive"
                                errors={errors?.IsActive?.message}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-12 d-flex align-items-center">
                        {isEditing ? (
                            <div className="col-12 d-flex justify-content-center gap-2">
                                <PrimaryButton
                                    className="col-3 p-3 d-flex flex-row align-items-center border justify-content-center"
                                    onClick={handleSubmit(submit)}
                                >
                                    Update
                                </PrimaryButton>
                                <PrimaryButton
                                    className="col-3 p-3 d-flex flex-row align-items-center border justify-content-center"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </PrimaryButton>
                            </div>
                        ) : (
                            <PrimaryButton
                                className="col-12 p-3 d-flex flex-row align-items-center border justify-content-center"
                                block
                                onClick={handleSubmit(submit)}
                            >
                                Add
                            </PrimaryButton>
                        )}
                    </div>

                    <div className="my-3">
                        <Table
                            columns={columns}
                            dataSource={data}
                            size="small"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketFormScreen
