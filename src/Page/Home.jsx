import { Box, Container, Grid, Image } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api"
import ImageSlider from "../Components/ImageSlider"
import Product from "../Components/Product"

const Home = () => {
  const [image, setImage] = useState([])
  const [product, setProduct] = useState([])

  const fetchImage = async () => {
    try {
      const response = await axiosInstance.get("/image/imageSlide")

      setImage(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("product/getAllProduct")

      setProduct(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderProduct = () => {
    return product.map((val) => {
      return (
        <Product
          key={val.id.toString()}
          product_name={val.product_name}
          image={val.image}
          price={val.price}
          shop_address={val.Seller.shop_address}
        />
      )
    })
  }

  useEffect(() => {
    fetchImage()
  }, [])
  useEffect(() => {
    fetchProduct()
  }, [])
  return (
    <Box>
      <Box mt={"110px"} w="1208px" marginX={"auto"}>
        <Box
          paddingBottom="24px"
          paddingTop={"24px"}
          h="auto"
          minHeight={"240px"}
        >
          <ImageSlider image={image} />
        </Box>
        <Grid templateColumns="repeat(6, 1fr)" gap={4} mt="15px" mb="25px">
          {renderProduct()}
        </Grid>
      </Box>
    </Box>
  )
}
export default Home
