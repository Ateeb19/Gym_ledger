import api from "../../services/api"


//Register user
export const registerUser = async (payload) => {
    const response = await api.post("/api/auth/signup", payload);
    return response.data
}

//Login user
export const loginUser = async (payload) => {
    const response = await api.post("/api/auth/login", payload);
    return response.data
}

//Logout user

export const logoutUser = async () => {
    const response = await api.post("/api/auth/logout");
    return response.data
}

//Profile Information
export const profileInfo = async () => {
    const response = await api.get("/api/profile");
    return response.data
}