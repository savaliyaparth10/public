import { PopUpModal } from 'components'
import { FormDateTimeField, FormTextFormField, PrimaryButton } from 'elements'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';

const AddPlaceSchema = yup.object().shape({
    CouponCode: yup.string().required('*Place Name is required'),
    StartEndDate: yup.string().required('*AddressLine1 is required'),
    FlatDiscount: yup.number(),
    FlatPercentage: yup.number(),
})

export const CodeModel = () => {
    const [codeModal, setCodeModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(AddPlaceSchema),
        defaultValues: {
            FlatDiscount: 0,
        },
    })

    const submit = async (formData) => {
        try {
            setLoading(true)
            setCodeModal(formData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <PrimaryButton onClick={() => setCodeModal(true)}>Code</PrimaryButton>
            <Form>
                <PopUpModal
                    title="Add Places"
                    open={codeModal}
                    onSubmit={handleSubmit(submit)}
                    onCancel={() => setCodeModal(false)}
                    loading={loading}
                >
                    <div className="row">
                        <Form.Item className="col-12">
                            <FormTextFormField
                                control={control}
                                label="Coupen Code"
                                name="CouponCode"
                                placeholder="Add Coupen Code"
                                errors={errors?.CouponCode}
                                defaultValue=""
                            />
                        </Form.Item>
                        <Form.Item className="col-12">
                            <FormDateTimeField
                                control={control}
                                showTime={false}
                                label="Coupen Start & End Date"
                                name="StartEndDate"
                                errors={errors?.StartEndDate}
                                defaultValue=""
                            />
                        </Form.Item>
                        <div className="row">
                            <Form.Item className="col-5">
                                <FormTextFormField
                                    control={control}
                                    label="In Currency"
                                    name="FlatDiscount"
                                    placeholder="0"
                                    errors={errors?.FlatDiscount}
                                    defaultValue=""
                                /></Form.Item>
                            <div className="col-2 d-flex align-items-center justify-content-center">Or</div>
                            <Form.Item className="col-5">
                                <FormTextFormField
                                    control={control}
                                    label="In Percentage"
                                    name="FlatPercentage"
                                    placeholder="0"
                                    errors={errors?.FlatPercentage}
                                    defaultValue=""
                                /></Form.Item>
                        </div>
                    </div>
                </PopUpModal>
            </Form>
        </div>
    )
}