import React, { useState } from 'react'
import { Form, Table, Select } from 'antd'
import { FormDivider, FormTextFormField, PrimaryButton } from 'elements'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EditOutlined } from '@ant-design/icons'
import { DangerText } from 'components'

const { Option } = Select

const EventSchema = yup.object().shape({
    CompanyName: yup.string().required('*Company Name is required'),
    ContactName: yup.string().required('*Contact Name is required'),
    Email: yup.string().required('*Email is required'),
    Phone: yup.string().required('*Phone is required'),
    SponsorTicket: yup.string().required('*Sponsor Ticket is required'),
    TotalTicket: yup.number().required('*Total Ticket is required'),
    IsActive: yup.boolean(),
})

const ManualScreen = ({ id }) => {
    console.log('🚀 ~ file: ManualScreen.js:25 ~ ManualScreen ~ id:', id)
    const [error, setError] = useState('')
    console.log('🚀 ~ file: ManualScreen.js:26 ~ ManualScreen ~ error:', error)
    const [isEditing, setIsEditing] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [data, setData] = useState([]) // Replace with your actual data source

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(EventSchema),
        defaultValues: {
            CompanyName: '',
            ContactName: '',
            Email: '',
            Phone: '',
            SponsorTicket: '',
            TotalTicket: '',
        },
    })

    const placeId = watch('PlaceId')

    const items = [
        { key: '1', label: 'Option 1', value: 'Option 1', PlaceGroupId: 1 },
        { key: '2', label: 'Option 2', value: 'Option 2', PlaceGroupId: 2 },
    ]

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'CompanyName',
            key: 'CompanyName',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Contact Name',
            dataIndex: 'ContactName',
            key: 'ContactName',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'Phone',
        },
        {
            title: 'Sponsor Ticket',
            dataIndex: 'SponsorTicket',
            key: 'SponsorTicket',
        },
        {
            title: 'Total Ticket',
            dataIndex: 'TotalTicket',
            key: 'TotalTicket',
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
                </div>
            ),
        },
    ]

    const handleEdit = (record, index) => {
        setValue('CompanyName', record.CompanyName)
        setValue('ContactName', record.ContactName)
        setValue('Email', record.Email)
        setValue('Phone', record.Phone)
        setValue('TotalTicket', record.TotalTicket)
        setIsEditing(true)
        setEditIndex(index)
    }

    const handleCancelEdit = () => {
        setValue('CompanyName', '')
        setValue('ContactName', '')
        setValue('Email', '')
        setValue('Phone', '')
        setValue('TotalTicket', '')
        setIsEditing(false)
        setEditIndex(null)
    }

    const submit = async formData => {
        try {
            setError('')
            if (isEditing) {
                const updatedData = [...data]
                updatedData[editIndex] = formData
                setData(updatedData)
                setIsEditing(false)
                setEditIndex(null)
            } else {
                setData(prevData => [...prevData, formData])
            }
            reset()
        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <div>
        <FormDivider className="mt-0" />
        {error && <DangerText>{error}</DangerText>}

        <div style={{ background: '#000000' }} className="p-4">
            <div className="row px-4 col-12">
                <div className="d-flex justify-content-between gap-4">
            <div className="col-6">
                    <Form.Item className="col-12 col-sm-12 col-md-12">
                        <div className="label pb-1">
                            Company Name
                            <span className="imp">*</span>
                        </div>
                        <FormTextFormField
                            control={control}
                            name="CompanyName"
                            placeholder="Company Name"
                            errors={errors?.CompanyName?.message}
                        />
                    </Form.Item>
                </div>

                <div className="col-6">
                    <Form.Item className="col-12 col-sm-12 col-md-12">
                        <div className="label pb-1">
                            Contact Name <span className="imp">*</span>
                        </div>
                        <FormTextFormField
                            control={control}
                            name="ContactName"
                            placeholder="ContactName"
                            errors={errors?.ContactName?.message}
                        />
                    </Form.Item>
                </div>
                </div>

                <div className="d-flex justify-content-between gap-4">

                <div className="col-6">
                    <Form.Item className="col-12 col-sm-12 col-md-12">
                        <div className="label pb-1">
                            Email <span className="imp">*</span>
                        </div>
                        <FormTextFormField
                            control={control}
                            name="Email"
                            placeholder="Email"
                            errors={errors?.Email?.message}
                        />
                    </Form.Item>
                </div>

                <div className="col-6">
                    <Form.Item className="col-12 col-sm-12 col-md-12">
                        <div className="label pb-1">
                            Phone <span className="imp">*</span>
                        </div>
                        <FormTextFormField
                            control={control}
                            name="Phone"
                            type="number"
                            placeholder="Phone"
                            errors={errors?.Phone?.message}
                        />
                    </Form.Item>
                </div>
                </div>

                <div className="d-flex justify-content-between gap-4">
                <div className="col-6">
                 <Form.Item className="col-12 col-sm-12 col-md-12">
                 <div className="label pb-1">
                     Sponsor Ticket <span className="imp">*</span>
                 </div>
                 <Select
                    placeholder="Select Sponsor Ticket"
                    onChange={value => setValue('SponsorTicket', value)}
                    value={watch('SponsorTicket')}
                    options={items}
                >
                    {items
                        .filter(item => item.PlaceGroupId === placeId)
                        .map(filteredItem => (
                            <Option
                                key={filteredItem.key}
                                value={filteredItem.value}
                            >
                                {filteredItem.label}
                            </Option>
                        ))}
                </Select>
            </Form.Item>
                </div>
                <div className="col-6">
                    <Form.Item className="col-12 col-sm-12 col-md-12">
                        <div className="label pb-1">
                            Total Tickets <span className="imp">*</span>
                        </div>
                        <FormTextFormField
                            control={control}
                            name="TotalTicket"
                            type="number"
                            placeholder="TotalTicket"
                            errors={errors?.TotalTicket?.message}
                        />
                    </Form.Item>
                </div>
                </div>

                {/* Add similar Form.Item blocks for other input fields here */}

                <div className="col-12 d-flex justify-content-center align-items-center">
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
                        <div className="col-12 d-flex justify-content-center gap-2">
                            <PrimaryButton
                                className="col-3 p-3 d-flex flex-row align-items-center border justify-content-center"
                                onClick={handleSubmit(submit)}
                            >
                                Add
                            </PrimaryButton>
                        </div>
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

export default ManualScreen
