import styled from 'styled-components'
import Logo from '../assets/Icons/FooterLogo.png'
import PlayStore from '../assets/Icons/gplay.png'
import AppStore from '../assets/Icons/AppStore.png'
import { ImageContainer } from 'components'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { createRef, useEffect } from 'react'

const FooterLayout = styled.div`
    position: static;
    background-color: #242631;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    font-size: 16px;
    .rights {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .copy-right {
        font-weight: 500;
        font-size: 16px;
        color: #73777f;
    }
    .link-group {
        display: flex;
        gap: 1rem;
        font-size: 16px;
    }
    .links {
        color: #fff;
        cursor: pointer;
    }
    @media (max-width: 992px) {
        .rights {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
        }
        .rights .copy-right {
            order: 2;
        }
    }
    @media (max-width: 538px) {
        .link-group {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.4rem;
        }
    }
`
const ImageLogoFooter = styled(ImageContainer)`
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
const FooterRowSecond = styled.div`
    display: flex;
    ${'' /* justify-content: space-between !important; */}
    column-gap: 100px;
    padding: 50px 0px 0px;
    flex-wrap: wrap;
    background-color: #242631;
    .row {
        width: 100%;
        display: flex;
        border-bottom: 2px solid #191a22;
        align-items: center;
        justify-content: center;
        padding-bottom: 1.6rem;
        flex-direction: column;
    }
    .boldy {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20px;
    }
    .text-start {
        text-align: start;
    }
    .logo-section {
        margin-bottom: 1rem !important;
        display: flex;
        justify-content: center;
    }
    .promotion-section {
        text-slign: center;
    }

    .app-btn-group {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 20px;
    }

    .btn {
        border: 0;
        width: 156px;
        img {
            width: 100%;
        }
    }
    @media (max-width: 538px) {
        .app-btn-group {
            flex-direction: row;
            align-items: center;
        }
        .hastage {
            font-size: 22px;
        }
        .logo-section {
            text-align: center;
            padding-bottom: 0rem;
        }
        .pointer {
            flex-direction: column;
        }
        .btn {
            width: 50%;
            margin-bottom: 1rem;
        }
        flex-direction: column;
    }
    @media (max-width: 790px) {
        .app-btn-group {
            flex-direction: row;
            align-items: center;
        }
        .hastage {
            font-size: 22px;
        }
        .logo-section {
            text-align: center;
            padding-bottom: 0rem;
        }
        .pointer {
            flex-direction: column;
        }
        .btn {
            width: 30% !important;
        }
        column-gap: 76px;
    }
    @media (max-width: 768px) {
        .app-btn-group {
            flex-direction: row;
            align-items: center;
        }
        .hastage {
            font-size: 22px;
        }
        .logo-section {
            text-align: center;
            padding-bottom: 0rem;
        }
        .pointer {
            flex-direction: column;
        }
        .text-start {
            text-align: center;
            margin-top: 20px;
        }
        .btn {
            width: 30%;
        }
    }
`
// const LinkPage = styled.div`
//     row-gap: 1px !important;
//     font-weight: 400;
//     font-size: 13px;
//     text-align: initial;
//     p {
//         color: #a6a6a6;
//         font-weight: 600;
//         font-size: 16px;
//     }
//     @media (max-width: 768px) {
//         text-align: center;
//         p {
//             text-align: center;
//         }
//     }
//     @media (max-width: 500px) {
//         text-align: center;
//     }
// `
export const FooterPage = ({ navigateToTop }) => {
    const navigate = useNavigate()
    const recaptchaRef = createRef()
    useEffect(() => {
        window.recaptchaRef = recaptchaRef
    }, [recaptchaRef])
    return (
        <FooterLayout className="">
            <FooterRowSecond className="container">
                <div className="col-lg-12 row text-md-start text-sm-start m-0">
                    <div
                        className="mt-lg-1 col-12 mb-4 mb-lg-0 mt-sm-4 logo-section"
                        onClick={navigateToTop}
                    >
                        <ImageLogoFooter src={Logo} className="img" />
                    </div>
                    <div className="mt-lg-1 col-12 mb-4 mb-lg-0 mt-sm-4 app-btn-group">
                        <div className="btn">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.MM.gtikit"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={PlayStore} alt="" />
                            </a>
                        </div>
                        <div className="btn">
                            <a
                                href="https://apps.apple.com/us/app/gtikit-mobile-app/id1663242240"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={AppStore} alt="" />
                            </a>
                        </div>
                    </div>
                    {/* <div className="col-sm-12 col-md-6 col-lg-3 ps-lg-4 col-sm-4 text-start">
                    <b className="boldy">Use Eventsy</b>
                    <LinkPage>
                        <p>How It Works</p>
                        <p>Pricing</p>
                        <p>Eventsy Boost</p>
                        <p>Eventsy Mobile App</p>
                        <p>FAQs</p>
                        <p>Sitemap</p>
                    </LinkPage>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 ps-lg-4 col-sm-4 text-start ">
                    <b className="boldy">Plan Events</b>
                    <LinkPage>
                        <p>Sell Tickets Online</p>
                        <p>Event Planning</p>
                        <p>Sell Concert Tickets Online</p>
                        <p>Event Payment System</p>
                        <p>Virtual Events Platform</p>
                        <p>Post your event online</p>
                    </LinkPage>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 ps-lg-4 col-sm-4 text-start ">
                    <b className="boldy">Connect With Us</b>
                    <LinkPage>
                        <p>Contact Support</p>
                        <p>Twitter</p>
                        <p>Facebook</p>
                        <p>LinkedIn</p>
                        <p>Instagram</p>
                    </LinkPage>
                </div> */}
                </div>
                {/* <hr className="col-12" /> */}
            </FooterRowSecond>
            <div className="rights container py-4 col-sm-12 col-md-6 col-lg-3 ps-lg-4 col-sm-4 ">
                <div className="copy-right">
                    © 2023-24 GTikit. All rights reserved.
                </div>
                <div className="link-group">
                    <div
                        className="links"
                        onClick={() => navigate('/contact-us')}
                    >
                        Contact Us
                    </div>
                    <div
                        className="links"
                        onClick={() => navigate('/about-us')}
                    >
                        About Us
                    </div>
                    <div
                        className="links"
                        onClick={() => navigate('/term-condition')}
                    >
                        Term condition
                    </div>
                    <div
                        className="links"
                        onClick={() => navigate('/return-policy')}
                    >
                        Return policy
                    </div>
                    <div
                        className="links"
                        onClick={() => navigate('/privacy-policy')}
                    >
                        Privacy policy
                    </div>
                    <div
                        className="links"
                        onClick={() => navigate('/disclaimer')}
                    >
                        Disclaimer
                    </div>
                </div>
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6LeMifYkAAAAABs5tkYmW4P8nuBxvfpW9__YHYlP"
            />
        </FooterLayout>
    )
}
