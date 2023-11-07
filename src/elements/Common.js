import { Checkbox, Divider, Input } from "antd";
import styled ,{ css } from "styled-components";

const { TextArea } = Input;

export const AppInput = styled(Input)`
    background: transparent !important;
    height: 50px;
    
`

export const AppTextArea = styled(TextArea)`
    // border: 1px solid #5726b0 !important;
    background: transparent !important;
    min-height: ${({ height }) => !height ? "10" : height}px !important;
`

export const AppCheckBox = styled(Checkbox)`
    // border: 1px solid #5726b0 !important;
    background: transparent !important;
    height: 70;
`

export const WhiteColor = css`
  color: ${({ theme }) => theme.white} !important;
`

export const PrimaryColor = css`
  color: ${({ theme }) => theme.primary} !important;
`

export const FormDivider = styled(Divider)`
  border-block-start : 1px solid ${({ theme }) => theme.colors.secondary};
  margin-top:0.5rem;
`
export const CommanContainer = styled.div`
  position: relative;
  @media screen and (max-width: 640px){
    padding:0 20px !important;
  }
`