import { Checkbox, Form } from 'antd';
import { PopUpModal } from 'components';
import { PrimaryButton } from 'elements';
import { GetTeamList } from 'hooks';
import { useState } from 'react';
import styled from "styled-components";
import { TeamService } from 'utility';

const TeamMemberRow = styled.div`
    border: solid 1px;
    border-radius:5px;
    margin-bottom:15px;
    padding:10px;
    border-color: ${({ theme }) => theme.colors.background}

`

export const TeamMember = ({ eventData,disabled }) => {
    const { data: teamList } = GetTeamList()

    const [teamMember, setTeamMember] = useState(false)
    const [selectedMember, setSelectedMember] = useState([])

    const onSelect = (id) => {
        if (selectedMember.includes(id)) {
            setSelectedMember(selectedMember.filter(item => item !== id))
        } else {
            setSelectedMember([...selectedMember,id])
        }
    }

    const onSubmit = async () => {
        await TeamService.assignMembersToEvent(eventData.ProviderEventId,selectedMember)
    }

    return (
        <>
            <PrimaryButton className="ml-2" onClick={() => setTeamMember(true)} disabled={disabled || !teamList.length}>Team Members</PrimaryButton>
            <Form>
                <PopUpModal
                    title="Team Members"
                    open={teamMember}
                    onCancel={() => setTeamMember(false)}
                    onSubmit={() => { onSubmit() }}
                >
                    <div className="row">
                        {teamList.map(item => {
                            return (<TeamMemberRow onClick={() => onSelect(item.MemberId)}><Checkbox onClick={() => onSelect(item.MemberId)} checked={selectedMember.includes(item.MemberId)} className="mr-2" />{item.Member}</TeamMemberRow>)
                        })}
                    </div>
                </PopUpModal>
            </Form>
        </>
    )
}