import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { FormTextFormField, PrimaryButton } from 'elements';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'antd';
import { useAuth } from 'context';
import { DangerText, ProfileContainer } from 'components';

const ChangePasswordSchema = yup.object().shape({
    newPassword: yup.string().min(8, "*New Password Must be 8 character").required('*New Password is required'),
    confirmPassword: yup.string().required('*Confirm Password is required'),
})

export const ChangePasswordTab = () => {
    const { updatePassword } = useAuth();
    const [error, setError] = useState('');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ChangePasswordSchema),
    })
    const submit = async (formData) => {
        try {
            if (formData.newPassword !== formData.confirmPassword) {
                setError('New Password and confirm password must be same!')
                return
            }
            setError('')
            updatePassword(formData)
        } catch (error) {
            console.log(error)
            setError('Invalid  password')
        } finally {
            // setProcessing('')
        }
    }
    return (
        <>
            <div className="position-relative row d-flex justify-content-center mb-5 mt-3">
                <div className="col-md-12 col-sm-6 ml-2 mr-2 box-layout">
                    <ProfileContainer>
                        <Form className="">
                            <Form.Item className="col-12 col-sm-12 col-md-4">
                                <FormTextFormField
                                    control={control}
                                    label="New Password"
                                    name="newPassword"
                                    placeholder="New Password"
                                    errors={errors?.newPassword}
                                    defaultValue=""
                                    type="password"
                                />
                            </Form.Item>
                            <Form.Item className="col-12 col-sm-12 col-md-4">
                                <FormTextFormField
                                    control={control}
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    errors={errors?.confirmPassword}
                                    defaultValue=""
                                    type="password"
                                />
                            </Form.Item>
                            <DangerText>{error && error}</DangerText>
                            <div className="">
                                <div className="col">
                                    <PrimaryButton
                                        className="col-12 col-sm-12 col-md-4 p-3 d-flex flex-row align-items-center border justify-content-center"
                                        fluid="true"
                                        type="submit"
                                        onClick={handleSubmit(submit)}>
                                        Change Password</PrimaryButton>
                                </div>
                            </div>
                        </Form>
                    </ProfileContainer>
                </div>
            </div>
        </>
    )
}