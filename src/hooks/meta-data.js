import { useState, useEffect, useMemo } from 'react'
import { MetaDataService, TeamService } from 'utility'

export const GetCountryList = () => {
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const data = useMemo(() => {
        return (country?.map(item => {
            return { value: item.CountryId, label: item.CountryName, key: item.CountryId,icon: <img height={30} width={30} src={item.FlagPath} alt="" />, ...item }
        }) || [])
    }, [country])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await MetaDataService.getCountry();
                setCountry(result?.Result)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        if (!loading) {
            fetchData()
        }
    }, [])

    return {
        data, error, loading,
    }
}

export const GetStateList = (CountryId) => {
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const data = useMemo(() => {
        return (state?.map(item => {
            return { value: item.CountryId, label: item.CountryName, key: item.CountryId, ...item }
        }) || [])
    }, [state])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await MetaDataService.getState({ CountryId })
                setState(result?.Result)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        if (!loading) {
            fetchData()
        }
    }, [])

    return {
        data, error, loading,
    }
}

export const GetLanguageList = () => {
    const [languages, setLanguages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const data = useMemo(() => {
        return (languages?.map(item => {
            return { value: item.Id, label: item.Language, ...item }
        }) || [])
    }, [languages])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await MetaDataService.getLanguage();
                setLanguages(result?.Result)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        if (!loading) {
            fetchData()
        }
    }, [])

    return {
        data, error, loading,
    }
}

export const GetCategoryList = () => {
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const data = useMemo(() => {
        return (category?.map(item => {
            return { value: item.CategoryId, label: item.CategoryName, ...item }
        }) || [])
    }, [category])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await MetaDataService.getCategory();
                setCategory(result?.Result)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        if (!loading) {
            fetchData()
        }
    }, [])

    return {
        data, error, loading,
    }
}

export const GetEventProviderList = () => {
    const [providerList, setProviderList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const data = useMemo(() => {
        return (providerList?.map(item => {
            return { value: item.ProviderId, label: item.ProviderName, ...item }
        }) || [])
    }, [providerList])

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await MetaDataService.getEventProvider();
            setProviderList(result?.Result)
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
    }, [])

    const addProvider = (data) => {
        const list = [...providerList]
        list.push(data)
        setProviderList(list)
    }

    return {
        data, error, loading, addProvider,
    }
}

export const GetEventPlaceList = (id,search) => {
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const data = useMemo(() => {
        return (places?.map(item => {
            return { value: item.PlaceGroupId, label: item.PlaceName, ...item }
        }) || [])
    }, [places])

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await MetaDataService.getEventPlace(id,search);
            setPlaces(result?.Result)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
            fetchData()
    }, [search])

    const refetch = () => {
        fetchData()
    }

    return {
        data, error, loading, refetch,
    }
}

export const GetImageCategoryList = () => {
    const [imageCategory, setImageCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const data = useMemo(() => {
        return (imageCategory?.map(item => {
            return { value: item.ImageCategoryId, label: item.ImageCategoryName, ...item }
        }) || [])
    }, [imageCategory])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await MetaDataService.getImageCategory();
                setImageCategory(result?.Result)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        if (!loading) {
            fetchData()
        }
    }, [])

    return {
        data, error, loading,
    }
}

export const GetTimeZoneList = (id) => {
    const [timeList, setTimeList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const data = useMemo(() => {
        return (timeList?.map(item => {
            return { value: item.ZoneName, label: item.ZoneName, ...item }
        }) || [])
    }, [timeList])

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await MetaDataService.getTimeZone(id);
            setTimeList(result?.Result)
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
    }, [])

    const refetch = () => {
        fetchData()
    }

    return {
        data, error, loading, refetch,
    }
}

export const GetRoleList = () => {
    const [roleList, setRoleList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const data = useMemo(() => {
        return (Object.keys(roleList)?.map(item => {
            return { value: item, label: roleList[item] }
        }) || [])
    }, [roleList])

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await TeamService.getRoleList();
            setRoleList(result?.Result)
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
    }, [])

    const refetch = () => {
        fetchData()
    }

    return {
        data, error, loading, refetch,
    }
}