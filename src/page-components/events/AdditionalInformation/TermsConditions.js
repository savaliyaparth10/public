import React, { useEffect } from 'react'
import { Form } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { TCFAQService } from 'utility'
import { FormTextFormField } from 'elements'
import { useFieldArray } from 'react-hook-form'
import styled from 'styled-components'

const TermsConditionMain = styled.div`
    Input {
        margin-top: 1.5rem !important;
    }
    .anticon-delete {
        margin-top: 1.5rem;
    }
`
export const TermsConditions = ({ control, eventData, errors, list }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'TC',
        shouldUnregister: true,
    })

    const addTerms = () => {
        append({ TC: '' })
    }

    useEffect(() => {
        if (list?.length) {
            list.map(ele => {
                append({ ...ele,TC: ele.TC })
                return ''
            })
        }
    }, [list])

    const removeTc = async (item, index) => {
        remove(index)
        if (
            eventData?.ProviderEventId === item.ProviderEventId &&
            item.UniqueId
        ) {
            await TCFAQService.removeTC(item.UniqueId)
        }
    }
    return (
        <TermsConditionMain className="terms-condition-main">
            <div className="header-main">
                <div className="heading">
                    <h2>Terms & Conditions</h2>
                </div>
                <div className="terms-btn">
                    <button
                        type="button"
                        className="policiesbtn"
                        onClick={addTerms}
                    >
                        ADD T&C
                    </button>
                </div>
            </div>
            <div className="terms-condition-content">
                {fields.map((item, index) => (
                    <Form.Item key={`tc-${index}`}>
                        <div className="row">
                            <div className="col-12 d-flex">
                                <div className="col-11">
                                    <FormTextFormField
                                        control={control}
                                        label=""
                                        name={`TC.${index}.TC`}
                                        placeholder="Add Terms Condition"
                                        errors={errors?.TC?.[index]?.TC}
                                    />
                                </div>
                                <div className="col-1 d-flex align-items-center justify-content-center">
                                    <DeleteOutlined
                                        onClick={() => removeTc(item, index)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Form.Item>
                ))}
            </div>
        </TermsConditionMain>
    )
}
