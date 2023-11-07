import React from 'react'
import styled from 'styled-components'

export const ProfileContainer = styled.div`
border-radius: 10px;
box-shadow: 0px 0px 11px rgb(47 44 44);
padding: 19px;
background-color: ${({ theme }) => theme.colors.primary};
h6 {
  line-height:2rem;
  font-size:16px;
  letter-spacing: 0.5px;
}
.title {
  line-height:2rem;
  font-size:20px;
  letter-spacing: 0.5px;
  font-weight: 700;
}
`
export const Approval = () => {
  return (
    <div className="mt-5 pt-5 container col-7">
      <ProfileContainer className="container m-auto text-center">
        <h5 className="title">Thank you for submitting your event to GTIkit!
        </h5>
        <h6>
          Your event has been received, and our team will review it within the next 24-38 hours. Once approved, it will be visible to our users. We appreciate your contribution to our platform and look forward to showcasing your event.
        </h6></ProfileContainer>
    </div>
  )
}
