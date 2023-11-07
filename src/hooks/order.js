import { useState,useEffect } from "react"
import { OrderService } from "utility"

export const MyOrders = tense => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await OrderService.myOrders({
                tense,
            })
            setData(result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!loading) {
            fetchData()
        }
    }, [tense])

    return {
        data,
        error,
        loading,
    }
}

export const OrderDetails = (PurchaseId,PurchaseType) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await OrderService.detail({ PurchaseId,PurchaseType })
            setData(result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!loading && PurchaseId) {
            fetchData()
        }
    }, [PurchaseId])

    return {
        data,
        error,
        loading,
    }
}