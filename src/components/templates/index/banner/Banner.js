"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

function Banner() {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
      autoplay={{ delay: 1500 }}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slider"
    >
      <SwiperSlide>
        <Image
          width={1000}
          height={1000}
          src="/images/1.png"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          width={1000}
          height={1000}
          src="/images/2.png"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          width={1000}
          height={1000}
          src="/images/3.png"
          alt="Slide"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
