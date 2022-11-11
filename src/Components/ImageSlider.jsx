import { Image } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { axiosInstance } from "../api"

const ImageSlider = ({ image }) => {
  return (
    <Carousel infiniteLoop>
      {image.map((slide) => {
        return <Image src={slide.image_url} borderRadius={"15px"} />
      })}
    </Carousel>
  )
}

export default ImageSlider
