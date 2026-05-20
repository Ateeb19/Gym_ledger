
import api from "../../services/api";

//Fetch payments
export const fetchPayments = async () => {
    const response = await api.get("/api/payments/get");
    return response.data
}

//Add Payments
// export const addPayments = async () => {
//     const response = await api.post("/api/membership_plane/add");
//     return response.data
// }

// //Update Member
// export const updatePlan = async (id, payload)=> {
//     const response = await api.patch(`/api/membership_plane/update/${id}`, payload);
//     return response.data
// }