import { PopUpModal } from 'components/PopUpModal'
import { FormTextFormField } from 'elements'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { useAuth } from 'context';

const AddPlaceSchema = yup.object().shape({
    PlaceDetailName: yup.string().required('*Place Name is required'),
    AddressLine1: yup.string().required('*AddressLine1 is required'),
    PinCode: yup.string().required('*ZipCode is required'),
    City: yup.string().required('*City is required'),
    State: yup.string().required('*State is required'),
    // PhoneNo: yup.string().required('*PhoneNo is required'),

})

export const AddPlaceModal = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false)
    const { CountryId } = useAuth()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(AddPlaceSchema),
    })

    const submit = async (formData) => {
        console.log("🚀 ~ file: AddPlace.js ~ line 33 ~ submit ~ formData", formData)
        try {
            setLoading(true)
            onClose({ ...formData, CountryId })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
            <Form>
            <PopUpModal
                title="Add Places"
                open={open}
                onSubmit={handleSubmit(submit)}
                onCancel={() => onClose(false)}
                loading={loading}
            >

                <div className="row">
                    <Form.Item className="col-12">
                        <FormTextFormField
                            control={control}
                            label="Place Name"
                            name="PlaceDetailName"
                            placeholder="Add Place Name"
                            errors={errors?.PlaceDetailName}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item className="col-12">
                        <FormTextFormField
                            control={control}
                            label="AddressLine1"
                            name="AddressLine1"
                            placeholder="Add AddressLine1"
                            errors={errors?.AddressLine1}
                            defaultValue=""
                        />                        </Form.Item>
                    <Form.Item className="col-12">
                        <FormTextFormField
                            control={control}
                            label="AddressLine2"
                            name="AddressLine2"
                            placeholder="Add AddressLine2 "
                            errors={errors?.AddressLine2}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item className="col-6">
                        <FormTextFormField
                            control={control}
                            label="City"
                            name="City"
                            placeholder="Add City Name"
                            errors={errors?.City}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item className="col-6">
                        <FormTextFormField
                            control={control}
                            label="State"
                            name="State"
                            placeholder="Add State"
                            errors={errors?.State}
                            defaultValue=""
                        />                      </Form.Item>
                    <Form.Item className="col-6">
                        <FormTextFormField
                            control={control}
                            label="ZipCode"
                            name="PinCode"
                            placeholder="Add ZipCode"
                            errors={errors?.PinCode}
                            type="number"
                            defaultValue=""
                        /></Form.Item>
                    <Form.Item className="col-6">

                        <FormTextFormField
                            control={control}
                            label="PhoneNo"
                            name="PhoneNo"
                            placeholder="Add PhoneNo"
                            errors={errors?.PhoneNo}
                            defaultValue=""
                        />                       </Form.Item>
                    <Form.Item className="col-6">
                        <FormTextFormField
                            control={control}
                            label="FaxNo"
                            name="FaxNo"
                            placeholder="Add FaxNo"
                            errors={errors?.FaxNo}
                            defaultValue=""
                        />
                    </Form.Item>
                </div>
            </PopUpModal>
        </Form>

    )
}