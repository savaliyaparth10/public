import {
    AddressElement,
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js/pure';
import { Skeleton } from 'antd'
import { Loader, PushNotification } from 'components'
import { FormCheckBox } from 'elements'
import { OfferBuyNow, GetOfferPublicKey, GetOfferCartTermsAndCondition } from 'hooks'
import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { NotificationStatus, OfferCartService } from 'utility'

loadStripe.setLoadParameters({ advancedFraudSignals: false });
const TicketSummaryMain = styled.div`
    padding-top: 50px;
    .heading-main {
        display: flex;
        margin: 0px 150px;
        margin-bottom: 20px;
        justify-content: space-between;
        align-items: center;
    }
    .heading {
        font-weight: 700;
        font-size: 22px;
    }
    .ticket-details-main {
        background: #242631;
        border: 1.5px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        width: 77%;
        margin: 0 auto;
        padding: 20px;
        .skeleton {
            margin: 0.5rem 0rem;
            padding: 0;
            align-items: center;
            display: flex;
            justify-content: center;
        }
        .skeleton-div {
            width: calc(100% - 0.75rem);
            padding: 0.75rem;
            background-color: #30313d;
            border-radius: 5px;
            transition: background 0.15s ease, border 0.15s ease,
                box-shadow 0.15s ease, color 0.15s ease;
            border: 1px solid #424353;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5),
                0px 1px 6px rgba(0, 0, 0, 0.25);
        }
        .ant-skeleton,
        .ant-skeleton-input {
            width: 100% !important;
        }
    }
    .height-0 {
        height: 0 !important;
        overflow: hidden;
        opacity: 0;
    }
    .billing-address {
        font-weight: 700;
        font-size: 18px;
        margin-top: 20px;
        margin-bottom: 10px; 
    }
    .back-btn {
        width: 220px;
        margin-right: 10px;
        padding: 12px 12px;
        background: #4a4c5e;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
    }
    .next-btn {
        width: 220px;
        margin-left: 10px;
        padding: 12px 12px;
        background: #ff384e;
        border-radius: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
    }
    .terms-condition-checkbox {
        display: flex;
        align-items: center;
        width: 77%;
        margin: 0 auto;
        margin-top: 20px;
        .terms-condition-text {
            color: #ff384e !important;
            cursor: Pointer;
        }
    }
    .note {
        width: 77%;
        margin: 0 auto;
        font-size: 14px;
        text-align: justify;
        padding-bottom: 20px;
        ul {
            li {
                color: #a6a6a6;
            }
        }
    }
    @media (min-width: 200px) and (max-width: 480px) {
        padding-top: 20px;
        .heading-main {
            margin: 0px 10px;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
        .note,        
        .ticket-details-main {
            width: 100%;
        }
        .ticket-total-main {
            width: 100%;
        }
        .back-btn {
            width: 350px;
            margin-right: 0px;
            margin-bottom: 10px;
        }
        .next-btn {
            width: 350px;
            margin-left: 0px;
        }
        .user-info {
            margin: 0px 10px;
            margin-top: 10px;
            width: 100%;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
        padding-top: 20px;
        .heading-main {
            margin: 0px 10px;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
        .note,    
        .ticket-details-main {
            width: 100%;
        }
        .ticket-total-main {
            width: 100%;
        }
        .user-info{
            margin: 0px 10px;
            margin-top: 10px;
            width: 100%;
        }
    }
    @media (min-width: 769px) and (max-width: 1000px) {
        padding-top: 25px;
        .heading-main {
            margin: 0px 45px;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
        .note,    
        .ticket-details-main {
            width: 90%;
        }
        .ticket-total-main {
            width: 90%;
        }
        .user-info {
            margin: 0px 45px;
            margin-top: 10px;
        }
    }
    @media (min-width: 1001px) and (max-width: 1200px) {
        .heading-main {
            margin: 0px 10px;
            margin-bottom: 10px;
            .heading {
                font-size: 20px;
            }
        }
        .note,    
        .ticket-details-main {
            width: 100%;
        }
        .ticket-total-main {
            width: 100%;
        }
        .user-info {
            margin: 0px 10px;
            margin-top: 10px;
        }
    }
`
const DisplayType = {
    LINE: "LINE",
}
export const OfferPaymentScreen = () => {
    const { ticketBucketId } = useParams()
    const [showSkeleton, setShowSkeleton] = useState(true);
    const { data: publicKey } = GetOfferPublicKey(ticketBucketId)
    const { data: stripOptions, loading } = OfferBuyNow(ticketBucketId)
    const stripePromise = publicKey ? loadStripe(publicKey) : null
    const { data } = GetOfferCartTermsAndCondition(ticketBucketId)
    useEffect(() => {
        loadStripe.setLoadParameters({ advancedFraudSignals: true });
        return () => {
            loadStripe.setLoadParameters({ advancedFraudSignals: false });
        }
    }, []);
    useEffect(() => {
        let timeout = null
        if (stripOptions) {
            timeout = setTimeout(() => setShowSkeleton(false), 5000)
        }
        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [stripOptions])
    return (
        <TicketSummaryMain className="container">
            <div className="heading-main">
                <div className="heading">Ticket Summary</div>
            </div>
            {(showSkeleton || loading) && <PaymentSkeleton />}
            {!loading && stripOptions && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        ...stripOptions,
                        appearance: {
                            theme: 'night',
                            labels: 'floating',
                        },
                        wallets: {
                            applePay: 'auto',
                            googlePay: 'never',
                        },
                        paymentMethodOrder: ['card'],
                        paymentMethods: {
                            card: {
                                showIcon: true,
                                icon: 'visa',
                                disabled: true,
                            },
                        },
                        clientSecret: stripOptions.ClientSecretId,
                    }}
                    onChange={event => console.log(event)}
                >
                    <CheckoutForm
                        showSkeleton={showSkeleton}
                        eventData={stripOptions.MetaData}
                        setShowSkeleton={setShowSkeleton}
                    />
                </Elements>
            )}
            <div className="note">
                <span>Notes:-</span>
                <ul>
                    <li>Please avoid submitting twice or pressing the back button while processing your request. This may result in duplicate submissions or errors.</li>
                    <li>Please wait for the confirmation message after clicking the submit button and refrain from navigating away from this page until the process is complete. Thank you for your cooperation!</li>
                </ul>
            </div>
            <div className="note">
                    {data?.map(item => (<>
                        <span className="text-white">{item.Title}:-</span>
                        <ul>
                        {item.DisplayType === DisplayType.LINE ? <li>{item.Details.map(ele => (<li>{ele.Detail}</li>))}</li> : <p>{item.Details.map(ele => (<span>{ele.Detail}</span>))}</p>}
                        </ul>
                    </>))}
            </div>
        </TicketSummaryMain>
    )
}

const CheckoutForm = ({ showSkeleton, setShowSkeleton }) => {
    const stripe = useStripe();
    // const { setOptions } = useStripe();
    const elements = useElements()
    const { ticketBucketId } = useParams()
    const [loading, setLoading] = useState(false)
    const [tnc, setTnc] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async event => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault()
        if (!stripe || !elements || !tnc) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }
        setLoading(true);
        // try {
        //     await OfferCartService.confirmOrder(ticketBucketId);
        // } catch (error) {
        //     setLoading(false);
        //     PushNotification("Something went wrong, please try again later.", NotificationStatus.error)
        //     return;
        // }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/offers/summary/${ticketBucketId}`,
            },
            redirect: 'if_required',
        })
        console.log("Stripe result ==> ", result);
        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            // console.log(result.error.message);
            PushNotification(result.error.message, NotificationStatus.error)
        } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
            const orderRes = await OfferCartService.confirmOrder({ ProductBucketId: ticketBucketId });
            if (orderRes?.Result) {
                navigate(`/offers/summary/${ticketBucketId}`,{ state: { orderRes } })
            }
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            PushNotification("Something went wrong please try again", NotificationStatus.error);
        }
        setLoading(false);
    }
    const clickOnBack = () => {
        navigate(-1)
    }
    return (
        <div className={`${showSkeleton && ' height-0'}`}>
            <form onSubmit={handleSubmit}>
                <div className="ticket-details-main">
                    <PaymentElement
                        options={{
                            phone_number_collection: {
                                enabled: true,
                            },
                            wallets: {
                                applePay: 'auto',
                                googlePay: 'never',
                            },
                        }}
                        onLoaderStart={() => setShowSkeleton(true)}
                        onLoadError={() => setShowSkeleton(false)}
                        onReady={() => setShowSkeleton(false)}
                    />
                    <p className="billing-address">Billing Address</p>
                    <AddressElement
                        options={{
                            mode: 'billing',
                            blockPoBox: true,
                            fields: {
                                phone: 'always',
                            },
                            validation: {
                                phone: {
                                    required: 'always',
                                },
                            },
                        }} />
                </div>
                <FormCheckBox className="terms-condition-checkbox" value={tnc} onChange={(e) => setTnc(e.target.checked)}>
                    I have read and agree to the <span className="terms-condition-text" onClick={() => window.open('/term-condition', '_blank')}>Terms and Condition </span> of GTikit.
                </FormCheckBox>
                <div className="row justify-content-center my-4 pb-4 pt-2">
                    <div className="back-btn" onClick={clickOnBack}>
                        <span>Back</span>
                    </div>
                    <div
                        className="next-btn"
                        disabled={!stripe || !tnc}
                        onClick={handleSubmit}
                    >
                        <span>Submit</span>
                    </div>
                </div>
            </form>
            <Loader loading={loading} />
        </div>
    )
}

const PaymentSkeleton = () => {
    return (
        <>
            <div className="ticket-details-main">
                <div className="row mx-0 px-0">
                    <div className="col-6 skeleton">
                        <div className="skeleton-div">
                            <Skeleton.Input active />
                        </div>
                    </div>
                    <div className="col-6 skeleton">
                        <div className="skeleton-div">
                            <Skeleton.Input active />
                        </div>
                    </div>
                </div>
                <div className="row mx-0 px-0">
                    <div className="col-12 skeleton">
                        <div className="skeleton-div">
                            <Skeleton.Input active />
                        </div>
                    </div>
                </div>
                <div className="row mx-0 px-0">
                    <div className="col-6 skeleton">
                        <div className="skeleton-div">
                            <Skeleton.Input active />
                        </div>
                    </div>
                    <div className="col-6 skeleton">
                        <div className="skeleton-div">
                            <Skeleton.Input active />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center my-4 pb-4 pt-2">
                <div className="back-btn">
                    <Skeleton.Input active />
                </div>
                <div className="next-btn">
                    <Skeleton.Input active />
                </div>
            </div>
        </>
    )
}
