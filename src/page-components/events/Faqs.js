import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { PopUpModal } from 'components';
import { FormTextAreaFormField, FormTextFormField, OutlinedButton, PrimaryButton } from 'elements';
import { Plus, Trash } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { TCFAQService } from 'utility';
import * as yup from 'yup'

const FAQSchema = yup.object().shape({
    EventFAQ: yup.array().of(yup.object().shape({
        FAQ: yup.string().required("question is Required"),
        Answer: yup.string().required("answer is Required"),
    })),
})

export const Faqs = ({ submitFaqs, eventData, faqs }) => {
    const [faqModal, setFaqModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(FAQSchema),
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'EventFAQ',
    });

    const addFaqs = () => {
        append({ FAQ: "", Answer: "" })
    }

    useEffect(() => {
        remove()
        reset({
            EventFAQ: faqs || [],
        })
    }, [faqModal, faqs])

    const FaqsModal = () => {
        setFaqModal(true)
        reset({})
    }

    const submit = async (formData) => {
        setLoading(true)
        submitFaqs(formData.EventFAQ)
        if (eventData.ProviderEventId) {
           const promises = formData.EventFAQ.map(async (item) => {
            let result = ""
                if (item.UniqueId) {
                    result = await TCFAQService.updateFaq({ ...item })
                }
                if (eventData.ProviderEventId && !item.UniqueId) {
                    result = await TCFAQService.addFaq({ ...item, ProviderEventId: eventData.ProviderEventId })
                }
                return result
            })
            await Promise.all(promises)
        }
        setLoading(false)
        setFaqModal(false)
    }

    const removeFaq = async (item, index) => {
        remove(index)
        if (item?.UniqueId) {
           await TCFAQService.removeFaq(item.UniqueId)
        }
    }

    return (
        <>
            <PrimaryButton onClick={FaqsModal}>FAQs</PrimaryButton>
            <Form>
                <PopUpModal
                    title="Faq"
                    open={faqModal}
                    onCancel={() => setFaqModal(false)}
                    loading={loading}
                    onSubmit={handleSubmit(submit)}
                >
                    <div className="row">
                        {fields.map((item, index) => {
                            return (<Form.Item key={`faq-${index}`}>
                                <div className="row ">
                                    <div className="d-flex">
                                        <div className="col-11">
                                        <FormTextFormField
                                            control={control}
                                            label="Question"
                                            name={`EventFAQ.${index}.FAQ`}
                                            placeholder="Question"
                                            errors={errors?.EventFAQ?.[index]?.FAQ}
                                        />
                                        </div>
                                        <div className="mb-1 ml-2 d-flex align-items-end">
                                            <Trash size={24} onClick={() => removeFaq(item, index)} />
                                        </div>
                                    </div>
                                    <div className="col-12  ">
                                        <FormTextAreaFormField
                                            control={control}
                                            label="Answer"
                                            name={`EventFAQ.${index}.Answer`}
                                            placeholder="Answer"
                                            errors={errors?.EventFAQ?.[index]?.Answer}
                                            height="70"
                                        />
                                    </div>
                                </div>
                            </Form.Item>)
                        })}
                        <Form.Item className="col-12 box">
                            <OutlinedButton onClick={addFaqs}>
                                <Plus className="mr-3" />
                                <span className="mx-2">Add Faq</span>
                            </OutlinedButton>
                        </Form.Item>
                    </div>
                </PopUpModal>
            </Form>
        </>
    )
}