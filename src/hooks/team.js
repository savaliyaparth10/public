import { useState, useEffect } from 'react'
import { TeamService } from 'utility'

export const GetTeamList = () => {
    const [list, setList] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(async () => {
        let promises = list.map(async (item) => {
            const result = await TeamService.getEventsForMember(item.MemberId)
            return { ...item, Events: result.Result,
            }
        });
        try {
            promises = await Promise.all(promises)
        } catch {
            promises = []
        }
        setData(promises)
    }, [list])

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TeamService.getTeam();
            setList(result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        fetchData()
    }

    return {
        data, error, loading, refetch,setList,
    }
}

export const GetEventsForMember = (id) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TeamService.getEventsForMember(id);
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