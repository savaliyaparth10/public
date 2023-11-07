import React,{ useState } from 'react'
import { Form,Modal } from 'antd'
import styled from 'styled-components'
import { DangerText } from 'components'
import { PrimaryButton } from "elements";
import OTPInput from "otp-input-react";
import { AuthService } from 'utility';
// import { sendEmailVerification } from 'firebase/auth';
import { useAuth } from "context"

const CommanAuthScreenLogin = styled.div`
    .otp-box {
        input { color: black !important; }
    }
    background: #fffff;
    .img {
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
    .otp-box {
        justify-content:space-between;
        gap:10px;
        input {
            width: 3rem !important;
            height: 3rem !important;
            margin: 0 !important;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.3);
        }
    }
`
export const EmailVerificationModal = ({ open,closeModal }) => {

    const [processing,setProcessing] = useState('');
    const [error,setError] = useState('');
    const [otp,setOtp] = useState('');
    const { user } = useAuth()

    const submit = async () => {
        try {
            setError('')
            setProcessing('Processing')
            const result = await AuthService.verifyCode(otp)
            console.log(result)
            closeModal()
        } catch (error) {
            console.log(error)
            setError('Invalid Verification Code')
        } finally {
            setProcessing('')
        }
    }

    const resend = async () => {
        try {
            console.log(user)
            const result = await AuthService.sendOTP({ Email: user.email })
            console.log(result)
            // await sendEmailVerification(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            className="otp-modal"
            title="Email Verification"
            open={open}
            onCancel={closeModal}
            footer={null}
            centered
            maskClosable={false}
        >
            <CommanAuthScreenLogin>
                <div>
                    Please enter verification code we just send you on email
                </div>
                <Form.Item className="my-4">
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        autoFocus
                        OTPLength={6}
                        otpType="number"
                        className="otp-box"
                    />
                </Form.Item>
                {error && <DangerText>{error}</DangerText>}
                <Form.Item>
                    <a
                        className="float-right"
                        onClick={() => resend()}
                    >
                        Resend Code
                    </a>
                </Form.Item>
                <Form.Item>
                    <PrimaryButton
                        block
                        type="button"
                        disabled={otp.length !== 6}
                        onClick={submit}
                        loading={!!processing}
                    >
                        Submit
                    </PrimaryButton>
                </Form.Item>
            </CommanAuthScreenLogin>
        </Modal>
    )
}
