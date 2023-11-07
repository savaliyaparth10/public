import { ForgotPassword, LoginPopup, Register } from 'page-components'
import { FooterPage } from './footer'
import { HeaderBar } from './header'
import React, { useState, useMemo, useContext, createContext } from 'react'
import { Modal, Layout as AntdLayout } from 'antd'
import { AuthPopup } from 'utility'
import styled from 'styled-components'
import { Cookie } from './cookie'

const { Header, Content, Footer } = AntdLayout;

const HeaderLayout = styled(Header)`
    position: sticky;
    top: 0;
    z-index: 9;
    width: 100%;
    padding-inline: 0px !important;
    height: 100px;
    background: ${({ theme }) => theme.colors.primary} !important;
`

const FooterLayout = styled(Footer)`
    bottom:0px;
    width:100%;
    text-align: center;
    padding: 0px !important;
`

const MainLayout = styled(AntdLayout)`
    min-height:100vh;
    diplay:flex;
    background: ${({ theme }) => theme.colors.secondary};
    `
const LayoutContext = createContext();

export const Layout = ({ children }) => {
    const [modal, setModal] = useState('')

    const title = useMemo(() => {
        switch (modal) {
            case AuthPopup.login:
                return "Login"
            case AuthPopup.register:
                return "Register"
            case AuthPopup.forgotPassword:
                return "Forgot Password"
            default:
                return ""
        }
    }, [modal])

    const closeModal = () => {
        setModal('')
    }

    const toggleModal = (value) => {
        setModal(value)
    }

    const navigateToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    const contextData = useMemo(() => ({ modal, toggleModal, closeModal }), [modal, toggleModal, closeModal])
    return (
        <LayoutContext.Provider value={contextData}>
            <>
                <MainLayout className="layout">
                    <HeaderLayout>
                        <HeaderBar
                            toggleModal={toggleModal}
                            navigateToTop={navigateToTop}
                        />
                    </HeaderLayout>
                    <Content style={{ padding: '0px' }}>
                        {children}
                    </Content>
                    <FooterLayout>
                        <FooterPage navigateToTop={navigateToTop} />
                        <Cookie />
                    </FooterLayout>
                </MainLayout>
                <Modal
                    open={!!modal}
                    title={title}
                    onCancel={closeModal}
                    footer={null}
                    centered
                    maskClosable={false}
                >
                    {AuthPopup.login === modal && <LoginPopup toggleModal={toggleModal} />}
                    {AuthPopup.register === modal && <Register toggleModal={toggleModal} />}
                    {AuthPopup.forgotPassword === modal && <ForgotPassword toggleModal={toggleModal} />}
                </Modal>
            </>
        </LayoutContext.Provider>
    )
}

export const useLayout = () => useContext(LayoutContext)