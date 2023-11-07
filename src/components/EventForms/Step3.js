import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form } from 'antd'
import { FormCheckBoxField, FormTextFormField, PrimaryButton } from 'elements'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { DangerText } from 'components/Common'

const EventSchema = yup.object().shape({
    WebSite: yup.string(),
    Email: yup.string().email().required('*Email is required'),
    ContactName: yup.string().required('*Contact Name is required'),
    ContactNumber: yup.string().required('*Contact Number is required'),
    NGOId: yup
        .string()
        .when('$IsNGO', (IsNGO, schema) =>
            IsNGO ? schema.required('*NGO is Required') : schema.optional()),
    FreeTicketAge: yup
        .number()
        .when('$childFree', (childFree, schema) =>
            childFree
                ? schema
                .max(18,"FreeTicketAge not greater then 18")
                .min(1,"FreeTicketAge not less Then 1").required('*FreeTicketAge is Required')
                : schema.optional()),
})

export const Step3 = ({
    data,
    submitSteps,
    currentStep, prev, next,
}) => {

    const [error, setError] = useState('')
    const [childFree, setChildFree] = useState(false)
    const [IsNGO, setIsNgo] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(EventSchema),
        context: { childFree, IsNGO },
        defaultValues: {
            FreeTicketAge: 0,
        },
    })

    useEffect(() => {
        setChildFree(true)
        reset({ FreeTicketAge: 2 })
    }, [])

    useEffect(() => {
        if (data) {
            setChildFree(data.FreeTicketAge)
            reset({ ...data })
            setIsNgo(data.IsNGO)
        }
    }, [data])

    const submit = async formData => {
        const formDataObj = {
            ...formData,
            IsNGO,
        }
        setChildFree(false)
        setError('')
        submitSteps(currentStep, formDataObj)
        next()
    }

    return (
        <div>
            <Form>
                {error && <DangerText>{error}</DangerText>}

                <div className="row">
                    <Form.Item className="col-12 col-sm-12 col-md-6">
                        <div className="lable">
                            Contact Name <span className="imp">*</span>
                        </div>
                        <FormTextFormField
                            control={control}
                            name="ContactName"
                            errors={errors?.ContactName}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item className="col-12 col-sm-12 col-md-6">
                        <div className="lable">Contact Number<span className="imp">*</span></div>
                        <FormTextFormField
                            control={control}
                            name="ContactNumber"
                            placeholder="+00 00000 000000"
                            errors={errors?.ContactNumber}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item className="col-12 col-sm-12 col-md-6">
                        <div className="lable">Email<span className="imp">*</span></div>
                        <FormTextFormField
                            control={control}
                            name="Email"
                            placeholder="abc@gmail.com"
                            errors={errors?.Email}
                            defaultValue=""
                            required
                        />
                    </Form.Item>
                    <Form.Item className="col-12 col-sm-12 col-md-6">
                        <div className="lable">Website</div>
                        <FormTextFormField
                            control={control}
                            name="WebSite"
                            placeholder="www.xyz.com"
                            errors={errors?.WebSite}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item className="col-12 col-sm-12 col-md-6">
                        <FormCheckBoxField
                            control={control}
                            label=""
                            name="ChildFree"
                            checked={childFree}
                            defaultValue={childFree}
                            onChange={e => {
                                setChildFree(e.target.checked)
                            }}
                        >
                            Kids Are Free Under
                        </FormCheckBoxField>
                        <div className="col">
                            <FormTextFormField
                            control={control}
                            name="FreeTicketAge"
                            placeholder="2 year"
                            type="number"
                            errors={errors?.FreeTicketAge}
                            defaultValue={0}
                        />
                        </div>
                    </Form.Item>
                    <Form.Item className="col-12 col-sm-12 col-md-6">
                        <FormCheckBoxField
                            control={control}
                            label=""
                            name="IsNGO"
                            checked={IsNGO}
                            onChange={e => {
                                setIsNgo(e.target.checked)
                            }}
                        >
                            Is NGO ?
                        </FormCheckBoxField>
                        <div className="col">
                            <FormTextFormField
                                control={control}
                                name="NGOId"
                                placeholder="NGOId"
                                defaultValue=""
                                errors={errors?.NGOId}
                                disabled={!IsNGO}
                            />
                        </div>
                    </Form.Item>
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
                    >
                        Next
                    </PrimaryButton>
                </div>
            </Form>
        </div>

    )
}