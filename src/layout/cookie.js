import React, { useEffect } from 'react'
import styled from 'styled-components';

const CookieMain = styled.div`
    display: none;
    position: fixed;
    background-color: #242631;
    color: ${({ theme }) => theme.colors.white};
    bottom: 0;
    width: 100%;
    .row {
        max-width: 1300px;
        margin: 0 auto!important;
        padding: 20px;
    }
    .privacy-policy {
        color: ${({ theme }) => theme.text.red};
    }
    .content-wrap {
        text-align: left;
        padding: 20px;
    }
`
const AcceptBtn = styled.div`
    padding: 10px;
    width: 100px;
    background: #ff384e;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
`

export const Cookie = () => {
    // Create cookie
    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // Delete cookie
    const deleteCookie = (cname) => {
        const d = new Date();
        d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=;" + expires + ";path=/";
    }

    // Read cookie
    const getCookie = (cname) => {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i += 1) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Set cookie consent
    const acceptCookieConsent = () => {
        deleteCookie('GTikit_cookie_consent');
        setCookie('GTikit_cookie_consent', 1, 30);
        document.getElementById("cookieNotice").style.display = "none";
    }

    useEffect(() => {
        const cookie_consent = getCookie("GTikit_cookie_consent");
        if (cookie_consent !== "") {
            document.getElementById("cookieNotice").style.display = "none";
        } else {
            document.getElementById("cookieNotice").style.display = "block";
        }
    }, [])
    return (
        <CookieMain id="cookieNotice">
            <div className="row px-0 align-items-center">
                <div className="content-wrap col-sm-12 col-md-9 col-lg-10">
                    We use cookies on this website to enhance your browsing experience and to provide you with personalized content. By clicking "Accept", you consent to our use of cookies. For more information about our use of cookies and how we protect your privacy, please see our <a className="privacy-policy" href="/privacy-policy">Privacy Policy</a>
                </div>
                <div className="col-md-3 col-sm-12 col-lg-2"><AcceptBtn onClick={acceptCookieConsent}> Accept </AcceptBtn></div>
            </div>
        </CookieMain>
    )
}
