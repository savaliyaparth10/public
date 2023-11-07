import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const TicketTableDetailsMain = styled.div`
    margin-top: 3rem;
    .table-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .heading {
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
    }
    .table-btns {
        .add-btn {
            background-color: #ff384e;
            border: 0;
            border-radius: 6px;
            padding: 0.5rem 1rem;
            font-size: 14px;
            font-weight: 600;
        }
    }

    .table-main {
        margin-top: 1.5rem;
        background-color: #191a22 !important;
        border: 0;
        width: 100%;
        padding: 1rem;
        border-radius: 10px;
    }
    table {
        width: 100%;
        border-collapse: separate;
    }
    thead {
        background-color: #242631;
        border-radius: 10px;
    }
    th {
        padding: 0.5rem;
        border-right: 1px solid white;
        text-align: center;
    }
    th:nth-child(6) {
        border: none;
    }
    td {
        padding: 0.5rem;
        border-right: 1px solid white;
        text-align: center;
    }
    td:nth-child(6) {
        border: none;
    }
    .icon {
        font-size: 25px;
        display: flex;
        align: center;
        justify-content: center;
        cursor: pointer;
    }
    .table-btn {
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
    }
    .cancle-btn {
        border-radius: 6px;
        background: #191a22;
        border: 0;
        padding: 0.5rem 2rem;
        margin-right: 1rem;
    }
    .save-btn {
        border-radius: 6px;
        background: #ff384e;
        border: 0;
        padding: 0.5rem 2rem;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        .table-main {
            overflow: auto;
        }
        .table-btn {
            justify-content: center;
        }
        td {
            padding: 0rem 0.1rem;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
        .table-main {
            overflow: auto;
        }
        .table-btn {
            justify-content: center;
        }
        td {
            padding: 0.5rem;
        }
    }
    @media (min-width: 769px) and (max-width: 1000px) {
    }
    @media (min-width: 1001px) and (max-width: 1220px) {
    }
`
export const TicketTableDetails = () => {
    return (
        <TicketTableDetailsMain className="container">
            <div className="table-heading">
                <h2 className="heading">Ticket table</h2>
                <div className="table-btns">
                    <button type="button" className="add-btn">
                        Add ticket rate
                    </button>
                </div>
            </div>
            <div className="table-main">
                <table className="table-details">
                    <thead>
                        <tr>
                            <th>Ticket type</th>
                            <th>Qty</th>
                            <th>Discount</th>
                            <th>Price</th>
                            <th>Discount Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>VVIP</td>
                            <td>45</td>
                            <td>25%</td>
                            <td>$ 30.50</td>
                            <td>$ 25.50</td>
                            <td className="icon">
                                <span style={{ marginRight: '1rem' }}>
                                    <EditOutlined />
                                </span>
                                <span>
                                    <DeleteOutlined />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </TicketTableDetailsMain>
    )
}
