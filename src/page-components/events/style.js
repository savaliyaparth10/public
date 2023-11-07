import styled from 'styled-components'

export const EventName = styled.h1`
    font-family: 'Manrope';
    font-weight: 800;
    font-size: 34px;
    @media (width < 600px) {
        font-size: 18px;
        padding: 0px 10px;
    }
`
export const AttendingPeopleSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (width < 600px) {
        padding: 0px 10px;
    }
`
export const AttendingPeople = styled.p`
    font-family: 'Manrope';
    font-weight: 500;
    font-size: 22px;
    color: #a6a6a6;
`
export const DescSection = styled.div`
    border-top: 2px solid #a6a6a637;
    border-bottom: 2px solid #a6a6a637;
    margin: 1rem 0 1.5rem;
    padding-top: 1.5rem !important;
    padding-bottom: 2rem !important;
    .flyer-image {
        border-radius: 14px;
    }
    @media (width < 768px) {
        padding: 0px 10px;
        padding-top: 0.5rem !important;
        padding-bottom: 0.5rem !important;
    }
`
export const Description = styled.div`
    font-weight: 600;
    font-size: 24px;
    color: #ffffff;
    margin-bottom: 10px;
    @media (width < 768px) {
        font-size: 16px;
    }
`
export const DateLocationSection = styled.div`
    ${'' /* border-bottom: 2px solid #a6a6a637; */}
    margin: 1rem;
    @media (width < 600px) {
        padding: 0px 10px;
    }
    .view-more-link {
        cursor: pointer;
        margin-left: 60px;
        a {
            color: ${({ theme }) => theme.colors.red} !important;
            font-size: 16px;
        }
    }
`
export const DateWapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    @media (width < 600px) {
        margin-bottom: 30px;
    }
`
export const WapperIcon = styled.div`
    height: 50px;
    width: 50px;
    background: #242631;
    display: grid;
    place-content: center;
    border-radius: 50%;
`
export const WapperMain = styled.div`
    font-weight: 700;
    font-size: 16px;
`
export const WapperSub = styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    color: #a6a6a6;
`
export const EventDetailsBtn = styled.div`
    @media (width < 600px) {
        padding: 0px 20px;
    }
`
