import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { FormSelectionField, FormTextFormField, OutlinedButton } from 'elements';
import { Plus, Trash } from 'phosphor-react';
import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { NotificationText, TeamService, NotificationStatus } from 'utility';
import * as yup from 'yup'
import { ProfileContainer, PopUpModal, FlexBox, PushNotification } from 'components';
import { GetTeamList, GetMyEvent, GetRoleList } from 'hooks';
import { MyEventList, TeamList } from 'page-components';

const TermsSchema = yup.object().shape({
    Team: yup.array().of(yup.object().shape({
        Email: yup.string().email("*Must be email").required("*Email is Required"),
        RoleId: yup.string(),
    })),
})

export const Team = ({ }) => {
    const [processing, setProcessing] = useState(false)
    const [openEvents, setOpenEvents] = useState(false)
    const [selectedEvents, setSelectedEvents] = useState([])
    const { data: events, loading, fetchMoreData, hasMore } = GetMyEvent();
    const { data: roleList } = GetRoleList()
    const { data: teamList, refetch: refetchTeam ,setList } = GetTeamList()
    const {
        control,
        handleSubmit, reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(TermsSchema),
        defaultValues: {
            Team: [],
        },
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'Team',
        shouldUnregister: true,
    });

    useEffect(() => {
        if (openEvents) {
            const list = teamList?.find(item => item.MemberId === openEvents)?.Events.map(item => item.ProviderEventId) || [];
            setSelectedEvents([...list])
        }
    }, [openEvents])

    const submit = async (formdata) => {
        setProcessing(true)
        const promise = formdata?.Team?.map(async (item) => {
            const result = await TeamService.inviteMember(item.Email,item.RoleId)
            return result
        })
        await Promise.all(promise)
        reset({ Team: [{ Email: "", RoleId: "" }] })
        remove()
        refetchTeam()
        setProcessing(false)
    }

    const addTerms = () => {
        if (fields.length < 1) { append({ Email: '', RoleId: "" }) }
    }

    const removeField = (item, index) => {
        remove(index)
    }

    const addEvent = (data) => {
        setOpenEvents(data.MemberId)
    }

    const onSelectEvent = (data) => {
        if (selectedEvents.includes(data)) {
            setSelectedEvents(selectedEvents.filter(item => item !== data));
        } else {
            setSelectedEvents([...selectedEvents, data])
        }
    }

    const assignEvents = async () => {
        setProcessing(true)
        await TeamService.assignEventsToMember(openEvents, selectedEvents)
        refetchTeam()
        setProcessing(false)
        setOpenEvents(false)

    }

    const deAssignEvent = () => {
    }

    const onRemove = async (data) => {
        setProcessing(true)
        try {
            await TeamService.removeMember(data.MemberId)
            PushNotification(NotificationText.removed, NotificationStatus.success)
            const list = teamList.filter(item => item.MemberId !== data.MemberId)
            setList(list)
        } catch (error) {
            PushNotification(NotificationText.defaultError, NotificationStatus.error)
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div className="position-relative row d-flex justify-content-center mb-3 mt-3">
            <div className="col-12  ml-2 mr-2 box-layout">
                <ProfileContainer>
                    <Form className="">
                        <div className="row">
                            <FlexBox>
                                <h1 className="col-12">
                                    My Team
                                    <OutlinedButton className="mx-2" onClick={addTerms}>
                                        <Plus className="mr-3 mt-1" />
                                    </OutlinedButton>
                                    <div>
                                        {fields.map((item, index) => {
                                            return (<Form.Item>
                                                <div className="row">
                                                    <div className="row">
                                                        <div className="col-5">
                                                            <FormTextFormField
                                                                control={control}
                                                                label="Email"
                                                                name={`Team.${index}.Email`}
                                                                placeholder="Email"
                                                                errors={errors?.Team?.[index]?.Email}
                                                            /></div><div className="col-5">
                                                            <FormSelectionField
                                                                control={control}
                                                                label="Role"
                                                                name={`Team.${index}.RoleId`}
                                                                placeholder="Select RoleId"
                                                                errors={errors?.Team?.[index]?.RoleId}
                                                                options={roleList}
                                                            />
                                                        </div>
                                                        <div className="col-2 d-flex align-items-end justify-content-start">
                                                            <OutlinedButton loading={processing} className="col-9" onClick={handleSubmit(submit)}>
                                                                <span className="mx-2">
                                                                    Submit
                                                                </span>
                                                            </OutlinedButton>
                                                            <Trash className="mb-1 mx-3 col-2" size={30} onClick={() => removeField(item, index)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form.Item>)
                                        })}
                                    </div>
                                </h1>
                            </FlexBox>
                            <TeamList teamList={teamList} onAdd={addEvent} deAssignEvent={deAssignEvent} onRemove={onRemove} />
                        </div>
                    </Form>
                    <PopUpModal
                        title="Assign Events"
                        open={openEvents}
                        onCancel={() => setOpenEvents(false)}
                        loading={processing}
                        onSubmit={assignEvents}
                        width={900}
                    >
                        <MyEventList
                            events={events}
                            loading={loading}
                            fetchMoreData={fetchMoreData}
                            hasMoreData={hasMore}
                            imgHeight={100}
                            checkBox
                            loadMore
                            onSelectEvent={onSelectEvent}
                            selectedEvents={selectedEvents}
                        />
                    </PopUpModal>
                </ProfileContainer>

            </div>  </div>
    )
}