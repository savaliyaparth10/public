import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { DangerText, FlexRowBetween, ProfileContainer, PushNotification } from 'components';
import { useAuth } from 'context';
import { FormDivider, FormTextFormField, OutlinedButton, PrimaryButton } from 'elements';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthService, NotificationStatus, NotificationText } from 'utility';
import * as yup from 'yup'

const UserSchema = yup.object().shape({
    FullName: yup.string().required('*fullName is required'),
    CellPhone: yup.string().required('*phone is required'),
    Email: yup.string().email().required('*email is required'),
})

export const UserInfoTab = () => {
    const { profile } = useAuth();
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit, reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(UserSchema),
    })

    useEffect(() => {
        reset({
            ...profile,
        })
    }, [profile])

    const submit = async (formData) => {
        setLoading(true)
        try {
            await AuthService.updateUser({
                ...formData,
                CustomerUId: profile.CustomerUId,
                IsSignIn: true,
            })
            PushNotification(NotificationText.profileUpdate,NotificationStatus,error)
        } catch (error) {
            console.log(error)
            PushNotification(NotificationText.defaultError,NotificationStatus,error)
        } finally {
            setError('')
            setLoading(false)
            setEditMode(false)
        }
    }
    return (
        <div className="position-relative row d-flex justify-content-center mb-3 mt-3">
            <div className="col-12  ml-2 mr-2 box-layout">
                <ProfileContainer>
                    <Form className="">
                        <div className="row">
                            <FlexRowBetween><h1 className="mt-0">Personal Details</h1>
                                {!editMode ? <div>
                                    <OutlinedButton
                                        className="mx-2"
                                        fluid="true"
                                        type="submit"
                                        onClick={() => setEditMode(true)}
                                    >
                                        Cancel
                                    </OutlinedButton>
                                    <PrimaryButton
                                        className=""
                                        fluid="true"
                                        type="submit"
                                        onClick={handleSubmit(submit)}
                                        loading={loading}
                                    >
                                        Save
                                    </PrimaryButton> </div> :
                                    <PrimaryButton
                                        onClick={() => setEditMode(false)}
                                    >
                                        Edit
                                    </PrimaryButton>}
                            </FlexRowBetween>
                            <Form.Item className="col-12 col-sm-12 col-md-6">
                                <FormTextFormField
                                    control={control}
                                    name="FullName"
                                    disabled={editMode}
                                    placeholder="Full name"
                                    label="Full Name"
                                    errors={errors?.FullName}
                                    defaultValue="" />
                            </Form.Item>
                            <Form.Item className="col-12 col-sm-12 col-md-6">
                                <FormTextFormField
                                    control={control}
                                    name="Email"
                                    disabled={editMode}
                                    placeholder="Email"
                                    label="Email"
                                    errors={errors?.Email}
                                    defaultValue="" />
                            </Form.Item>
                            <Form.Item className="col-12 col-sm-12 col-md-6">
                                <FormTextFormField
                                    control={control}
                                    name="CellPhone"
                                    disabled={editMode}
                                    placeholder="+00 00000 000000"
                                    label="Phone Number"
                                    errors={errors?.CellPhone}
                                    defaultValue="" />
                            </Form.Item>
                            <FormDivider />
                        </div>
                        <p className="col d-flex justify-content-end">
                        <DangerText>{error && error}</DangerText>
                        </p>
                    </Form>
                </ProfileContainer>
            </div>
        </div>
    )
}
