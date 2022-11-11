import { Box, Image, Text, useToast, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Product = ({ product_name, image, price, shop_address }) => {
  return (
    <Link>
      <Box>
        <Box
          width={"200px"}
          height={"340"}
          backgroundColor={"white"}
          borderRadius="15px"
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        >
          <Box>
            <Image
              height="188px"
              width={"188px"}
              objectFit="cover"
              src={image}
              borderTopRadius="15px"
            />
          </Box>
          <Box p={"8px"}>
            <Box
              // border="1px solid black"
              height={"36px"}
              mb="4px"
              overflow={"hidden"}
            >
              <Text mb={"4px"} fontSize="12.04px">
                {product_name}
              </Text>
            </Box>

            <Box mb="4px">
              <Text mb={"4px"} fontWeight="bold" fontSize="14px">
                Rp {price.toLocaleString()}
              </Text>
            </Box>

            <Text mb={"4px"} fontSize="14px">
              {shop_address}
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default Product
