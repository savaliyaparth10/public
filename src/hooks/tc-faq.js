import { useState, useEffect } from 'react'
import { TCFAQService } from 'utility'

export const GetTCList = (id) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await TCFAQService.getTCList();
                setData(result?.Result)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
            fetchData()
    }, [id])

    return {
        data, error, loading,
    }
}

export const GetFAQList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TCFAQService.getFAQList();
            setData(result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
            fetchData()
    }, [])

    return {
        data, error, loading,
    }
}