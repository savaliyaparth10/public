import { OrderList } from 'components'
import { MyTickets } from 'hooks'
import React, { useState } from 'react'
import { TicketModal } from 'components/TicketModal'
import styled from 'styled-components'
import { Modal } from 'antd'

const OrderHead = styled.div`
    .order-para {
        font-size: 16px;
        font-weight: 500;
    }
    .link {
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.black};
    }
`

export const OrdersTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [order, setOrder] = useState(null)
    const showModal = item => {
        setOrder(item)
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const { data, loading } = MyTickets(1)
    return (
        <>
            <OrderHead className="container-fluid">
                <OrderList
                    orders={data}
                    hasMoreData={false}
                    loading={loading}
                    showModal={showModal}
                />
                {!data?.length && !loading && <div>You have not any order</div>}
            </OrderHead>
            <Modal
                title="Ticket Summary"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={null}
            >
                <TicketModal order={order} />
            </Modal>
        </>
    )
}
