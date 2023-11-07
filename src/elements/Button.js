import { Button } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)`
    height: 35px;
`
export const PrimaryButton = styled(StyledButton)`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    :disabled {
        opacity: 0.7;
    }
    &:hover {
        border-color: ${({ theme }) => theme.colors.secondary} !important;
    }
`

export const RoundedCornerButton = styled(Button)`
    text-align: center;
    background: ${({ theme, selected }) =>
        selected ? theme.colors.danger : theme.colors.secondary};
    background: ${({ color }) => color && color};
    color: ${({ theme }) => theme.colors.white};
    height: 40px;
    cursor: pointer;
    border-radius: 10px;
    margin-top: 20px;
    border: 1px solid
        ${({ theme, selected }) =>
            !selected ? theme.colors.gray : theme.colors.danger};
    padding: 0rem 1rem;
    &:hover {
        background: ${({ theme, disabled }) =>
            !disabled && theme.colors.danger} !important;
        border-color: ${({ theme, disabled }) =>
            !disabled && theme.colors.danger} !important;
    }
`

export const OutlinedButton = styled(PrimaryButton)`
    background: ${({ theme }) => theme.colors.secondary};
    height: 35px;
    span {
        color: ${({ theme }) => theme.text.grayContent};
    }
    border: 1px solid ${({ theme }) => theme.colors.primary};
    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
        border-color: ${({ theme }) => theme.colors.secondary} !important;
    }
`
export const UploadButton = styled.div`
    width: 150px;
    height: 150px;
    border: 1px dashed #8a8a8a;
    text-align: center;
    border-radius: 10px;
    padding: 2.5rem 0rem;
    cursor: pointer;
    font-size: 18px;
`

export const BorderButton = styled(Button)({
    border: '0.5px solid',
})

export const DangerButton = styled(StyledButton)`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
`
export const ShadowBox = styled.div`
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0 2px 15px rgba(57, 57, 72, 0.05);
    border-radius: 5px;
    padding: 1.3em;
`

const ImageContainer = styled.img`
    width: 22px;
`

export const GoogleButton = ({ onGoogleSignIn, ...rest }) => (
    <BorderButton
        className="d-flex flex-row align-items-center justify-content-center my-2"
        type="button"
        onClick={onGoogleSignIn}
        {...rest}
    >
        <ImageContainer src="/images/login/google.png" className="img" />
        <div className="ml-2">Continue with Google</div>
    </BorderButton>
)
