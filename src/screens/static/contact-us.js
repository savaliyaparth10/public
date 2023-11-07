import React, { useState } from 'react'
import styled from 'styled-components'
import {
    FormTextAreaFormField,
    FormTextFormField,
    PrimaryButton,
} from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import ContactUsCoverImg from 'assets/contact-us.svg'
import EmailImg from 'assets/Icons/email.png'
import PhoneImg from 'assets/Icons/phone.png'
import BusinessImg from 'assets/Icons/business.png'
import LocationImg from 'assets/Icons/Location2.png'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from 'antd'
import { CommonService, NotificationStatus, NotificationText } from 'utility'
import { PushNotification } from 'components'

const GetInTouch = styled.div`
    ${'' /* background-color:  ${({ theme }) => theme.colors.gray}; */}
    background: #242631;
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    max-width: 800px;
    width: calc(100% - 40px);
    margin: 50px auto;
    padding: 50px;
    border-radius: 20px;
    img {
        width: 100%;
    }
    .title {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 800;
        font-size: 30px;
        margin: 0;
    }
    .desc {
        font-family: 'Manrope';
        font-style: normal;
        font-size: 18px;
        margin: 5px 0 10px;
        color: ${({ theme }) => theme.colors.lightWhite};
        opacity: 0.5;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        padding: 2rem 1rem;
        .info {
            padding: 0 0 0 0 !important;
        }
    }
`
const Icon = styled.img`
    width: 30px !important;
    margin-right: 15px;
`
const Label = styled.span`
    font-family: 'Manrope';
    font-style: normal;
    font-size: 16px;
`
const ContactUsSchema = yup.object().shape({
    Name: yup.string().required('Name is required'),
    Email: yup
        .string()
        .email('Enter valid email address')
        .required('Email is required'),
    Message: yup.string().required('Message is required'),
})

export const ContactUsScreen = () => {
    const [processing, setProcessing] = useState('')
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ContactUsSchema),
    })
    const submit = async formData => {
        try {
            setProcessing('Processing')
            const result = await CommonService.contactUs(formData)
            console.log(result)
            PushNotification(
                'Thank you for getting in touch! We will get back in touch with you soon!',
                NotificationStatus.success,
            )
            reset({
                Name: '',
                Email: '',
                Message: '',
            })
        } catch (error) {
            console.log(error)
            PushNotification(
                NotificationText.defaultError,
                NotificationStatus.error,
            )
        } finally {
            setProcessing('')
        }
    }
    return (
        <GetInTouch className="row">
            <div className="col-md-6 col-sm-12 pe-3 info">
                <img
                    className="px-sm-4 px-md-0"
                    src={ContactUsCoverImg}
                    alt="contact us"
                />
                <div className="my-4 pt-2 ms-2">
                    <div className="d-flex my-3 align-items-center">
                        <Icon src={BusinessImg} />
                        <Label>ABN 13 700 986 082</Label>
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        <Icon src={PhoneImg} />
                        <Label>+61 433 945 206</Label>
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        <Icon src={EmailImg} />
                        <Label>support@gtikit.com</Label>
                    </div>
                    <div className="d-flex my-3 align-items-start">
                        <Icon src={LocationImg} />
                        <Label>
                            <strong>USA Office:</strong> Rutherford, New Jersey,
                            US 07070
                            <p className="my-0">1-877-7GTIKIT</p>
                        </Label>
                    </div>
                    <div className="d-flex my-3 align-items-start">
                        <Icon src={LocationImg} />
                        <Label>
                            <strong>Australia Office:</strong> Hillcrest,
                            Adelaide SA 5086
                        </Label>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-sm-12 ps-4 mt-sm-4 mt-md-0">
                <p className="title">Get in touch</p>
                <p className="desc">We are here for you! How can we help?</p>
                <Form>
                    <Form.Item>
                        <FormTextFormField
                            required
                            control={control}
                            label="Enter your full name"
                            name="Name"
                            placeholder="Enter your full name"
                            errors={errors?.Name}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item>
                        <FormTextFormField
                            required
                            control={control}
                            label="Enter Email"
                            name="Email"
                            placeholder="Enter Email"
                            errors={errors?.Email}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item>
                        <FormTextAreaFormField
                            required
                            control={control}
                            label="Enter your message"
                            name="Message"
                            placeholder="Please mention the event name"
                            errors={errors?.Message}
                            defaultValue=""
                            height={100}
                        />
                    </Form.Item>
                    <Form.Item>
                        <PrimaryButton
                            block
                            type="submit"
                            onClick={handleSubmit(submit)}
                            loading={!!processing}
                        >
                            Submit
                        </PrimaryButton>
                    </Form.Item>
                </Form>
            </div>
        </GetInTouch>
    )
}
