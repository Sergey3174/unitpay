import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const EmblaCarousel = ({ images }: { images: string[] }) => {
  console.log('images', images);

  return (
    <div
      style={{
        width: '2000px',
        height: '230px',
        margin: 'auto',
      }}
    >
      <Swiper
        slidesPerView={4}
        spaceBetween={-800}
        loop={true}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {/* Для проверки */}
        {images.length === 0 ? (
          <SwiperSlide>⚠️ Нет изображений</SwiperSlide>
        ) : (
          images.map((image, index) => (
            <SwiperSlide
              style={{ width: 'min-content', height: '230px' }}
              key={index}
            >
              <div className="absolute top-[16px] left-[16px] w-[244px] pl-[6px] text-[#F1F1F4] z-2">
                <p className="pb-[8px] font-medium text-lg leading-[18px] tracking-[-1%] align-middle font-family: Inter leading-trim: Cap height">
                  Название фичи
                </p>
                <p className="leading-[22px] font-medium text-sm leading-[22px] tracking-[0.4px] align-middle font-family: Inter">
                  Описание фичи, рассказывает о том — зачем пользователю этот
                  функционал и как он хорошо заживёт теперь
                </p>
              </div>

              <div
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, #000000 100%)',
                  display: index === 0 ? 'none' : 'visible',
                }}
                className="flex items-center justify-center absolute w-[61px] h-[15px] top-[17px] left-[20%] rounded-full text-white z-5"
              >
                <p className="font-normal text-[10px] h-[12px] leading-[10px] tracking-[-3%] text-right align-middle font-family: Inter">
                  25.12.2025
                </p>
              </div>

              <div className="flex items-center justify-center absolute w-[207px] h-[32px] top-[179px] left-[16px] rounded-[6px] bg-white text-white z-2">
                <p className="font-normal text-[10px] h-[12px] leading-[10px] tracking-[-3%] text-[#071437] text-right align-middle font-family: Inter">
                  Смотреть
                </p>
              </div>
              <img
                style={{
                  width: 'min-content',
                  height: '230px',
                  clipPath:
                    index === 0
                      ? 'polygon(0.00% 0.00%, 100% 0%, 75.00% 100%, 0% 100%)'
                      : 'polygon(22.20% 0.00%, 100% 0%, 78.78% 100%, 0% 100%)',
                  position: 'relative',
                  left: index === 0 ? '58px' : '',
                  transform: 'translateX(-50px)',
                  zIndex: index === 0 ? 1 : 2,
                }}
                src={image}
                alt={`Slide ${index}`}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};
export default EmblaCarousel;
