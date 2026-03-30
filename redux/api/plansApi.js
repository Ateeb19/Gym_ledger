
import api from "../../services/api";

//Fetch Plans
export const fetchPlans = async () => {
    const response = await api.get("/api/membership_plane/get");
    return response.data
}

//Add Plans
export const addPlans = async () => {
    const response = await api.post("/api/membership_plane/add");
    return response.data
}

//Update Member
export const updatePlan = async (id, payload)=> {
    const response = await api.patch(`/api/membership_plane/update/${id}`, payload);
    return response.data
}