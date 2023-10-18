import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:3000'

export default axios.create({
    baseURL: BASE_URL
})

const Private = axios.create({
    baseURL: BASE_URL
})

Private.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config
    },
    error =>{
        Promise.reject(error)
    }
)

Private.interceptors.response.use((response)=>{
    // console.log("sukses");
    return response
}, function (error) {
    console.log("gagal");
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken")
        console.log("ambil refersh token");
        console.log("minta access token");
        return axios.post(BASE_URL+'/auth/refresh_token', {
            refresh_token: refreshToken
        }).then(res=>{
            if (res.status==200){
                console.log("berhasil meminta akses token");
                localStorage.setItem("accessToken", res.data.data.access_token)
                localStorage.setItem("refreshToken", res.data.data.refresh_token)
                console.log("hit ulang api yang gagal sebelumnya");
                Private.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
                return Private(originalRequest)
            }
        }).catch(error=>{
            // console.log(error.response.statusText);
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
        })
    }
    return Promise.reject(error)
})

export const axiosPrivate = Private