import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { axiosInstance } from "../api"
import * as Yup from "yup"

const Register = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      phone_number: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ username, phone_number, email, password }) => {
      try {
        const response = await axiosInstance.post("/user/register", {
          username,
          phone_number,
          email,
          password,
        })

        toast({
          title: "Registration Succesful",
          description: response.data.message,
          status: "success",
        })
        formik.setFieldValue("username", "")
        formik.setFieldValue("phone_number", "")
        formik.setFieldValue("email", "")
        formik.setFieldValue("password", "")
        navigate("/login")
      } catch (error) {
        console.log(error.response)
        toast({
          title: "Register Failed",
          description: error.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required().min(3),
      phone_number: Yup.number().required().min(10),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
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
        mt="78"
        mx="auto"
        width={"368px"}
        p="32px"
        borderRadius={"8px"}
      >
        <Box display={"flex"} justifyContent="space-between">
          <Text fontSize={"4xl"} fontWeight="bold">
            Register
          </Text>
          <Box my={"auto"}>
            <Link to={"/login"}>
              <Text color="#47b74e">Login</Text>
            </Link>
          </Box>
        </Box>
        <Box mt="42px">
          <form onSubmit={formik.handleSubmit}>
            <Box mb="16px">
              <FormControl isInvalid={formik.errors.phone_number}>
                <FormLabel
                  fontSize={"12px"}
                  mb="4px"
                  fontWeight={"bold"}
                  color="rgba(49,53,59,0.68)"
                >
                  Phone Number
                </FormLabel>

                <Input
                  p="8px 12px"
                  type={"text"}
                  placeholder="Enter your phone number"
                  value={formik.values.phone_number}
                  name="phone_number"
                  onChange={formChangeHandler}
                />

                <FormErrorMessage>
                  {formik.errors.phone_number}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.username} mt="3">
                <FormLabel
                  fontSize={"12px"}
                  mb="4px"
                  fontWeight={"bold"}
                  color="rgba(49,53,59,0.68)"
                >
                  Username
                </FormLabel>

                <Input
                  p="8px 12px"
                  type={"text"}
                  placeholder="Enter your username"
                  value={formik.values.username}
                  name="username"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.email} mt="3">
                <FormLabel
                  fontSize={"12px"}
                  mb="4px"
                  fontWeight={"bold"}
                  color="rgba(49,53,59,0.68)"
                >
                  Email
                </FormLabel>

                <Input
                  p="8px 12px"
                  type={"text"}
                  placeholder="Enter your email"
                  value={formik.values.email}
                  name="email"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>

                <FormControl isInvalid={formik.errors.password} mt="3">
                  <FormLabel
                    fontSize={"12px"}
                    mb="4px"
                    fontWeight={"bold"}
                    color="rgba(49,53,59,0.68)"
                  >
                    Password
                  </FormLabel>

                  <Input
                    p="8px 12px"
                    type={"text"}
                    placeholder="Enter your password"
                    value={formik.values.password}
                    name="password"
                    onChange={formChangeHandler}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
              </FormControl>
            </Box>

            <Box textAlign={"end"} mb="12px">
              <Link>
                <Text fontSize={"12px"} color="#47b74e">
                  Need help?
                </Text>
              </Link>
            </Box>
            <Box>
              <Button
                background-color=" #E5E7E9"
                w="100%"
                borderRadius={"8px"}
                color="#6C727C"
                type="submit"
              >
                <Text fontSize={"14px"} fontWeight="bold">
                  Register
                </Text>
              </Button>
            </Box>
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
          <Button>Google acc</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Register
