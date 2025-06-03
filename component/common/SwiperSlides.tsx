"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import BG1 from "../../assets/images/mansion4.jpg";
import BG2 from "../../assets/images/mansion2.jpg";
import BG3 from "../../assets/images/mansion3.jpg";
import Image from "next/image";

const slideTitles = ["slide 1", "slide 2", "slide 3"];

const SwiperSlides = () => {
  const renderCustomBullet = (index: number, className: string): string => {
    return `<span class="${className}">
                    <em>${slideTitles[index]}</em>
                    <i></i>
                    <b></b>
                </span>`;
  };
  return (
    <Swiper
      loop
      modules={[Pagination, Navigation, Autoplay, EffectFade]}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
        type: "bullets",
        renderBullet: renderCustomBullet,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
    >
      <SwiperSlide className="swiper-slide">
        <Image src={BG1} alt="Slide 1" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide con2">
        <Image src={BG2} alt="Slide 1" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide con3">
        <Image src={BG3} alt="Slide 1" className="w-full h-full object-cover" />
      </SwiperSlide>

      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-scrollbar"></div>
    </Swiper>
  );
};

export default SwiperSlides;
