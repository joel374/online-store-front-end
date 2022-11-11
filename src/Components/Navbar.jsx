import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import ProfileCard from "./ProfileCard"
import { IoMdCart, IoMdNotifications, IoMdMail } from "react-icons/io"
import { BiLogOutCircle } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import LoremIpsum from "react-lorem-ipsum"
import { logout } from "../Redux/Features/userSlice"

const Navbar = () => {
  const userSelector = useSelector((state) => state.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()

  const logOutBtnHandler = () => {
    localStorage.removeItem("user_token")
    dispatch(logout())
    toast({
      title: "User Logout",
      status: "success",
    })
    navigate("/")
  }
  return (
    <>
      <Box
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        position={"fixed"}
        left="0"
        right={"0"}
        top="0"
        backgroundColor={"#EEEEEE"}
        zIndex="9998"
      >
        {/* Top */}
        <Box backgroundColor={"#EEEEEE"}>
          <Box height={"32px"} padding="0 32px">
            <HStack gap={"4"} justifyContent="end">
              <Box>
                <Box display={"flex"} my="auto" p="1" gap={5}>
                  <Text>Mengenai Kami</Text>
                  <Text>Pusat Edukasi</Text>
                  <Text>Promo</Text>
                </Box>
              </Box>
            </HStack>
          </Box>
        </Box>

        {/* Middle */}
        <Box backgroundColor="#fff">
          <HStack
            height={"56px"}
            width="96%"
            justifyContent={"space-between"}
            mx={"auto"}
          >
            <Link to="/">
              <Box>
                <Text fontSize={"3xl"} padding="2" mt="0" color="#03AC0E">
                  tokopaedi
                </Text>
              </Box>
            </Link>
            <Box display={"flex"} gap="4">
              <Box
                display={"flex"}
                my="auto"
                gap={2}
                borderRight="1px solid #e0e0e0"
                paddingRight={4}
              >
                <Link to="/cart">
                  <Box
                    _hover={{ bgColor: "#f3f4f5", borderRadius: "3px" }}
                    p={2}
                  >
                    <IoMdCart color="#6c727c" fontSize={"20px"} />
                  </Box>
                </Link>
                {userSelector.username ? (
                  <>
                    <Box
                      _hover={{ bgColor: "#f3f4f5", borderRadius: "3px" }}
                      p={2}
                    >
                      <IoMdNotifications color="#6c727c" fontSize={"20px"} />
                    </Box>
                    <Box
                      _hover={{ bgColor: "#f3f4f5", borderRadius: "3px" }}
                      p={2}
                    >
                      <IoMdMail color="#6c727c" fontSize={"20px"} />
                    </Box>
                  </>
                ) : null}
              </Box>
              <Box display={"flex"} mr="6" ml="2">
                {userSelector.username ? (
                  <>
                    <Box
                      display={"flex"}
                      my="auto"
                      mr="2"
                      width={"113px"}
                      paddingLeft="6px"
                      _hover={{ bgColor: "#f3f4f5" }}
                    >
                      <Avatar
                        name={null}
                        mr={2}
                        width={"25px"}
                        height="25px"
                        my={"auto"}
                      />
                      <Text
                        mr={7}
                        my="auto"
                        padding={"8px"}
                        fontSize="14px"
                        color={"rgba(0,0,0,.54)"}
                      >
                        {userSelector.shop_name}
                      </Text>
                    </Box>

                    <Popover trigger={"hover"}>
                      <PopoverTrigger>
                        <Box
                          display={"flex"}
                          my="auto"
                          width={"113px"}
                          paddingLeft="6px"
                          _hover={{ bgColor: "#f3f4f5" }}
                          onClick={onOpen}
                        >
                          <Avatar
                            size="sm"
                            name={userSelector.username}
                            mr={2}
                            width={"25px"}
                            height="25px"
                            my="auto"
                          />
                          <Text
                            my="auto"
                            padding={"8px"}
                            fontSize="14px"
                            color={"rgba(0,0,0,.54)"}
                          >
                            {userSelector.username.split(" ")[0]}
                          </Text>
                        </Box>
                      </PopoverTrigger>
                      <PopoverContent w={"400px"} mr="4">
                        <PopoverBody>
                          <Box p="2 4">
                            <Box
                              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                              display={"flex"}
                              my="auto"
                              padding="6px 12px"
                              borderRadius={"5px"}
                            >
                              <Avatar
                                name={userSelector.username}
                                mr={2}
                                width={"50px"}
                                height="50px"
                                my="auto"
                              />
                              <Text
                                my="auto"
                                padding={"8px"}
                                fontSize="16px"
                                fontWeight={"bold"}
                                color={"rgba(0,0,0,.54)"}
                              >
                                {userSelector.username.split(" ")[0]}
                              </Text>
                            </Box>
                            <Grid templateColumns="1fr .8fr" mb="10px">
                              <GridItem p={2} borderRight="1px solid  #e0e0e0 ">
                                <Box
                                  fontSize={"14px"}
                                  borderBottom="1px solid #e0e0e0"
                                  p="10px 0"
                                >
                                  <Box
                                    _hover={{
                                      bgColor: "#f3f4f5",
                                      borderRadius: "7px",
                                    }}
                                    p={"5px 4px"}
                                  >
                                    <Box
                                      display={"flex"}
                                      justifyContent="space-between"
                                    >
                                      <Text>GoPay</Text>
                                      <Text>Rp0</Text>
                                    </Box>
                                    <Box
                                      display={"flex"}
                                      justifyContent="space-between"
                                      pt="2"
                                    >
                                      <Text>GoPay Coins</Text>
                                      <Text>0</Text>
                                    </Box>
                                  </Box>
                                </Box>

                                <Box fontSize={"14px"} p="10px 0">
                                  <Box
                                    _hover={{
                                      bgColor: "#f3f4f5",
                                      borderRadius: "7px",
                                    }}
                                  >
                                    <Flex
                                      justifyContent="space-between"
                                      p={"5px 4px"}
                                    >
                                      <Text>Saldo</Text>
                                      <Text>Rp0</Text>
                                    </Flex>
                                  </Box>
                                </Box>

                                <Box
                                  fontSize={"14px"}
                                  borderTop="1px solid #e0e0e0"
                                  borderBottom="1px solid #e0e0e0"
                                  p="10px 0"
                                >
                                  <Box
                                    display={"flex"}
                                    justifyContent="space-between"
                                    _hover={{
                                      bgColor: "#f3f4f5",
                                      borderRadius: "7px",
                                    }}
                                    p={"5px 4px"}
                                  >
                                    <Text>OVO Cash</Text>
                                    <Text>Rp0</Text>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    justifyContent="space-between"
                                    p={"5px 4px"}
                                  >
                                    <Text>OVO Points</Text>
                                    <Text>0</Text>
                                  </Box>
                                </Box>

                                <Box fontSize={"14px"} p="10px 0">
                                  <Box
                                    display={"flex"}
                                    justifyContent="space-between"
                                    _hover={{
                                      bgColor: "#f3f4f5",
                                      borderRadius: "7px",
                                    }}
                                    p={"5px 4px"}
                                  >
                                    <Text>TokoMember</Text>
                                    <Text>0</Text>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    justifyContent="space-between"
                                    _hover={{
                                      bgColor: "#f3f4f5",
                                      borderRadius: "7px",
                                    }}
                                    p={"5px 4px"}
                                  >
                                    <Text>Misi Seru</Text>
                                    <Text>0</Text>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    justifyContent="space-between"
                                    _hover={{
                                      bgColor: "#f3f4f5",
                                      borderRadius: "7px",
                                    }}
                                    p={"5px 4px"}
                                  >
                                    <Text>Kupon Saya</Text>
                                    <Text>0</Text>
                                  </Box>
                                </Box>
                              </GridItem>

                              <GridItem p={2}>
                                <Grid templateRows={"1fr 1fr"}>
                                  <GridItem>
                                    <Box fontSize={"14px"} p="10px 0">
                                      <Box
                                        _hover={{
                                          bgColor: "#f3f4f5",
                                          borderRadius: "7px",
                                        }}
                                        p={"5px 4px"}
                                      >
                                        <Text>Pembelian</Text>
                                      </Box>

                                      <Box
                                        _hover={{
                                          bgColor: "#f3f4f5",
                                          borderRadius: "7px",
                                        }}
                                        p={"5px 4px"}
                                      >
                                        <Text>Whistlist</Text>
                                      </Box>

                                      <Box
                                        _hover={{
                                          bgColor: "#f3f4f5",
                                          borderRadius: "7px",
                                        }}
                                        p={"5px 4px"}
                                      >
                                        <Text>Toko Favorit</Text>
                                      </Box>

                                      <Box
                                        _hover={{
                                          bgColor: "#f3f4f5",
                                          borderRadius: "7px",
                                        }}
                                        p={"5px 4px"}
                                      >
                                        <Text>Pengaturan</Text>
                                      </Box>
                                    </Box>
                                  </GridItem>

                                  <GridItem>
                                    <Box
                                      fontSize={"14px"}
                                      p="10px 0"
                                      mt="75.2%"
                                    >
                                      <Box
                                        display={"flex"}
                                        _hover={{
                                          bgColor: "#f3f4f5",
                                          borderRadius: "7px",
                                        }}
                                        p={"5px 4px"}
                                        b="0"
                                        onClick={logOutBtnHandler}
                                      >
                                        <Text>Keluar</Text>
                                        <Box my="auto" ml="1">
                                          <BiLogOutCircle />
                                        </Box>
                                      </Box>
                                    </Box>
                                  </GridItem>
                                </Grid>
                              </GridItem>
                            </Grid>
                          </Box>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </>
                ) : (
                  <Box gap="2" display={"flex"}>
                    <Link to={"/login"}>
                      <Box width={"73px"}>
                        <Button
                          _hover={"null"}
                          height="32px"
                          borderRadius={"8px"}
                          border={"1px solid #03AC0E"}
                          bgColor={"white"}
                          color={"#03AC0E"}
                          fontSize="12px"
                          fontWeight={"bold"}
                        >
                          Masuk
                        </Button>
                      </Box>
                    </Link>
                    <Link to="/register">
                      <Box width={"72px"}>
                        <Button
                          _hover={"null"}
                          height="32px"
                          borderRadius={"8px"}
                          bgColor={"#03AC0E"}
                          color={"white"}
                          fontWeight={"bold"}
                          fontSize="12px"
                          textAlign="center"
                          mx={"auto"}
                        >
                          Daftar
                        </Button>
                      </Box>
                    </Link>
                  </Box>
                )}
              </Box>
            </Box>
          </HStack>
        </Box>

        {/* Bottom */}
        <Box height={"18px"} backgroundColor="#fff"></Box>
      </Box>
    </>
  )
}

export default Navbar
