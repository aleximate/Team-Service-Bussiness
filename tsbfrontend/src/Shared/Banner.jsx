import { Swiper, SwiperSlide } from "swiper/react";
import slide_1 from "../img/slide-1.jpg";
import slide_2 from "../img/slide-2.jpg";
import slide_3 from "../img/slide-3.jpg";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Banner = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
    >
      <SwiperSlide>
        <img src={slide_1} className="banner-image" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_2} className="banner-image" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_3} className="banner-image" alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
  );
};
