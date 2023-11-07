import { useState, useEffect } from 'react'
import { OfferCartService } from 'utility'

export const GetCart = id => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await OfferCartService.getCart()
            setData(result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
            // const details = BrowserUtility.getObj('event-details');
            // // console.log(details, id);
            // if (!details || details.ProviderEventId.toString() !== id.toString()) fetchData();
            // else setData(details);
            fetchData();
    }, [id])

    const refetch = () => {
        fetchData()
    }

    return {
        data,
        error,
        loading,
        fetchData,
        setData,
        refetch,
    }
}