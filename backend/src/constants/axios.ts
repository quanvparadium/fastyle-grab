import axios from 'axios'

export const axiosPython = axios.create({
    baseURL: 'http://localhost:4001' // Thay đổi thành URL của backend
})
