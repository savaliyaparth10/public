import React, { useEffect, useMemo } from 'react'
import { AuthPopup, theme, Routes, CommonUtility } from 'utility'
import GTikitLogo from '../assets/Icons/FooterLogo.png'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Form } from 'antd'
import styled from 'styled-components'
import { CountryDropDown, ImageContainer, Loader } from 'components'
import { List } from 'phosphor-react'
import { useAuth } from 'context'
import { RoundedCornerButton, FormSelectionField } from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ShoppingOutlined } from '@ant-design/icons'

const CountrySchema = yup.object().shape({
    CountryId: yup.string(),
})

const ImageLogo = styled(ImageContainer)`
    height: 40px;
    margin-right: 15px;
    @media (max-width: 768px) {
        height: 32px;
    }
    @media (max-width: 540px) {
        height: 24px;
        margin-left: 5px;
    }
`
const HeaderMain = styled.div`
    z-index: 9999;
    height: 200px;
    .link {
        color: ${({ theme }) => theme.colors.white};
    }
`
const ImageSider = styled(ImageLogo)`
    padding: 0px;
`

const MenuTag = styled.div`
    line-height: normal;
    padding-right: 20px;
    cursor: pointer;

    button {
        margin: 0 !important;
    }
`
const PersonsName = styled.div`
    display: flex;
    align-item: center;
    border: 1px solid red;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    padding: 0.7rem;
    .text {
        display: grid;
        place-content: center;
        text-transform: uppercase;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const HeaderLayout = styled.div`
    .sidebar {
        width: 100%;
        height: inherit;
        ${'' /* padding: 0 15px; */}
    }

    height: inherit;

    .desktop {
        padding: 0 10px;
        height: inherit;
        margin: auto;
    }
`
const DropItem = styled.div`
    padding: 5px 10px;
`

export function HeaderBar({ toggleModal, navigateToTop }) {
    const {
        isAuthenticated,
        logout,
        setCountryId,
        profile,
        loading,
        CountryId: countryId,
        countryList,
    } = useAuth()
    const navigate = useNavigate()

    const {
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(CountrySchema),
        defaultValues: {
            CountryId: countryId,
        },
    })

    const CountryId = watch('CountryId')

    useEffect(() => {
        setCountryId(CountryId)
    }, [CountryId])

    const logoutProfile = async () => {
        logout()
        navigate('/')
    }

    const menuClick = (url, auth) => {
        console.log("🚀 ~ file: header.js:124 ~ menuClick ~ url, auth:", url, auth)
        if (auth) {
            toggleModal(auth)
        } else if (url) {
            navigate(url)
        }
    }

    const menu = useMemo(() => [
        {
            label: (
                <DropItem key="event" onClick={() => menuClick(Routes.events)}>
                    Events
                </DropItem>
            ),
            key: 'event',
        },
        {
            label: (
                <DropItem key="offers" onClick={() => menuClick(Routes.offers)}>
                    Offers
                </DropItem>
            ),
            key: 'offers',
        },
        // {
        //     label: (
        //         <DropItem
        //             key="addevent"
        //             onClick={() => menuClick(Routes.addEvent)}
        //         >
        //             Add Event
        //         </DropItem>
        //     ),
        //     key: 'add-event',
        // },
        {
            label: (
                <DropItem
                    key="profile"
                    onClick={() => menuClick(Routes.profile)}
                >
                    Profile
                </DropItem>
            ),
            key: 'profile',
        },
        // {
        //     label: (
        //         <DropItem key="contact-us" onClick={() => menuClick(Routes.contactUs)}>
        //             ContactUS
        //         </DropItem>
        //     ),
        //     key: 'contact-us',
        // },
        {
            label: (
                <DropItem key="logout" onClick={() => logoutProfile()}>
                    Logout
                </DropItem>
            ),
            key: 'logout',
        },
    ])

    const publicMenu = useMemo(
        () => [
            {
                label: (
                    <DropItem
                        key="event"
                        onClick={() => menuClick(Routes.events)}
                    >
                        Events
                    </DropItem>
                ),
                key: 'pub-events',
            },
            {
                label: (
                    <DropItem
                        key="register"
                        onClick={() => menuClick(null, AuthPopup.register)}
                    >
                        Register
                    </DropItem>
                ),
                key: 'pub-register',
            },
            {
                label: (
                    <DropItem
                        key="offers"
                        onClick={() => menuClick(Routes.offers)}
                    >
                        Offers
                    </DropItem>
                ),
                key: 'offers',
            },
            {
                label: (
                    <DropItem
                        key="login"
                        onClick={() => menuClick(null, AuthPopup.login)}
                    >
                        Login
                    </DropItem>
                ),
                key: 'pub-login',
            },
        ],
        [],
    )

    const items = useMemo(() => {
        if (!isAuthenticated) {
            return publicMenu
        }
        return menu
    }, [isAuthenticated])

    return (
        <>
            <HeaderLayout className="container">
                <HeaderMain className="d-none d-lg-flex align-items-center justify-content-between desktop container">
                    <div className="d-flex flex-row align-items-center">
                        <ImageLogo
                            src={GTikitLogo}
                            className="responsive ml-3 py-1 px-2 pointer"
                            alt="logo"
                            onClick={() => {
                                navigateToTop()
                                menuClick(Routes.home)
                            }}
                        />
                        <MenuTag>
                            {false && (
                                <Form className="col-12 mb-0 d-flex align-items-center">
                                    <Form.Item className="col-12 mb-0">
                                        <FormSelectionField
                                            control={control}
                                            name="CountryId"
                                            placeholder="Select country"
                                            errors={errors?.CountryId}
                                            defaultValue=""
                                            options={countryList}
                                        />
                                    </Form.Item>
                                </Form>
                            )}
                            {countryList.length > 0 && (
                                <div className="mt-2">
                                    <CountryDropDown list={countryList} />
                                </div>
                            )}
                        </MenuTag>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <MenuTag
                            className="link"
                            onClick={() => menuClick(Routes.sponsorTicket)}
                        >
                            <div className="d-flex align-items-center">
                                Sponsor ticket
                            </div>
                        </MenuTag>
                        <MenuTag
                            className="link"
                            onClick={() => menuClick(Routes.events)}
                        >
                            Events
                        </MenuTag>
                        <MenuTag
                            className="link"
                            onClick={() => menuClick(Routes.offers)}
                        >
                            Offers
                        </MenuTag>
                        {/* <MenuTag
                            className="link"
                            onClick={() => menuClick(Routes.contactUs)}
                        >
                            Contact Us
                        </MenuTag> */}
                        {!isAuthenticated && (
                            <>
                                <MenuTag
                                    className="link"
                                    onClick={() => {
                                        menuClick(null, AuthPopup.login)
                                    }}
                                >
                                    Login
                                </MenuTag>
                                <MenuTag
                                    className="link"
                                    onClick={() => {
                                        menuClick(null, AuthPopup.register)
                                    }}
                                >
                                    <RoundedCornerButton
                                        color={theme.colors.danger}
                                    >
                                        Register
                                    </RoundedCornerButton>
                                </MenuTag>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                {/* <MenuTag
                                    className="link"
                                    onClick={() => menuClick(Routes.addEvent)}
                                >
                                    Add Event
                                </MenuTag> */}
                                <MenuTag
                                    className="link"
                                    onClick={() => menuClick(Routes.profile)}
                                >
                                    Profile
                                </MenuTag>
                                <MenuTag
                                    className="link"
                                    onClick={() => menuClick(Routes.cart)}
                                >
                                    <div className="d-flex align-items-center">
                                        {' '}
                                        Cart{' '}
                                        <ShoppingOutlined
                                            className="mx-1"
                                            style={{ fontSize: '18px' }}
                                        />
                                    </div>
                                </MenuTag>
                                <MenuTag
                                    className="link"
                                    onClick={() => logoutProfile(Routes.cart)}
                                >
                                    <div className="d-flex align-items-center">
                                        {' '}
                                        Log out
                                    </div>
                                </MenuTag>
                                <PersonsName>
                                    {profile?.ProfilePicture ? (
                                        <img
                                            src={profile?.ProfilePicture}
                                            className="pointer"
                                            alt={
                                                profile?.FullName ||
                                                profile?.Email
                                            }
                                        />
                                    ) : (
                                        <p className="my-0 text">
                                            {CommonUtility.getInitials(
                                                profile?.FullName ||
                                                    profile?.Email,
                                            )}
                                        </p>
                                    )}
                                </PersonsName>
                            </>
                        )}
                    </div>
                </HeaderMain>
                <div className="align-items-center justify-content-between d-flex d-lg-none sidebar">
                    <div className="d-flex align-items-center">
                        <ImageSider
                            src={GTikitLogo}
                            alt="logo"
                            className="my-2 pointer"
                            onClick={() => menuClick(Routes.home)}
                        />
                        {countryList.length > 0 && (
                            <div className="">
                                <CountryDropDown list={countryList} />
                            </div>
                        )}
                    </div>
                    <Dropdown
                        placement="bottomRight"
                        menu={{ items }}
                        trigger={['click']}
                        overlayClassName="dropMenu"
                        destroyPopupOnHide
                    >
                        <List
                            size={28}
                            weight="fill"
                            color={theme.colors.white}
                            className="pointer"
                        />
                    </Dropdown>
                </div>
            </HeaderLayout>
            <Loader loading={loading} />
        </>
    )
}
