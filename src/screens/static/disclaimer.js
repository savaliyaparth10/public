import React from 'react'
import "./disclaimer.scss"

export const DisclaimerScreen = () => {
    return (
        <section className="container disclaimer-main">
            <h1 className="d-heading">
                Disclaimers
            </h1>
            <p>
                Welcome to the Disclaimers of GTikit, the premier destination
                for buying tickets to your favorite events. Please read these
                Disclaimers carefully before using our website and mobile app.
            </p>
            <div className="sub-section">
                <h2 className="heading m-0">Accuracy of Information</h2>
                <article>
                    <p className="m-0">
                        GTikit strives to provide accurate and up-to-date
                        information about events listed on our website and
                        mobile app. However, we cannot guarantee the accuracy,
                        completeness, or reliability of any information on
                        GTikit. You are solely responsible for verifying the
                        accuracy of any information before purchasing a ticket.
                    </p>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading m-0">Changes to Events</h2>
                <article>
                    <p className="m-0">
                        GTikit is not responsible for any changes to events,
                        including but not limited to, rescheduling,
                        postponement, or cancellation. We will make reasonable
                        efforts to inform our users of any changes, but we do
                        not guarantee the accuracy of this information. It is
                        your responsibility to check the event's status before
                        attending.
                    </p>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading m-0">
                    Third-Party Websites and Services
                </h2>
                <article>
                    <p className="m-0">
                        GTikit may provide links to third-party websites and
                        services that are not owned or controlled by us. We do
                        not endorse or assume any responsibility for any
                        third-party websites or services or their content,
                        products, or services. You access any third-party
                        websites or services at your own risk.
                    </p>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading m-0">User Conduct</h2>
                <article>
                    <p className="m-0">
                        GTikit is not responsible for any user conduct on our
                        website and mobile app, including but not limited to,
                        user-generated content, comments, or reviews. We reserve
                        the right to remove any user-generated content that we
                        deem inappropriate or offensive.
                    </p>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading m-0">Disclaimer of Warranties</h2>
                <article>
                    <p className="m-0">
                        GTikit makes no warranties or representations about the
                        accuracy or completeness of the content on our website
                        and mobile app. We do not guarantee that our website and
                        mobile app will be error-free or uninterrupted. We
                        provide our services "as is" without any warranties or
                        representations.
                    </p>
                </article>
            </div>
            <div className="sub-section">
                <h2 className="heading m-0">Limitation of Liability</h2>
                <article>
                    <p className="m-0">
                        GTikit shall not be liable for any damages, including
                        but not limited to direct, indirect, incidental,
                        punitive, and consequential damages, arising out of or
                        in connection with your use of our website and mobile
                        app. You use GTikit at your own risk.
                    </p>
                </article>
            </div>
            <p>
                GTikit reserves the right to change or modify these Disclaimers
                at any time without prior notice. Any changes to these
                Disclaimers will be posted on our website and mobile app.
            </p>
            <p>
                Thank you for using GTikit for your ticketing needs. If you have
                any questions or concerns, please don't hesitate to contact our
                customer support team.
            </p>
            <br />
            <br />
        </section>
    )
}
