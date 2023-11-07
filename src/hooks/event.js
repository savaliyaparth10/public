import { useState, useEffect } from 'react'
import { EventsService } from 'utility'
import { BrowserUtility } from 'utility/browser-utility'

export const GetEventDetails = id => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await EventsService.getEventDetails({
                    EventId: id,
                    PageNumber: 1,
                    PageSize: 9,
                })
                setData(result?.Result?.Event[0])
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            fetchData()
        }
    }, [id])

    return {
        data,
        error,
        loading,
    }
}

export const GetEventList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState({
        PageNumber: 1,
        PageSize: 9,
    })

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await EventsService.getEventList(filter)
            if (filter.PageSize === 0) {
                setData(result.Result.Event)
            } else {
                setData([...data, ...result.Result.Event])
            }
            setHasMore(result.Result.Event.length === filter.PageSize)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [filter])

    useEffect(() => {
        setFilter({
            PageNumber: 1,
            PageSize: 9,
        })
    }, [])

    const filterChanged = changeValues => {
        setFilter({
            ...changeValues,
            PageNumber: 1,
            PageSize: 9,
        })
    }
    const favoriteEvent = event => {
        const idx = data.findIndex(
            d => d.ProviderEventId === event.ProviderEventId,
        )
        if (idx !== -1) {
            const events = data
            events[idx].IsFavorite = !events[idx].IsFavorite
            setData([...events])
        }
    }
    const fetchMoreData = () => {
        setFilter({
            ...filter,
            PageNumber: filter.PageNumber + 1,
            PageSize: 5,
        })
    }

    return {
        data,
        error,
        loading,
        fetchMoreData,
        filterChanged,
        hasMore,
        favoriteEvent,
    }
}

export const GetPublicEventList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState({
        PageNumber: 1,
        PageSize: 9,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await EventsService.getPublicEventList(filter)
                if (filter.PageNumber === 1) {
                    setData(result.Result.Event)
                } else {
                    setData([...data, ...result.Result.Event])
                }
                setHasMore(result.Result.Event.length === filter.PageSize)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        if (!loading) {
            fetchData()
        }
    }, [filter])

    const filterChanged = changeValues => {
        setFilter({
            ...changeValues,
            PageSize: 9,
            PageNumber: 1,
        })
    }
    const favoriteEvent = event => {
        const idx = data.findIndex(
            d => d.ProviderEventId === event.ProviderEventId,
        )
        if (idx !== -1) {
            const events = data
            events[idx].IsFavorite = !events[idx].IsFavorite
            setData([...events])
        }
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
        hasMore,
        filterChanged,
        favoriteEvent,
    }
}

export const SearchEvent = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [init, setInit] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState({
        SearchText: '""',
        CategoryId: '0',
        LanguageId: '0',
        TicketType: 'B',
        // PageNumber: 1,
        // PageSize: 9,
    })

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await EventsService.searchEvent(filter)
            if (filter.PageNumber === 1) {
                setData(result.Result.Event)
            } else {
                setData([...data, ...result.Result.Event])
            }
            setHasMore(result.Result.Event.length === filter.PageSize)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (init) {
            if (!loading) {
                fetchData()
            }
        }
    }, [filter])
    const filterChanged = changeValues => {
        setData([])
        setInit(true);
        setFilter({
            ...filter,
            ...changeValues,
            // PageNumber: 1,
            // PageSize: 9,
        })
    }
    const favoriteEvent = event => {
        const idx = data.findIndex(
            d => d.ProviderEventId === event.ProviderEventId,
        )
        if (idx !== -1) {
            const events = data
            events[idx].IsFavorite = !events[idx].IsFavorite
            setData([...events])
        }
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
        hasMore,
        filterChanged,
        favoriteEvent,
    }
}

export const GetPublicEventDetails = id => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await EventsService.getPublicEventDetails({
                EventId: id,
                // PageNumber: 1,
                // PageSize: 9,
            })
            setData(result?.Result?.Event[0])
            BrowserUtility.saveObj('event-details', result?.Result?.Event[0])
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (id) {
            // const details = BrowserUtility.getObj('event-details');
            // // console.log(details, id);
            // if (!details || details.ProviderEventId.toString() !== id.toString()) fetchData();
            // else setData(details);
            fetchData();
        }
    }, [id])

    return {
        data,
        error,
        loading,
        fetchData,
    }
}

export const GetEventBannerList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await EventsService.getEventBannerList()
            setData(result.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    return {
        data,
        error,
        loading,
        fetchData,
    }
}

export const GetUpcomingEventList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [init, setInit] = useState(false)
    const [filter, setFilter] = useState({
        PageNumber: 1,
        PageSize: 9,
    })
    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await EventsService.getPublicEventList(filter)
            //  result = await EventsService.getUpcomingEventList(filter)
            if (filter.PageSize === 0 || filter.PageNumber === 1) {
                setData(result.Result.Event)
            } else {
                setData([...data, ...result.Result.Event])
            }
            setHasMore(result.Result.Event.length === filter.PageSize)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (init && !loading) {
            fetchData()
        }
    }, [filter])

    const filterChanged = (changeValues, isReset = false) => {
        setInit(true)
        if (isReset) setData([]);
        setFilter({
            ...changeValues,
            PageNumber: 1,
            PageSize: 9,
        })
    }
    const favoriteEvent = event => {
        const idx = data.findIndex(
            d => d.ProviderEventId === event.ProviderEventId,
        )
        if (idx !== -1) {
            const events = data
            events[idx].IsFavorite = !events[idx].IsFavorite
            setData([...events])
        }
    }
    const fetchMoreData = () => {
        setInit(true);
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
        hasMore,
        filterChanged,
        favoriteEvent,
    }
}

export const GetMyEvent = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState({
        PageNumber: 1,
        PageSize: 9,
        EventTense: 3,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await EventsService.myEvent(filter)
                if (filter.PageSize === 0 || filter.PageNumber === 1) {
                    setData(result.Result.Items)
                } else {
                    setData([...data, ...result.Result.Items])
                }
                setHasMore(result.Result.Items.length === filter.PageSize)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        if (!loading) {
            fetchData()
        }
    }, [filter])

    const filterChanged = changeValues => {
        setFilter({
            PageNumber: 1,
            PageSize: 9,
            ...changeValues,
        })
    }
    const favoriteEvent = event => {
        const idx = data.findIndex(
            d => d.ProviderEventId === event.ProviderEventId,
        )
        if (idx !== -1) {
            const events = data
            events[idx].IsFavorite = !events[idx].IsFavorite
            setData([...events])
        }
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
        hasMore,
        filterChanged,
        setData,
        favoriteEvent,
    }
}

export const GetFavoriteEvents = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState({
        PageNumber: 1,
        PageSize: 9,
    })
    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await EventsService.getFavoriteEvents(filter)
            if (filter.PageSize === 0 || filter.PageNumber === 1) {
                setData(result.Result.Event)
            } else {
                setData([...data, ...result.Result.Event])
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

    const filterChanged = changeValues => {
        setData([])
        setFilter({
            PageNumber: 1,
            PageSize: 9,
            ...changeValues,
        })
    }

    const favoriteEvent = event => {
        const events = data?.filter(
            d => d.ProviderEventId !== event.ProviderEventId,
        )
        setData(events)
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
        hasMore,
        filterChanged,
        setData,
        favoriteEvent,
    }
}
