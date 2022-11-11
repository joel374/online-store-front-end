import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  username: "",
  email: "",
  phoneNumber: 0,
  shop_name: "",
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.email = action.payload.email
      state.phoneNumber = action.payload.phoneNumber
      state.shop_name = action.payload.shop_name
    },
    logout: (state, action) => {
      state.id = 0
      state.username = ""
      state.email = ""
      state.phoneNumber = 0
      state.shop_name = ""
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
