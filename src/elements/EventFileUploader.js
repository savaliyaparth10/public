import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
    AcceptFileType,
    EventsService,
    FileUploadService,
    NotificationStatus,
    NotificationText,
} from 'utility'
import { OutlinedButton, PrimaryButton } from './Button'
import { FilePreviewer, FileUploadPicker } from './FileUploadPicker'
import * as yup from 'yup'
import { FormSelectionField } from './Input'
import { Form, Modal } from 'antd'
import { DangerText, PushNotification } from 'components'
import { Plus, Trash } from 'phosphor-react'

const categorySchema = yup.object().shape({
    ImageCategory: yup.array().of(
        yup.object().shape({
            id: yup.string().required(),
        }),
    ),
})

export const EventFileUploader = ({
    open,
    imageCategoryList,
    onSubmit,
    onClose,
    eventData,
}) => {
    const [files, setFiles] = useState([])
    const [indexedFiles, setIndexedFiles] = useState({})
    const [allFiles, setAllFiles] = useState({})
    const [error, setError] = useState('')
    const [imageModal, setImageModal] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log(imageCategoryList)
    const { control, handleSubmit, reset, errors, setValue } = useForm({
        defaultValues: {
            ImageCategory: [],
        },
        resolver: yupResolver(categorySchema),
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ImageCategory',
        shouldUnregister: true,
    })

    const addNew = () => {
        append({ id: '' })
        setFiles([])
    }

    useEffect(() => {
        if (open) {
            openImageModal()
        }
    }, [open])

    const idChanged = (code, index) => {
        const id = imageCategoryList.find(x => x.value === code)
        if (id) {
            setValue(`ImageCategory[${index}].id`, id.ImageCategoryId)
        }
    }

    const addPreviewImage = (newfiles, index) => {
        setFiles([...newfiles])
        setIndexedFiles([index, newfiles])
    }

    const removeFile = (fileName, index) => {
        const allFiltersFiles = { ...allFiles }
        allFiltersFiles[index] = allFiles?.[index].filter(
            item => item.name !== fileName,
        )
        setAllFiles(allFiltersFiles)
    }

    useEffect(() => {
        if (Object.keys(indexedFiles).length !== 0) {
            setAllFiles({
                ...allFiles,
                [indexedFiles[0]]: [...indexedFiles[1]],
            })
        }
    }, [indexedFiles])

    const openImageModal = () => {
        setFiles([])
        reset()
        setIndexedFiles([])
        setAllFiles({})
        remove()
        setImageModal(true)
    }

    const closeImageModal = () => {
        reset({ ImageCategory: [] })
        remove()
        setImageModal(false)
        reset()
        remove()
        onClose()
    }

    const upload = async formData => {
        setLoading(true)
        if (
            Object.values(allFiles).some(item => item.length === 0) ||
            Object.values(allFiles).length === 0
        ) {
            setError('*Please Upload Selected Category Images')
            setLoading(true)
            return
        }
        const filesArray = []
        Object.keys(allFiles).map(item => {
            let indexFileArray = allFiles[item]
            indexFileArray = indexFileArray.map(data => {
                return {
                    ...data,
                    ImageCategoryId: formData.ImageCategory[item].id,
                }
            })
            filesArray.push(...indexFileArray)
            return indexFileArray
        })
        let fileResult = []
        try {
            const promises = filesArray.map(async item => {
                const { Result } = await FileUploadService.media(
                    item.file,
                    item.file.type,
                )
                return { Image: Result, ImageCategoryId: item.ImageCategoryId }
            })
            fileResult = await Promise.all(promises)
        } catch (error) {
            PushNotification(
                NotificationText.defaultError,
                NotificationStatus.error,
            )
        }
        if (eventData?.ProviderEventId) {
            fileResult = fileResult.map(async item => {
                const data = await EventsService.addImage({
                    ...item,
                    EventId: eventData.ProviderEventId,
                })
                return data.Result
            })
            fileResult = await Promise.all(fileResult)
        }
        setLoading(false)
        setImageModal(false)
        onSubmit(fileResult)
        closeImageModal()
    }

    return (
        <div>
            <Form>
                <Modal
                    footer={[
                        <OutlinedButton onClick={closeImageModal}>
                            {' '}
                            Cancel
                        </OutlinedButton>,
                        <PrimaryButton
                            loading={loading}
                            onClick={handleSubmit(upload)}
                        >
                            Submit
                        </PrimaryButton>,
                    ]}
                    open={imageModal}
                    onCancel={closeImageModal}
                    title="Upload Images"
                    onSubmit={upload}
                >
                    <div className="mt-3">
                        <OutlinedButton onClick={addNew}>
                            <Plus className="mr-3" />
                            <span className="mx-2">Add Category</span>
                        </OutlinedButton>
                        {fields.map((item, index) => {
                            return (
                                <div className="mt-2" key={item.id}>
                                    <div className="row">
                                        <div className="col-12">
                                            <FormSelectionField
                                                control={control}
                                                label="Image Category"
                                                name={`ImageCategory[${index}].id`}
                                                placeholder="Select Image Category"
                                                errors={
                                                    errors?.ImageCategoryId[
                                                        index
                                                    ]
                                                }
                                                options={imageCategoryList}
                                                onChange={data =>
                                                    idChanged(data, index)}
                                            >
                                                <Trash
                                                    size={30}
                                                    onClick={() =>
                                                        remove(index)}
                                                    className="mx-2 pointer"
                                                />
                                            </FormSelectionField>
                                        </div>
                                        <div className="mt-2">
                                            <FileUploadPicker
                                                description={
                                                    <h6>Upload Event Image</h6>
                                                }
                                                maxFiles={500}
                                                customButton={
                                                    <OutlinedButton
                                                        type="button"
                                                        className="col-4"
                                                    >
                                                        Browse
                                                    </OutlinedButton>
                                                }
                                                accept={AcceptFileType.image}
                                                setFiles={data =>
                                                    addPreviewImage(data, index)}
                                                files={files}
                                                uploadText=""
                                                containerHeight="100"
                                                containerWidth="100"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <FilePreviewer
                                            files={allFiles?.[index] || []}
                                            removeFile={(name, id) =>
                                                removeFile(name || id, index)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        <DangerText className="mt-2 mx-2">
                            {error && error}
                        </DangerText>
                    </div>
                </Modal>
            </Form>
        </div>
    )
}
