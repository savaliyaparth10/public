import React ,{ useEffect } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useFieldArray } from 'react-hook-form';
import { TCFAQService } from 'utility';
import { Form } from 'antd';
import { FormTextAreaFormField, FormTextFormField } from 'elements';

export const Faqs = ({ control, eventData, errors,list }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'EventFAQ',
    });
    const addFaqs = () => {
        append({ FAQ: "", Answer: "" })
    }

    useEffect(() => {
        if (list?.length) {
            list.map(ele => {
                append({ ...ele,FAQ: ele.FAQ,Answer: ele.Answer })
                return ''
            })
        }
    }, [list])

    const removeFaq = async (item, index) => {
        remove(index)
        if (eventData?.ProviderEventId === item.ProviderEventId && item.UniqueId) {
            await TCFAQService.removeFaq(item.UniqueId)
        }
    }

    return (
        <div className="terms-condition-main">
            <div className="header-mains">
                <div className="heading">
                    <h2>FAQs</h2>
                </div>
                <div className="terms-btn">
                    <button
                        type="button"
                        className="policiesbtn"
                        onClick={addFaqs}
                    >
                        ADD FAQ
                    </button>
                </div>
            </div>
            {fields.map((item, index) => {
                return (
                    <Form.Item key={`faq-${index}`}>
                        <div className="row ">
                            <div className="d-flex mt-2 align-items-normal">
                                <div className="col-11">
                                    <FormTextFormField
                                        control={control}
                                        label="Question"
                                        name={`EventFAQ.${index}.FAQ`}
                                        placeholder="Question"
                                        errors={errors?.EventFAQ?.[index]?.FAQ}
                                    />
                                </div>
                                <div className="mb-1 ml-2 d-flex align-self-end">
                                    <DeleteOutlined
                                        onClick={() => removeFaq(item, index)}
                                    />
                                </div>
                            </div>
                            <div className="col-12  mt-4">
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
                    </Form.Item>
                )
            })}
        </div>
    )
}