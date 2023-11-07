import React,{ useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form } from 'antd'
import { DangerText,FlexColumn } from 'components'
import { FirebaseService } from "utility";
import { PrimaryButton,GoogleButton,FormTextFormField,FormCheckBoxField } from "elements";
import { createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import { useAuth } from 'context'

const RegisterSchema = yup.object().shape({
    FullName: yup.string().trim().required('*First Name is required'),
    Email: yup.string().trim().email().required('*Email is required'),
    Password: yup.string().trim().required('*Password is required'),
    CellPhone: yup.string().trim().required('*Cell Phone is required'),
    agree: yup.bool().oneOf([true],"You must accept the terms and conditions"),
    IsSubscribe: yup.bool(),
})

export const Register = ({ toggleModal }) => {
    const [processing,setProcessing] = useState('');
    const [error,setError] = useState('');
    const { setSingUpFormData } = useAuth();
    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterSchema),
    })

    const agree = watch("agree")

    const submit = async (formData) => {
        try {
            setError('')
            setProcessing('Processing')

            const firebaseResult = await createUserWithEmailAndPassword(FirebaseService.auth,formData.Email,formData.Password);
            const registerData = {
                ...formData,
                Password: null,
                CustomerUId: firebaseResult.user.uid,
            }
            setSingUpFormData(registerData)
            console.log("result", firebaseResult)
            toggleModal(false)
        } catch (error) {
            console.log(error)
            setError("something went wrong")
        } finally {
            setProcessing('')
        }
    }

    const onGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(FirebaseService.auth,provider)
            toggleModal(false)
        } catch (error) {
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error,credential)

        }
    };

    return (
        <div className="position-relative">
            <Form
                className="mt-4">
                <div className="row ">
                    <div className="col">
                        <Form.Item>
                            <FormTextFormField
                                control={control}
                                label="Full Name"
                                name="FullName"
                                placeholder="Full Name"
                                errors={errors?.FullName}
                                defaultValue=""
                            />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item>
                    <FormTextFormField
                        control={control}
                        label="Email"
                        name="Email"
                        placeholder="Email"
                        errors={errors?.Email}
                        defaultValue=""
                    />
                </Form.Item>
                <Form.Item className="">
                    <FormTextFormField
                        control={control}
                        label="Password"
                        name="Password"
                        placeholder="Password"
                        errors={errors?.Password}
                        defaultValue=""
                        type="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <FormTextFormField
                        control={control}
                        label="Mobile No."
                        name="CellPhone"
                        placeholder="Mobile No."
                        errors={errors?.CellPhone}
                        defaultValue=""
                    />
                </Form.Item>

                <Form.Item className="">
                    <FormCheckBoxField
                        control={control}
                        name="IsSubscribe"
                    >
                        Subscribe to Newsletter
                    </FormCheckBoxField>
                    <FormCheckBoxField
                        control={control}
                        name="agree"
                    >
                        I Agree to Terms and Conditions
                    </FormCheckBoxField>
                </Form.Item>
                {error && <DangerText>{error}</DangerText>}
                <FlexColumn className="mt-2">
                    <PrimaryButton
                        block
                        type="submit"
                        loading={!!processing}
                        onClick={handleSubmit(submit)}
                        disabled={!agree}
                    >
                        CREATE ACCOUNT
                    </PrimaryButton>
                    <GoogleButton
                        onGoogleSignIn={onGoogleSignIn}
                    />
                </FlexColumn>
            </Form>
        </div>
    )
}
