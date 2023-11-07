import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { OfferCartService, TicketService } from 'utility'
import { BrowserUtility } from 'utility/browser-utility'

export const GetPublicKey = TicketBucketId => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.getPublicKey({ TicketBucketId })
            setData(result?.Result)
            BrowserUtility.saveObj('public-key', result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const details = BrowserUtility.getObj('public-key')
        if (details) setData(details)
    }, [])

    return {
        data,
        error,
        loading,
        fetchData,
    }
}
export const GetOfferPublicKey = TicketBucketId => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await OfferCartService.getPublicKey(TicketBucketId)
            setData(result?.Result)
            BrowserUtility.saveObj('offer-public-key', result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
        const details = BrowserUtility.getObj('offer-public-key')
        if (details) setData(details)
    }, [])

    return {
        data,
        error,
        loading,
        fetchData,
    }
}
export const MyTickets = TicketTense => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.myTickets({
                TicketTense,
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
    }, [TicketTense])

    return {
        data,
        error,
        loading,
    }
}

export const GetSponsersTicketByEvent = id => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.getSponsersTicket(id)
            setData(result?.Result || [])
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
    }, [id])

    return {
        data,
        error,
        loading,
        setData,
    }
}

export const GetSoldTicketsByType = ProviderEventId => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState({
        PageNumber: 1,
        PageSize: 10,
    })

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.getSoldTicketsByType({
                ProviderEventId,
                ...filter,
            })
            if (filter.PageNumber === 1) {
                setData(result.Result.Items)
            } else {
                setData([...data, ...result.Result.Items])
            }
            setHasMore(result.Result.Event.length === filter.PageSize)
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
    }, [filter])

    useEffect(() => {
        setFilter({
            PageNumber: 1,
            PageSize: 10,
        })
    }, [])

    const filterChanged = changeValues => {
        setFilter({
            ...changeValues,
            PageNumber: 1,
            PageSize: 10,
        })
    }

    const fetchMoreData = () => {
        setFilter({
            ...filter,
            PageNumber: filter.PageNumber + 1,
            PageSize: 10,
        })
    }

    return {
        data,
        error,
        loading,
        fetchMoreData,
        filterChanged,
        hasMore,
    }
}

export const GetSoldTicketsByBuyer = ProviderEventId => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState({
        PageNumber: 1,
        PageSize: 10,
    })

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.getSoldTicketsByBuyer({
                ProviderEventId,
                ...filter,
            })
            if (filter.PageNumber === 1) {
                setData(result.Result.Items)
            } else {
                setData([...data, ...result.Result.Items])
            }
            setHasMore(result.Result.MetaData.CurrentPage !== result.Result.MetaData.LastPage)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const checkInOut = async (QRCodeId, isCheckIn = true) => {
        try {
            setLoading(true)
            await TicketService.TicketCheckInOut({
                QRCodeId,
                ChekInMode: 2,
                CheckInOut: isCheckIn ? 1 : 0,
            })
            const newData = data.map(d => d.QRCodeId === QRCodeId ? { ...d, AllCheckedIn: isCheckIn } : d);
            setData(newData);
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
    }, [filter])

    useEffect(() => {
        setFilter({
            PageNumber: 1,
            PageSize: 10,
        })
    }, [])

    const filterChanged = changeValues => {
        setFilter({
            ...changeValues,
            PageNumber: 1,
            PageSize: 10,
        })
    }

    const fetchMoreData = () => {
        setFilter({
            ...filter,
            PageNumber: filter.PageNumber + 1,
        })
    }

    return {
        data,
        error,
        loading,
        fetchMoreData,
        filterChanged,
        checkInOut,
        hasMore,
    }
}

export const SelectSeat = params => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.selectTicket(params)
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
    }, [params])

    return {
        data,
        error,
        loading,
    }
}
export const BookNow = TicketBucketId => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.bookNow({ TicketBucketId })
            setData(result?.Result)
            BrowserUtility.saveObj(`book-now-${TicketBucketId}`, result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (TicketBucketId) {
            const details = BrowserUtility.getObj(`book-now-${TicketBucketId}`)
            if (!details) fetchData();
            else setData(details);
        }
    }, [])

    return {
        data,
        error,
        loading,
        fetchData,
    }
}

export const OfferBuyNow = TicketBucketId => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await OfferCartService.buyNow(TicketBucketId)
            setData(result?.Result)
            BrowserUtility.saveObj(`book-now-${TicketBucketId}`, result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (TicketBucketId) {
            const details = BrowserUtility.getObj(`book-now-${TicketBucketId}`)
            if (!details) fetchData();
            else setData(details);
        }
    }, [])

    return {
        data,
        error,
        loading,
        fetchData,
    }
}

export const OrderSummary = id => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.orderSummary({
                TicketBucketId: id,
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
    }, [id])

    return {
        data,
        error,
        loading,
        fetchData,
    }
}
export const OrderConfirmation = id => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.orderConfirmation({
                PaymentIntentId: id,
                CreateSeperateTicket: false,
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
    }, [id])

    return {
        data,
        error,
        loading,
    }
}

export const OrderFreeConfirmation = ticketBucketId => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TicketService.orderFreeConfirmation({
                TicketBucketId: ticketBucketId,
                CreateSeperateTicket: false,
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
    }, [ticketBucketId])

    return {
        data,
        error,
        loading,
    }
}

export const OfferOrderSummary = id => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await OfferCartService.getconfirmOrder({ ProductBucketId: id,CheckPaymentStatus: false })
            setData(result?.Result)
        } catch (error) {
            navigate("/")
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!loading) {
            fetchData()
        }
    }, [id])

    return {
        data,
        error,
        loading,
        fetchData,
    }
}