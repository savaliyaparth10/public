import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Select, Tag } from 'antd'
import { DangerText } from 'components'
import {
    FormTextFormField,
    PrimaryButton,
    FormSelectionField,
    FormDivider,
    EventFileUploader,
    FilePreviewer,
    FormTextAreaFormField,
    FormSelectionWithAddField,
    UploadButton,
} from 'elements'
import React, { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import styled from 'styled-components'
import { EventsService, MetaDataService } from 'utility'
import { useAuth } from 'context'
import LocationIcone from '../../assets/Icons/pin.png'
// import { TicketTableDetails } from './TicketTableDetails'

const TagSelector = styled(Form.Item)`
    ${'' /* height: 100px; */}
    label {
        height: 30px !important;
        display: block;
    }
    .ant-select-selector {
        ${'' /* height: 37px; */}
        max-height: 85px;
        background: ${({ theme }) => theme.colors.secondary} !important;
        border-color: transparent !important;
        color: ${({ theme }) => theme.colors.white} !important;
        display: flow-root;
    }
    .ant-select-selection-placeholder {
        color: ${({ theme }) => theme.colors.gray} !important;
    }
    .ant-select-selection-item {
        background: ${({ theme }) => theme.colors.primary} !important;
    }
    .ant-select-selection-overflow {
        max-height: 85px;
        overflow: overlay;
    }
`

const EventSchema = yup.object().shape({
    EventName: yup.string().required('*Event Name is required'),
    ProviderId: yup.number().required('*Organizer is required'),
    CategoryId: yup.number().required('*Category is required'),
    PlaceId: yup.number().required('*Place is required'),
    LanguageId: yup.number().required('*Language is required'),
    Description: yup.string(),
})

export const Step1 = ({
    setImageFiles,
    imagefiles,
    openPlaceModal,
    data,
    languageList,
    categoryList,
    imageCategoryList,
    placeList,
    providerList,
    addProvider,
    onPlaceSearch,
    setCurrentStep, currentStep,
    next, submitSteps,
}) => {
    console.log("🚀 ~ file: Step1.js:74 ~ placeList:", placeList)
    const [error, setError] = useState('')
    console.log("🚀 ~ file: Step1.js:76 ~ error:", error)
    const [imageModal, setImageModal] = useState(false)
    const { profile, CountryId } = useAuth()
    const {
        control,
        handleSubmit, reset,
        setValue,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(EventSchema),
        defaultValues: {
            FreeTicketAge: 2,
        },
    })

    const placeId = watch('PlaceId')
    console.log("🚀 ~ file: Step1.js:93 ~ placeId:", placeId)
    const Tags = watch('Tags')
    const onTagChange = data => {
        let len = 0
        data.map(item => {
            len += item.length
            return ''
        })
        if (len <= 500) {
            setValue('Tags', data)
        } else {
            data.pop()
            setValue('Tags', data)
        }
    }

    const UserProviderList = useMemo(() => {
        const list = [...providerList]
        if (
            !providerList.find(item => item.ProviderId === profile?.Id) &&
            profile?.Id
        ) {
            list.push({ value: profile?.Id, label: profile?.FullName })
        }
        return list
    }, [providerList, profile])

    useEffect(() => {
        if (profile?.Id) {
            setValue('ProviderId', profile?.Id)
        }
    }, [UserProviderList])

    useEffect(() => {
        setValue('PlaceId', undefined)
    }, [CountryId])

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                Tags: data.Tags?.split(';'),
            })
        }
    }, [data])

    const submit = async formData => {
        const imageArray = imagefiles?.map(image => {
            return {
                ...image,
                Image: image.Image,
                ImageCategoryId: image.ImageCategoryId,
                IsActive: true,
            }
        })
        const formDataObj = {
            ...formData,
            EventImages: imageArray,
            CategoryId: formData.CategoryId,
            ProviderId: formData.ProviderId.toString(),
            Tags: Tags?.toString().replaceAll(',', ';') || '',
        }
        setError('')
        submitSteps(currentStep, formDataObj)
        next()

    }

    const uploadFinish = async data => {
        setImageFiles([...imagefiles, ...data])
    }

    const openImageModal = () => {
        setImageModal(true)
    }

    const removeFile = async (fileName, id) => {
        let allFiltersFiles = [...imagefiles]
        allFiltersFiles = allFiltersFiles?.filter(
            item => item.ImageId !== fileName,
        )
        setImageFiles(allFiltersFiles)
        if (data?.ProviderEventId) {
            await EventsService.removeImage(id)
        }
    }

    const addEventProvider = async data => {
        const result = await MetaDataService.postEventProvider({
            ProviderId: "0",
            ProviderName: data,
        })
        addProvider(result.Result)
    }
    const prev = () => {
        setCurrentStep(currentStep - 1)
    }
    return (
        <div>
            <FormDivider className="mt-0" />
            {error && <DangerText>{error}</DangerText>}
            <div className={`row ${currentStep === 0 ? '' : 'd-none'}`}>
                <div>
                    <div className="upload-btn">
                        <UploadButton
                            className="col-12 mb-3"
                            onClick={openImageModal}
                        >
                            <span style={{ fontSize: '20px' }}>+</span>{' '}
                            <br />
                            Upload Images
                        </UploadButton>
                    </div>
                    <Form.Item className="col-md-12 col-sm-12 pt-md-4">
                        {imageModal && (
                            <EventFileUploader
                                setError={setError}
                                onSubmit={uploadFinish}
                                imagefiles={imagefiles}
                                imageCategoryList={imageCategoryList}
                                open={imageModal}
                                onClose={() => setImageModal(false)}
                                eventData={data}
                            />
                        )}
                        <div className="mt-3">
                            <FilePreviewer
                                perRowItem={6}
                                files={imagefiles || []}
                                removeFile={removeFile}
                            />
                        </div>
                    </Form.Item>
                </div>
                <Form.Item className="col-12 col-sm-12 col-md-6">
                    <div className="lable">
                        Event name <span className="imp">*</span>
                    </div>
                    <FormTextFormField
                        control={control}
                        name="EventName"
                        placeholder="Add Event Name"
                        errors={errors?.EventName}
                        defaultValue=""
                    />
                </Form.Item>
                <Form.Item className="col-12 col-sm-12 col-md-6">
                    <div className="lable">
                        Select Place <span className="imp">*</span>
                    </div>
                    <FormSelectionField
                        control={control}
                        name="PlaceId"
                        placeholder="Select Place"
                        onSearch={onPlaceSearch}
                        errors={errors?.PlaceId}
                        options={placeList}
                        showSearch
                    >
                        <div
                            className="ml-2 location-btn"
                            onClick={openPlaceModal}
                        >
                            <img
                                src={LocationIcone}
                                alt=""
                                width="30px"
                                height="30px"
                            />
                        </div>
                    </FormSelectionField>
                    <div className="mt-2">
                        {placeList?.find(
                            item => item.PlaceGroupId === placeId,
                        )?.FormattedAddress && (
                                <Tag color="black">
                                    {
                                        placeList?.find(
                                            item =>
                                                item.PlaceGroupId ===
                                                placeId,
                                        ).FormattedAddress
                                    }
                                </Tag>
                            )}
                    </div>
                </Form.Item>
                <Form.Item className="col-12 col-sm-12 col-md-6">
                    <div className="lable">
                        Organizer <span className="imp">*</span>
                    </div>
                    <FormSelectionWithAddField
                        control={control}
                        name="ProviderId"
                        placeholder="Select Organizer"
                        errors={errors?.ProviderId}
                        defaultValue=""
                        options={UserProviderList}
                        addOption={addEventProvider}
                        showSearch
                    />
                </Form.Item>
                <Form.Item className="col-12 col-sm-12 col-md-6">
                    <div className="lable">
                        Category <span className="imp">*</span>
                    </div>
                    <FormSelectionField
                        control={control}
                        name="CategoryId"
                        placeholder="Select Category"
                        errors={errors?.CategoryId}
                        defaultValue=""
                        options={categoryList}
                        showSearch
                    />
                </Form.Item>
                <Form.Item className="col-12 col-sm-12 col-md-6">
                    <div className="lable">
                        Language <span className="imp">*</span>
                    </div>
                    <FormSelectionField
                        control={control}
                        name="LanguageId"
                        placeholder="Select language"
                        errors={errors?.LanguageId}
                        defaultValue=""
                        options={languageList}
                        showSearch
                    />
                </Form.Item>
                <TagSelector className="mb-4 col-12 col-sm-12 col-md-6 d-flex flex-column">
                    <div className="lable">Tags</div>
                    <Select
                        name="Tags"
                        onChange={onTagChange}
                        value={Tags}
                        placeholder="Add Tags"
                        mode="tags"
                        open={false}
                        className="tag-selection"
                        size="large"
                        maxTagTextLength={70}
                    />
                </TagSelector>
                <Form.Item className="col-12">
                    <div className="lable">Description</div>
                    <FormTextAreaFormField
                        control={control}
                        name="Description"
                        placeholder="Enter Description Here"
                        errors={errors?.Description}
                        defaultValue=""
                        height={200}
                    />
                </Form.Item>
            </div>
            <div className="btns">
                {currentStep > 0 && (
                    <Button
                        style={{ backgroundColor: ' #4a4c5e' }}
                        onClick={() => prev()}
                    >
                        Back
                    </Button>
                )}
                <PrimaryButton
                    className=" p-3 d-flex flex-row align-items-center border justify-content-center"
                    block
                    onClick={handleSubmit(submit)}
                >
                    Next
                </PrimaryButton>
            </div>
        </div>
    )
}
