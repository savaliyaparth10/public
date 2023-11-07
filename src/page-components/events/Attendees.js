import React from 'react'
import { AttendingPeople, AttendingPeopleSection } from './style'
import { Avatar } from 'antd'

function Attendees() {
  return (
      <AttendingPeopleSection>
          <AttendingPeople>People are attending</AttendingPeople>
          <Avatar.Group
              maxCount={4}
              maxStyle={{
                  color: '#fff',
                  backgroundColor: '#555',
              }}
          >
              <Avatar src="https://joesch.moe/api/v1/random?key=2" />
              <Avatar src="https://joesch.moe/api/v1/random?key=8" />
              <Avatar src="https://joesch.moe/api/v1/random?key=8" />
              <Avatar src="https://joesch.moe/api/v1/random?key=8" />
              <Avatar src="https://joesch.moe/api/v1/random?key=8" />
              <Avatar src="https://joesch.moe/api/v1/random?key=8" />
              <Avatar src="https://joesch.moe/api/v1/random?key=8" />
          </Avatar.Group>
      </AttendingPeopleSection>
  )
}

export default Attendees