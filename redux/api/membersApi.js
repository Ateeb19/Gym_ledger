import api from "../../services/api";

//Fetch Members
export const fetchMembers = async () => {
    const response = await api.get("/api/members/get_member");
    return response.data
}

//Add Members
export const addMember = async (payload) => {
    const response = await api.post("/api/members/add_member",payload);
    return response.data
}

//Delete Member
export const deleteMember = async (id) => {
    const response = await api.delete(`/api/members/delete_member/${id}`);
    return response.data
}

//Update Member
export const updateMember = async (id, payload)=> {
    const response = await api.patch(`/api/members/update_member/${id}`, payload);
    return response.data
}

//View a member

export const viewMembers = async (id)=> {
    const response = await api.get(`/api/members/member_detail/${id}`);
    return response.data
}