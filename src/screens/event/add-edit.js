import {
    GetEventDetails,
    GetCategoryList,
    GetCountryList,
    GetEventPlaceList,
    GetEventProviderList,
    GetImageCategoryList,
    GetLanguageList,
    GetTimeZoneList,
    GetFAQList,
    GetTCList,
} from 'hooks'
import { AddEditEventForm, AddPlaceModal } from 'page-components'
import { useNavigate, useParams } from 'react-router-dom'
import {
    EventsService,
    NotificationStatus,
    NotificationText,
    TCFAQService,
} from 'utility'
import { Loader, PushNotification } from 'components'
import { useAuth } from 'context'
import { useEffect, useState, useMemo } from 'react'

export const AddEditEventScreen = () => {
    const [eventLoader, setEventLoader] = useState(false)
    const params = useParams()
    const { countryCode } = useAuth()
    const [addPlaceModal, setAddPlaceModal] = useState(false)
    const [placeSearch, setPlaceSearch] = useState('')
    const navigate = useNavigate()
    const { data, loading } = GetEventDetails(params?.id)
    const { data: countryList } = GetCountryList()
    const { data: languageList } = GetLanguageList()
    const { data: categoryList } = GetCategoryList()
    const {
        data: placeList,
        refetch: refetchPlaceList,
        loading: placeLoading,
    } = GetEventPlaceList(countryCode, placeSearch)
    const { data: imageCategoryList } = GetImageCategoryList()
    const { data: timeZoneList, refetch: refetchTimeZoneList } =
        GetTimeZoneList(countryCode)
    const { data: providerList, addProvider } = GetEventProviderList()
    const { data: tcList } = GetTCList()
    const { data: faqList } = GetFAQList()

    const onPlaceSearch = data => {
        setPlaceSearch(data)
    }

    useEffect(() => {
        refetchPlaceList()
        refetchTimeZoneList()
    }, [countryCode])

    const eventData = useMemo(() => {
        let returnData = {}
        if (params?.id) {
            returnData = { ...data }
        }
        return returnData
    }, [params?.id, data])

    const submitEvent = async submitedData => {
        try {
            setEventLoader(true)
            const subdata = { ...submitedData,ProviderId: Number(submitedData.ProviderId) }
            subdata.EventTicketRate = subdata.EventTicketRate?.map(item => {
                const newItem = { ...item }
                delete newItem.tempId
                return newItem
            })
            if (subdata.ProviderEventId) {
                console.log(' ====> UPDATE EVENT START')
                const apidata = { ...data, ...subdata }
                let faqIdx = 0
                while (faqIdx < apidata.EventFAQ.length) {
                    const item = apidata.EventFAQ[faqIdx]
                    try {
                        if (item.UniqueId) {
                            console.log(' ====> UPDATE FAQ', item)
                            // eslint-disable-next-line no-await-in-loop
                            await TCFAQService.updateFaq({ ...item })
                        } else {
                            console.log(' ====> ADD FAQ ', item)
                            // eslint-disable-next-line no-await-in-loop
                            await TCFAQService.addFaq({
                                ...item,
                                ProviderEventId: apidata.ProviderEventId,
                            })
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    faqIdx += 1
                }
                console.log(' ====> FAQ UPDATED')
                let tcIdx = 0
                while (tcIdx < apidata.TC.length) {
                    const item = apidata.TC[tcIdx]
                    try {
                        if (item.UniqueId) {
                            console.log(' ====> UPDATE TC', item)
                            // eslint-disable-next-line no-await-in-loop
                            await TCFAQService.updateTC({ ...item })
                        } else {
                            console.log(' ====> ADD TC', item)
                            // eslint-disable-next-line no-await-in-loop
                            await TCFAQService.addTc({
                                ...item,
                                ProviderEventId: apidata.ProviderEventId,
                            })
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    tcIdx += 1
                }
                console.log(' ====> TC UPDATED')
                delete apidata.EventImages
                delete apidata.TC
                delete apidata.EventFAQ
                await EventsService.addEvent({ ...apidata })
                console.log(' ====> UPDATE EVENT')
                setEventLoader(false)
                PushNotification(
                    NotificationText.eventUpdate,
                    NotificationStatus.success,
                )
                navigate(-1)
            } else {
                console.log(' ====> ADD EVENT START')
                await EventsService.addEvent(subdata)
                console.log(' ====> ADD EVENT END')
                setEventLoader(false)
                PushNotification(
                    NotificationText.eventAdd,
                    NotificationStatus.success,
                )
                navigate('/events/approval')
            }
        } catch (error) {
            setEventLoader(false)
            console.log(' ====> EVENT ERROR', error)
            PushNotification('Something went wrong!!', NotificationStatus.error)
        }
    }
    const openPlaceModal = () => {
        setAddPlaceModal(true)
    }

    const closePlaceModal = async data => {
        if (data) {
            await EventsService.addPlace(data)
            refetchPlaceList()
            PushNotification(
                NotificationText.placeAdded,
                NotificationStatus.success,
            )
        }
        setAddPlaceModal(false)
    }

    return (
        <div className="container">
            <AddEditEventForm
                submitEvent={submitEvent}
                openPlaceModal={openPlaceModal}
                data={eventData}
                loading={loading}
                countryList={countryList}
                languageList={languageList}
                categoryList={categoryList}
                placeList={placeList}
                placeLoading={placeLoading}
                imageCategoryList={imageCategoryList}
                timeZoneList={timeZoneList}
                providerList={providerList}
                defaultTcList={tcList}
                defaultFaqList={faqList}
                addProvider={addProvider}
                onPlaceSearch={onPlaceSearch}
            />
            <AddPlaceModal open={addPlaceModal} onClose={closePlaceModal} />
            <Loader loading={eventLoader} />
        </div>
    )
}
