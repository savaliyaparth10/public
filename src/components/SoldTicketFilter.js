import React from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

const FilterSection = styled.div`
 padding: 1rem 0rem;
 overflow: visible !important; 
    .heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
            color: #a6a6a6;
            font-size: 16px;
        }
        .clear-filter {
            color: #ff384e;
            font-size: 16px;
            cursor: pointer;
        }
    }
    .seats-categories {
        padding: 0.5rem 2rem;
        .seat-name-checkbox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            .seat-name {
                font-size: 18px;
                font-weight: 700;
            }
            .form-check-input {
                width: 25px;
                height: 25px;
                border: 1px solid #ffffff;
                margin: 0;
            }
            .form-check-input:focus {
                outline: none;
                box-shadow: none;
            }
            .form-check-input:focus-visible {
                outline: none;
            }
        }
    }
    .apply-btn {
        display: flex;
        justify-content: center;
        Button {
            background: #ff384e;
            border: none;
            border-radius: 12px;
            width: 100%;
            padding: 1rem 0rem;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 16px;
        }
        Button:active {
            background: #ff384e;
        }
        Button:focus {
            outline: none;
            box-shadow: none;
        }
        Button:focus-visible {
            outline: none;
            box-shadow: none;
        }
    }
`
const SoldTicketFilter = ({ types, eventTicketIds, setEventTicketIds, clearFilter, applyFilter }) => {
    return (
        <FilterSection>
            <div className="heading">
                <div className="title"> Seat filter</div>
                <div className="clear-filter" onClick={clearFilter}>Clear all</div>
            </div>
            <div className="seats-categories">
                {types.map((type) =>
                    <div key={`filter-type-${type.EventTicketId}`} className="seat-name-checkbox">
                        <div className="seat-name">{type.TicketType}</div>
                        <Form.Check
                            checked={eventTicketIds.includes(type.EventTicketId)}
                            onClick={({ target }) => {
                                const ids = eventTicketIds.filter(v => v !== type.EventTicketId);
                                if (target.checked) {
                                    ids.push(type.EventTicketId);
                                }
                                setEventTicketIds(ids);
                            }} />
                    </div>)}
            </div>
            <div className="apply-btn">
                <Button onClick={applyFilter}>Apply Filter</Button>
            </div>
        </FilterSection>
    )
}

export default SoldTicketFilter
