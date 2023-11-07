import { Spin } from "antd";
import styled from "styled-components";

const Spiner = styled(Spin)`
    position: fixed;
    z-index: 999;
    overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #0005;
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-spin-dot-item {
        background-color: ${({ theme }) => theme.colors.danger} !important;
    }
`
export const Loader = ({ loading, size = "middle" }) => (
    loading && <Spiner spinning size={size} />
)
