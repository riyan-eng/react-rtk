import axios from '../api/axios'

const login = (email, password) =>{
    return axios.post('/auth/login',{
        email: email,
        password: password,
    }).then((res)=>{
        return res.data
    })
}

const authService = {
    login
}

export default authService