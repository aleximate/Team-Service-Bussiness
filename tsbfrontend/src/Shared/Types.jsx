import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useEffect, useState } from "react";
import { getAllTypes } from "../Api/TypeProducts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Types = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Llamar a la función getAllTypes para obtener los datos
    getAllTypes()
      .then((response) => {
        // Mapear los datos para obtener solo los campos deseados
        const filteredTypes = response.data.map((type) => ({
          name: type.name,
        }));

        // Establecer los datos filtrados en el estado
        setTypes(filteredTypes);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos", error);
      });
  }, []);

  return (
    <Swiper
      // Instalar módulos de Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={5} // Mostrar inicialmente 4 nombres de tipo
      navigation
      loop={true}
    >
      {types.map((type, index) => (
        <SwiperSlide key={index} className="swiper-container">
          <section className="type-section"><p className="type-p">{type.name}</p></section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
