import { NewOrderList } from 'components'
import { MyOrders, OrderDetails } from 'hooks'
import React, { useState,useMemo } from 'react'
import { TicketModal } from 'components/TicketModal'
import styled from 'styled-components'
import { Modal } from 'antd'
import { OfferOderModal } from 'components/OfferOrderModal'

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
const OrderType = {
    offer: 'OFFER',
    event: 'EVENT',
}
export const OfferOrdersTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [order, setOrder] = useState(null)
    const { data: modalDetails } = OrderDetails(
        order?.ProductBucketId,
        order?.PurchaseType,
    )

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
    const { data, loading } = MyOrders(1)
    const offersData = useMemo(() => {
        return data?.filter(item => item.PurchaseType === OrderType.offer)
    }, [data])
    return (
        <>
            <OrderHead className="container-fluid">
                <NewOrderList
                    orders={offersData}
                    hasMoreData={false}
                    loading={loading}
                    showModal={showModal}
                />
                {!offersData?.length && !loading && (
                    <div>You have not any order</div>
                )}
            </OrderHead>
            <Modal
                title={`${
                    order?.PurchaseType === OrderType.offer
                        ? 'Offer'
                        : 'Event Toket'
                } Summary`}
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={null}
            >
                {order?.PurchaseType === OrderType.offer ? (
                    <OfferOderModal data={modalDetails} />
                ) : (
                    <TicketModal order={order} />
                )}
            </Modal>
        </>
    )
}
