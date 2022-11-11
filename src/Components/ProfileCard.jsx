import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const ProfileCard = () => {
  const userSelector = useSelector((state) => state.user)
  return (
    <Box>
      <Box
        width={"400px"}
        height="500px"
        borderBottomRadius={"15px"}
        mx={"70%"}
        zIndex="99999"
        mt={"200px"}
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        paddingTop="2"
        paddingBottom="2"
        paddingLeft="4"
        paddingRight="4"
      >
        <Box
          borderRadius={"5px"}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          paddingTop="2"
          paddingBottom="2"
          paddingLeft="4"
          paddingRight="4"
          display={"flex"}
          gap="2"
        >
          <Box>
            <Avatar size="md" name="Kent Dodds" src="name" />
          </Box>
          <Box>
            <Text my={"auto"} fontWeight="bold">
              {userSelector.username || "Joel"}
            </Text>
            <Text my={"auto"}>{userSelector.username || "Member Silver"}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileCard
