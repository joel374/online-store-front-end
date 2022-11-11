import axios from "axios"
import { logout } from "../Redux/Features/userSlice"
import { store } from "../Redux/store"

const axiosInstance = axios.create({
  baseURL: "http://localhost:2000",
})

axiosInstance.interceptors.request.use((req) => {
  const user_token = localStorage.getItem("user_token")

  if (user_token) {
    req.headers.authorization = `Bearer ${user_token}`
  }

  return req
})

// axiosInstance.interceptors.response.use(
//   (resSuccess) => {
//     return resSuccess
//   },
//   (resError) => {
//     if (resError.response.status === 401) {
//       console.log("LOGOUT USER")
//       localStorage.removeItem("user_token")
//       store.dispatch(logout())
//     }

//     return Promise.reject(resError)
//   }
// )
export { axiosInstance }
