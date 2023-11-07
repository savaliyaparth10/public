import { CommonUtility, APIPath } from 'utility'
import { BaseService } from './base'

class Team {

    getTeam() {
        return BaseService.get(APIPath.getTeam)
    }

    getAssignedEvents(id) {
        return BaseService.get(`${APIPath.getAssignedEvents}?CustomerUId=${id}`)
    }

    inviteMember(data,role) {
        return BaseService.post(`${APIPath.inviteTeamMember}?Email=${data}&RoleId=${role}`)
    }

    assignEventsToMember(memberId,eventIds) {
        return BaseService.post(`${APIPath.assignMemberToEvents}?CustomerUId=${memberId}&ProviderEventIds=${CommonUtility.arrayToString(eventIds,";")}`)
    }

    assignMembersToEvent(eventId,memberIds) {
        return BaseService.post(`${APIPath.assignTeamToEvent}?ProviderEventId=${eventId}&CustomerUIds=${CommonUtility.arrayToString(memberIds,";")}`)
    }

    getEventsForMember(memberId) {
        return BaseService.get(`${APIPath.getEventsForMember}?CustomerUId=${memberId}`)
    }

    removeMember(id) {
        return BaseService.post(`${APIPath.removeMember}?CustomerUId=${id}`)
    }

    getRoleList() {
        return BaseService.get(APIPath.getRole)
    }

}

const TeamService = new Team()
Object.freeze(TeamService)
export { TeamService }
