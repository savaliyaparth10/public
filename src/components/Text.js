import styled from "styled-components";

export const TitleText = styled.b`
  font-weight:700;
  font-size: 22px;
`

export const SubTitleText = styled.b`
    font-weight: 700;
    font-size: 16px;
`

export const BlueText = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    cursor:pointer;
`

export const BoldText = styled.b`
   font-weight:700;
`

export const TextHoverUnderLine = styled(BlueText)`
  :hover { 
      text-decoration:underline;
}
`

export const DangerText = styled.span`
  color : ${({ theme }) => theme.colors.danger};
`