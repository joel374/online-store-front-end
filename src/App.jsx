import {
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react"
import Navbar from "./Components/Navbar"
import Card from "./Components/Product"
import { Route, Routes, useLocation } from "react-router-dom"
import Login from "./Page/Login"
import Register from "./Page/Register"
import Home from "./Page/Home"
import ProfileCard from "./Components/ProfileCard"
import { useEffect, useState } from "react"
import { axiosInstance } from "./api"
import { login } from "./Redux/Features/userSlice"
import { useDispatch } from "react-redux"
import Cart from "./Page/Cart"
import OrderList from "./Page/OrderList"
const App = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [userCheck, setUserCheck] = useState(false)

  const keepUserLoggedIn = async () => {
    try {
      const user_token = localStorage.getItem("user_token")

      if (!user_token) {
        setUserCheck(true)
        return
      }

      const response = await axiosInstance.get("/user/refresh-token")

      dispatch(login(response.data.data))
      localStorage.setItem("user_token", response.data.token)

      setUserCheck(true)
    } catch (err) {
      console.log(err)
      setUserCheck(true)
    } finally {
      setUserCheck(true)
    }
  }

  useEffect(() => {
    keepUserLoggedIn()
  }, [])
  if (!userCheck) {
    return <div>Loading cuy...</div>
  }
  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/testing" element={<ProfileCard />} />
      </Routes>
    </>
  )
}

export default App
