import { ArrowSquareRight, HeartStraight } from "phosphor-react"
import styled from "styled-components"

const EventInfoLayout = styled.div`
.event-info {
    font-size:16px;
    letter-spacing: 0.5px;
}
.heading {
    color: ${({ theme }) => theme.colors.lightWhite} !important;
}
.info {
    color: ${({ theme }) => theme.colors.grayContent} !important;
}
.wish-icon {
    margin-bottom: -3px;
}
.notes-icon {
    margin-bottom:-4px;
}
`
export const EventInfo = () => {
    return (
        <EventInfoLayout>
         <div className="row mt-5">
                <h1 className="heading">Event Information</h1>
                    <div className="col-12 col-md-12 col-sm-12 event-info">
                    <div className="mt-2 info">Excited to be the Host of <HeartStraight size={18} color="#B9BBBF" weight="fill" className="wish-icon" /> 20 Cities 20 Meetup <HeartStraight size={18} color="#B9BBBF" weight="fill" className="wish-icon" /> Program from Travel Buddy!</div>
                    <div className="mt-4 info">❇️ Dont Be Alone In New Years! ❇️</div>
                    <div className="mt-4 info">Buddies from Ahmedabad, be the part of the revolution, this is an opportunity where you can actively be the part of Travel Buddy Community 👥 I am arranging a meet-up. Please DM or email or WhatsApp to join.
                    </div>
                    <div className="mt-4 info">Date & Time: 31 December</div>
                    <div className="info">Venue: Ahmedabad</div>
                    <div className="info">Cost: 199</div>
                    <div className="mt-4 info">Notes:</div>
                    <div className="mt-2 info"><ArrowSquareRight size={20} color="#B9BBBF" weight="fill" className="notes-icon" /> Kindly note that the cafe food & beverage cost will be on actuals.</div>
                    <div className="mt-2 info"><ArrowSquareRight size={20} color="#B9BBBF" weight="fill" className="notes-icon" /> It’s an official meet-up from Travel Buddy arranges by our trusted Local Influencers</div>
                    <div className="mt-2 info"><ArrowSquareRight size={20} color="#B9BBBF" weight="fill" className="notes-icon" /> For communication Insta , Mail or WhatsApp.</div>
                    <div className="info">Only Registered Users will be Added to the WhatsApp Group for Further Updates on the meet-up.</div>
                    </div>
            </div>
        </EventInfoLayout>
    )
}