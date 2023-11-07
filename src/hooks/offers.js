import { useState, useEffect } from 'react'
import { OffersService } from 'utility'

export const GetOffersList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState({
        PageNo: 1,
        PageSize: 9,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await OffersService.getAllOffers(filter)
                if (filter.PageNumber === 1) {
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
            ...changeValues,
            PageSize: 9,
            PageNumber: 1,
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
        hasMore,
        filterChanged,
    }
}
export const GetOffersCategoryList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState({
        PageNo: 1,
        PageSize: 9,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await OffersService.getOffersCategory(filter)
                if (filter.PageNumber === 1) {
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
            ...changeValues,
            PageSize: 9,
            PageNumber: 1,
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
        hasMore,
        filterChanged,
    }
}

export const GetOffersBySearch = (text, intialFilter) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState({
        PageNo: 1,
        PageSize: 9,
        SearchText: text || "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const params = {
                    ...filter,
                    ...intialFilter,
                    SearchText: text || undefined,
                }
                const result = await OffersService.searchOffer(params)
                if (filter.PageNo === 1) {
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

    useEffect(() => {
        filterChanged({
            SearchText: text,
        })
    }, [text])

    const filterChanged = changeValues => {
        setFilter({
            ...changeValues,
            PageSize: 9,
            PageNo: 1,
        })
    }
    const fetchMoreData = () => {
        setFilter({
            ...filter,
            PageNo: filter.PageNo + 1,
        })
    }

    const fetchAll = () => {
        setFilter({
            ...filter,
            PageNo: 1,
            PageSize: 100000,
        })
    }

    return {
        data,
        error,
        loading,
        fetchMoreData,
        hasMore,
        filterChanged,
        fetchAll,
    }
}

export const GetSpotLightsList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState({
        PageNo: 1,
        PageSize: 9,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await OffersService.getSpotLights(filter)
                if (filter.PageNo === 1) {
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
            ...changeValues,
            PageSize: 9,
            PageNo: 1,
        })
    }
    const fetchMoreData = () => {
        setFilter({
            ...filter,
            PageNo: filter.PageNo + 1,
        })
    }

    const fetchAll = () => {
        setFilter({
            ...filter,
            PageNo: 1,
            PageSize: 100000,
        })
    }

    return {
        data,
        error,
        loading,
        fetchMoreData,
        hasMore,
        filterChanged,
        fetchAll,
    }
}

export const GetTopOffersList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [filter, setFilter] = useState({
        PageNo: 1,
        PageSize: 9,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await OffersService.getTopOffers(filter)
                if (filter.PageNo === 1) {
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
            ...changeValues,
            PageSize: 9,
            PageNo: 1,
        })
    }
    const fetchMoreData = () => {
        setFilter({
            ...filter,
            PageNo: filter.PageNo + 1,
        })
    }

    const fetchAll = () => {
        setFilter({
            ...filter,
            PageNo: 1,
            PageSize: 100000,
        })
    }

    return {
        data,
        error,
        loading,
        fetchMoreData,
        hasMore,
        filterChanged,
        fetchAll,
    }
}

export const GetOffersDetails = id => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await OffersService.getOfferDetails(id)
            setData(result?.Result)
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

export const GetOfferCartTermsAndCondition = id => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const fetchData = async () => {
        try {
            setLoading(true)
            console.log('id', id)
            const result = await OffersService.getTermsAndCondition(id)
            setData(result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (id) {
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