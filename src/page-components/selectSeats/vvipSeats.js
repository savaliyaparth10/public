import React from 'react'
import styled from 'styled-components'

const VvipMain = styled.div`
    margin-top: 20px !important;
    .vvip-head {
        display: flex;
        justify-content: space-between;
        margin-left: 150px;
        margin-right: 150px;
    }
    .seat-name {
        font-weight: 600;
        font-size: 18px;
    }
    .reaming-seats-main {
        display: flex;
        align-items: center;
    }
    .reaming-seat {
        background: #242631;
        border-radius: 4px;
        padding: 5px;
        margin-right: 20px;
        font-size: 14px;
    }
    .reaming-seat span {
        color: #ff384e;
    }
    .view-seats {
        color: #ff384e;
        font-weight: 600;
        font-size: 16px;
    }
`
export const VvipSeats = () => {
  return (
      <VvipMain>
          <div className="vvip-head">
              <div className="seat-name">VVIP seats $1000</div>
              <div className="reaming-seats-main">
                  <div className="reaming-seat">
                      Remaining seats: <span>03</span>
                  </div>
                  <div className="view-seats">View seat</div>
              </div>
          </div>
      </VvipMain>
  )
}
