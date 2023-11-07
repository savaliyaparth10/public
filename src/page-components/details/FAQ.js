import { FormDivider } from "elements"
import styled from "styled-components"

const FaqLayout = styled.div`
.ant-divider-horizontal {
    border:0.5px solid #B9BBBF;
}
.info {
    color: ${({ theme }) => theme.colors.grayContent} !important;
}
.heading {
    color: ${({ theme }) => theme.colors.lightWhite} !important;
}
`
export const Faqs = () => {
    return (
        <FaqLayout>
        <div className="row mt-5">
                <h1 className="heading">FAQ'S</h1>
                <div className="info">How do I purchase tickets?</div>
                <div className="col">
                    <ul>
                        <li className="mt-2 info">There are several options when buying tickets:</li>
                        <li className="mt-2 info">You can purchase any ticket to any events listed on our website. To buy, select the # of tickets you want to purchase in the dropdown of a specific event and follow the instructions.</li>
                        <li className="mt-2 info">Email. Not sure where to go or how to buy tickets? Email us at hello@eventy.com</li>
                        <li className="mt-2 info">Phone. You can purchase tickets over the phone 1-512-788-5300</li>
                    </ul>
                </div>
            </div>
            <FormDivider />
            <div className="mt-1 mb-3 info">What is Eventy’s Refund Policy?</div>
            <FormDivider />
        </FaqLayout>
    )
}