import { Spin } from "antd";
import styled from "styled-components";

const Spiner = styled(Spin)`
.ant-spin-dot-item {
    background-color: ${({ theme }) => theme.colors.primary} !important;
}
`
export const LoaderBar = ({ loading, size = "middle" }) => (
    <Spiner spinning={loading} size={size} />
)
