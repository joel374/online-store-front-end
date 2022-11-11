import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { axiosInstance } from "../api"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../Redux/Features/userSlice"

const Login = () => {
  const dispatch = useDispatch()
  const userSelector = useSelector((state) => state.user)

  const toast = useToast()

  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      emailOrPhoneNumber: "",
      password: "",
    },
    onSubmit: async ({ emailOrPhoneNumber, password }) => {
      try {
        const response = await axiosInstance.post("/user/login", {
          emailOrPhoneNumber,
          password,
        })

        console.log(response.data.data.Sellers[0].shop_name)

        toast({
          title: "Login Succesful",
          status: "success",
          description: response.data.message,
        })

        localStorage.setItem("user_token", response.data.token)
        dispatch(
          login({
            username: response.data.data.username,
            email: response.data.data.email,
            phoneNumber: response.data.data.phoneNumber,
            id: response.data.data.id,
            shop_name: response.data.data.Sellers[0].shop_name,
          })
        )

        formik.setFieldValue("emailOrPhoneNumber", "")
        formik.setFieldValue("password", "")
        navigate("/")
      } catch (error) {
        console.log(error)
        toast({
          title: "Login Failed",
          status: "error",
          description: error.response.data.message,
        })
      }
    },
    validationSchema: Yup.object({
      emailOrPhoneNumber: Yup.string().required(
        "Email or Phone Number is required field"
      ),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Box>
      <Box
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        mt="180"
        mx="auto"
        width={"368px"}
        p="32px"
        borderRadius={"8px"}
      >
        <Box display={"flex"} justifyContent="space-between">
          <Text fontSize={"4xl"} fontWeight="bold">
            Login
          </Text>
          <Box my={"auto"}>
            <Link to={"/register"}>
              <Text color="#47b74e">Register</Text>
            </Link>
          </Box>
        </Box>
        <Box mt="42px">
          <form onSubmit={formik.handleSubmit}>
            <Box mb="16px">
              <FormControl isInvalid={formik.errors.emailOrPhoneNumber}>
                <FormLabel
                  fontSize={"12px"}
                  mb="4px"
                  fontWeight={"bold"}
                  color="rgba(49,53,59,0.68)"
                >
                  Email or Phone Number
                </FormLabel>

                <Input
                  p="8px 12px"
                  borderColor={"#E5E7E9"}
                  type="text"
                  placeholder="Enter your Email or Phone Number"
                  value={formik.values.emailOrPhoneNumber}
                  name="emailOrPhoneNumber"
                  onChange={formChangeHandler}
                />

                <FormErrorMessage>
                  {formik.errors.emailOrPhoneNumber}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.password} mt="3">
                <FormLabel
                  fontSize={"12px"}
                  mb="4px"
                  fontWeight={"bold"}
                  color="rgba(49,53,59,0.68)"
                >
                  Password
                </FormLabel>

                <InputGroup>
                  <Input
                    p="8px 12px"
                    borderColor={"#E5E7E9"}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    value={formik.values.password}
                    name="password"
                    onChange={formChangeHandler}
                  />

                  <InputRightElement width={"4.5rem"}>
                    <Button size="sm" onClick={togglePassword}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
            </Box>

            <Button
              background-color="#E5E7E9"
              w="100%"
              borderRadius={"8px"}
              color="#6C727C"
              type="submit"
            >
              <Text fontSize={"14px"} fontWeight="bold">
                Login
              </Text>
            </Button>
          </form>
        </Box>
      </Box>
      {/* footer */}
      <Box mt="64px" p="16px 0" display="flex">
        <Box mx="auto" display={"flex"}>
          <Box>
            <Text fontSize={".8rem"}>© 2009-2022</Text>
          </Box>
          <Box ml="16px" pl="16px" borderLeft={"1px solid #E5E7E9"}>
            <Text fontSize={".8rem"} fontWeight="bold" color="#47b74e">
              Help
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
