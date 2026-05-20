
import api from "../../services/api";

//Fetch Plans
export const fetchPlans = async () => {
    const response = await api.get("/api/membership_plane/get");
    return response.data
}

//Add Plans
export const addPlans = async (payload) => {
    const response = await api.post("/api/membership_plane/add", payload);
    return response.data
}

//Delete Plans
export const deletePlans = async (id) => {
    const response = await api.delete(`/api/membership_plane/delete/${id}`);
    return response.data
}

//Update Member
export const updatePlan = async (id, payload)=> {
    const response = await api.patch(`/api/membership_plane/update/${id}`, payload);
    return response.data
}