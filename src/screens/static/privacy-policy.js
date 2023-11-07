import React from 'react'
import './privacy-policy.scss'

export const PrivacyPolicyScreen = () => {
    return (
        <section className="container privacy-policy-main">
            <h1 className="pp-heading">Privacy Policy for GTikit</h1>
            <div className="sub-section">
                <article>
                    <p>
                        Welcome to GTikit, a website and mobile application for
                        selling event tickets. Your privacy is important to us,
                        and we are committed to protecting your personal
                        information. This Privacy Policy explains how we
                        collect, use, and disclose your information when you use
                        GTikit services.
                    </p>
                    <p>
                        By accessing or using GTikit, you accept the terms and
                        conditions of this Privacy Policy. If you do not agree
                        with the terms of this Privacy Policy, please do not use
                        GTikit.
                    </p>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading">Information We Collect</h2>
                <article>
                    <p>
                        {' '}
                        We may collect and process the following personal
                        information when you use GTikit:
                    </p>
                    <li>
                        Contact Information: &nbsp; such as your name, email
                        address, phone number, and physical address.
                    </li>
                    <li>
                        Payment Information: &nbsp; such as your credit or debit
                        card details, billing address, and other payment-related
                        information.
                    </li>
                    <li>
                        Event Information: &nbsp; such as the event name, date,
                        location, and any other details related to the event.
                    </li>
                    <li>
                        User Content: &nbsp; such as reviews, comments, or any
                        other content you post on GTikit.
                    </li>
                    <li>
                        Device Information: &nbsp; such as your IP address,
                        browser type, device type, and operating system.
                    </li>
                </article>
            </div>
            <div className="sub-section">
                <p>
                    {' '}
                    We may collect information directly from you or from
                    third-party sources, such as social media platforms or other
                    websites.
                </p>
                <h2 className="heading">Use of Information</h2>
                <article>
                    We may use your personal information for the following
                    purposes:
                    <li>
                        To provide GTikit services, process and fulfill your
                        orders, and communicate with you regarding your orders.
                    </li>
                    <li>
                        To personalize your experience and improve our services,
                        including the content, features, and layout of GTikit.
                    </li>
                    <li>
                        To send you marketing and promotional materials, offers,
                        or other communications that we believe may be of
                        interest to you.
                    </li>
                    <li>
                        To comply with our legal obligations and enforce our
                        policies.
                    </li>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading">Disclosure of Information</h2>
                <article>
                    <p>
                        We may disclose your personal information to the
                        following third parties:
                    </p>
                    <li>
                        Service Providers:&nbsp; We may share your information
                        with third-party service providers who help us operate,
                        maintain, or improve GTikit, such as payment processors,
                        marketing partners, or IT service providers.
                    </li>
                    <li>
                        Event Organizers:&nbsp; We may share your information
                        with event organizers for the events you purchase
                        tickets for, to enable them to manage the event and
                        communicate with you regarding the event.
                    </li>
                    <li>
                        Legal and Law Enforcement:&nbsp; We may disclose your
                        information to comply with applicable laws and
                        regulations, respond to legal requests, or protect our
                        rights or property.
                    </li>

                    <p>
                        We do not sell your personal information to third
                        parties.
                    </p>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading">Data Security</h2>
                <article>
                    <p>
                        We take appropriate technical and organizational
                        measures to protect your personal information from
                        unauthorized access, disclosure, alteration, or
                        destruction. However, no security measures are perfect,
                        and we cannot guarantee the security of your personal
                        information.
                    </p>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading">Your Choices and Rights</h2>
                <article>
                    <p>
                        You have the following choices and rights regarding your
                        personal information:
                    </p>
                    <li>
                        Access:&nbsp; You can request access to your personal
                        information we hold and ask us to update, correct, or
                        delete it.
                    </li>
                    <li>
                        Marketing:&nbsp; You can opt-out of receiving marketing
                        communications from us by following the instructions
                        provided in the communication.
                    </li>
                    <li>
                        Cookies:&nbsp; You can control or delete cookies through
                        your browser settings. However, some GTikit features may
                        not function properly if you disable cookies.
                    </li>
                    <li>
                        Do Not Track:&nbsp; GTikit does not respond to Do Not
                        Track signals.
                    </li>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading">Changes to this Policy</h2>
                <article>
                    <p>
                        We may update this Privacy Policy from time to time. We
                        will notify you of any changes by posting the new policy
                        on GTikit. Your continued use of GTikit after the
                        changes indicate your acceptance of the updated Privacy
                        Policy
                    </p>
                </article>
            </div>
            <br />
            <br />
        </section>
    )
}
