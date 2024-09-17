import axios from "axios";

const instance = axios.create({
    withCredentials : true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY" : "34d2f8bf-1d8a-430f-9129-194aa22085a0"
    }
})

export const usersAPI = {
    getUsers (activePage, pageSize) {
        return instance.get(`/users?page=${activePage}&count=${pageSize}`) 
        .then(response => response.data);
    },
    follow(userID){
        return instance.post(`follow/${userID}`)
    },
    unfollow(userID){
        return instance.delete(`follow/${userID}`)
    },
    getProfile(userID)
    {
        console.warn("Obselete method, use profileAPI object");
        return profileAPI.getProfile(userID);
    }
}

export const profileAPI = {
    getProfile(userID)
    {
        return instance.get("/profile/" + userID);
    },
    getStatus(userID)
    {
        return instance.get("/profile/status/" + userID)
    },
    updateStatus(status)
    {
        return instance.put("/profile/status/", {status: status});
    }
}

export const authAPI = {
    me()
    {
        return instance.get(`/auth/me`);
    },
    login(email, password,  rememberMe = false)
    {
        return instance.post("/auth/login", {email, password, rememberMe});
    },
    logout()
    {
        return instance.delete("/auth/login");
    }
}