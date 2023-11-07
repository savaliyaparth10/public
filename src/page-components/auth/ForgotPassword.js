import { useNavigate } from "react-router-dom";
import React,{ useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form } from 'antd'
import styled from 'styled-components'
import { DangerText } from 'components'
import { AuthPopup,AuthService } from "utility";
import { useAuth } from "context";
import { PrimaryButton,FormTextFormField } from "elements";

const LoginSchema = yup.object().shape({
    email: yup.string().required('*Email is required'),
})
const CommanAuthScreenLogin = styled.div`
    background: #fffff;
    .img {
        background-color: ${({ theme }) => theme.colors.primary};
        width:100px;
        border-radius:5px;
        padding:10px;
    }
    b {
        display: flex;
        align-items: center;
        gap: 10px;  
    }
    .ant-form-item {
        margin-bottom: 10px;
    }
`

export const ForgotPassword = ({ toggleModal }) => {

    const navigate = useNavigate();
    const authContext = useAuth();
    const [processing,setProcessing] = useState('');
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
            setProcessing('Processing')
            const result = await AuthService.login({
                Email: formData.email,
            })
            authContext.login(result)
            navigate("/app")
        } catch (error) {
            console.log(error)
            setError('Invalid Email Address')
        } finally {
            setProcessing('')
        }
    }

    return (
        <div className="position-relative">
            <CommanAuthScreenLogin>
                <Form className="">
                    <Form.Item>
                        <FormTextFormField
                            control={control}
                            label="Email"
                            name="email"
                            placeholder="Email"
                            errors={errors?.email}
                            defaultValue=""
                        />
                    </Form.Item>
                    {error && <DangerText>{error}</DangerText>}
                    <Form.Item>
                        <PrimaryButton
                            block
                            type="submit"
                            onClick={handleSubmit(submit)}
                            loading={!!processing}
                        >
                            Send Recovery Email
                        </PrimaryButton>
                    </Form.Item>
                    <Form.Item className="text-center">
                        <a
                            onClick={() => toggleModal(AuthPopup.login)}
                            className="text-center"
                        >
                            Back to Login
                        </a>
                    </Form.Item>
                </Form>
            </CommanAuthScreenLogin>
        </div>
    )
}
