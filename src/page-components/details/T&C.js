import styled from "styled-components"

const TermsLayout = styled.div`
.info {
    color: ${({ theme }) => theme.colors.grayContent} !important;
}
.heading {
    color: ${({ theme }) => theme.colors.lightWhite} !important;
}
`
export const TermsCondition = () => {
    return (
        <TermsLayout>
        <div className="row mt-5">
                <h1 className="heading">Terms and Condition</h1>
                <div className="col">
                    <div className="info">1. All Sales are FINAL.</div>
                    <div className="mt-3 info">2. All tickets are NON-REFUNDABLE and NON-TRANSFERABLE.</div>
                    <div className="mt-3 info">3. The person in whose name the ticket is issued must also be present at the door with valid photo ID.</div>
                    <div className="mt-3 info">4. A printout of the order receipt issued by gtikit.com should be produced at the venue.</div>
                    <div className="mt-3 info">5. If the event attendee is different from the credit card holder, a copy of the credit card used for ticket purchase must be produced along with the order.</div>
                    <div className="mt-3 info">6. Any failure in providing the aforementioned documents may result in denial of admission to the event with no refund.</div>
                    <div className="mt-3 info">7. In case of event being cancelled/postponed gtikit will refund only the face value of the ticket and NOT the service fee.</div>
                </div>
            </div>

        </TermsLayout>
    )
}