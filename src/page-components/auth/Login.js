import React,{ useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button,Form } from 'antd'
import styled from 'styled-components'
import { DangerText,ImageContainer } from 'components'
import { AuthPopup,FirebaseService } from "utility";
import { PrimaryButton, FormTextFormField } from "elements";
import {
    signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,
} from "firebase/auth";

const LoginSchema = yup.object().shape({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required'),
})

const CommanAuthScreenLogin = styled.div`
    // background: #000;
    .img {
        width:23px;
    }
    b {
        display: flex;
        align-items: center;
        gap: 10px;  
    }
    .border {
        border: solid 1px;
        border-radius:5px;

    }
    .ant-form-item {
        margin-bottom: 10px;
    }
`

export const LoginPopup = ({ toggleModal }) => {

    const [error,setError] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    })

    const submit = async (formData) => {
        try {
            setError('')
            await signInWithEmailAndPassword(
                FirebaseService.auth,
                formData.email,
                formData.password,
            );
            toggleModal('')
        } catch (error) {
            console.log(error)
            setError('Invalid username and/or password')
        } finally {
            // setProcessing('')
        }
    }

    const onGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(FirebaseService.auth,provider)
            toggleModal('')
        } catch (error) {
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error,credential)

        }
    };

    return (
        <div className="position-relative">
            <CommanAuthScreenLogin>
                <div className="mb-3 row">
                    <div className="col-12">
                        <Button
                            className="col p-3 mt-2 d-flex flex-row align-items-center border justify-content-center"
                            type="button"
                            onClick={onGoogleSignIn}
                        >
                            <ImageContainer src="/images/login/google.png" className="img" /><div className="ml-2">Continue with Google</div>
                        </Button>
                    </div>
                </div>
                <Form className="" initialValues={{ Email: '', Password: '' }}>
                    <Form.Item>
                        <FormTextFormField
                            control={control}
                            label="Email Address"
                            name="email"
                            placeholder="Email Address"
                            errors={errors?.email}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item className="">
                        <FormTextFormField
                            control={control}
                            label="Password"
                            name="password"
                            placeholder="Password"
                            errors={errors?.password}
                            defaultValue=""
                            type="password"
                        />
                    </Form.Item>
                    {error && <Form.Item>
                        <DangerText>{error}</DangerText>
                    </Form.Item>}
                    <Form.Item>
                        <a
                            className="float-right"
                            onClick={() => toggleModal(AuthPopup.forgotPassword)}
                        >
                            Forgot Password?
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <PrimaryButton className="col-12" block type="submit" onClick={handleSubmit(submit)}>
                            Login
                        </PrimaryButton>
                        <div className="text-center my-2">
                            <a
                                onClick={() => toggleModal(AuthPopup.register)}
                            >
                                Register
                            </a>
                        </div>
                    </Form.Item>

                </Form>
            </CommanAuthScreenLogin>
        </div>
    )
}
