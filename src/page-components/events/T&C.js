import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Radio, Space } from 'antd';
import { PopUpModal } from 'components';
import { FormTextFormField, OutlinedButton, PrimaryButton } from 'elements';
import { Plus, Trash } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { TCFAQService } from 'utility';
import * as yup from 'yup'

const TermsSchema = yup.object().shape({
    TC: yup.array().of(yup.object().shape({
        TC: yup.string().required("terms & condition is Required"),
    })),
})

export const TermsConditions = ({ submitTerms, eventData,terms }) => {
    const [tcModal, setTcModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState(1);

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(TermsSchema),
        defaultValues: {
            TC: [],
        },
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'TC',
        shouldUnregister: true,
    });

    const onChange = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        remove();
        if (terms?.length) {
        reset({ TC: terms || [] });
        }
    }, [tcModal, terms,eventData])

    const openModel = () => {
        reset({ TC: [] })
        setTcModal(true)

    }

    const addTerms = () => {
        append({ TC: '' })
    }

    const submit = async (formData) => {
        setLoading(true)
        const res = []
        if (eventData.ProviderEventId) {
            formData.TC.map(async (item) => {
                const data = { ...item }
                delete data.id
                let responce = {}
                if (data.UniqueId) {
                    responce = await TCFAQService.updateTC({ ...data })
                } else {
                    responce = await TCFAQService.addTc({ ...data,ProviderEventId: eventData.ProviderEventId })
                }
                res.push(responce.Result)
            })
        }
        submitTerms(!eventData.ProviderEventId ? formData.TC : res)
        setLoading(false)
        remove()
        reset()
        setTcModal(false)
    }

    const removeTc = async (item, index) => {
        remove(index)
        if (item.UniqueId) {
           await TCFAQService.removeTC(item.UniqueId)
        }
    }

    return (
        <>
            <PrimaryButton className="mr-2" onClick={openModel}>T&C</PrimaryButton>
            <Form>
                <PopUpModal
                    title="Additional Information"
                    open={tcModal}
                    onCancel={() => setTcModal(false)}
                    loading={loading}
                    onSubmit={handleSubmit(submit)}
                >
                    <div className="row">
                        <div className="col-12">
                            <p>Listing Privacy</p>
                        </div>
                        <div className="col-12">
                            <Radio.Group onChange={onChange} value={value}>
                                <Space direction="vertical">
                                    <Radio value={1}>Public page: put your event in front of millions of ticket buyers on gtikit and search engines like Google.</Radio>
                                    <Radio value={2}>Private page: do not list this event publicly</Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="col-12">
                        <h2>Terms & Conditions</h2>
                    </div>
                    {fields.map((item, index) => {
                        return (<Form.Item key={`tc-${index}`}>
                            <div className="row">
                                <div className="col-12 d-flex ">
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
                                        <Trash size={26} onClick={() => removeTc(item, index)} />
                                    </div>
                                </div>
                            </div>
                        </Form.Item>)
                    })}
                    <Form.Item className="col-12 box">
                        <OutlinedButton onClick={addTerms}>
                            <Plus className="mr-3" />
                            <span className="mx-2">Add Terms & Conditions</span>
                        </OutlinedButton>
                    </Form.Item>
                </PopUpModal>
            </Form>
        </>
    )
}