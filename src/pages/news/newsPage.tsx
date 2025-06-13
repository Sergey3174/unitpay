import EmblaCarousel from '@/components/custom/BeltScroller/BeltScroller';
import { CustomPagination } from '@/components/custom/CustomPagination';

const images = [
  '/media/news/firstImgSlide.png',
  '/media/news/next1.png',
  '/media/news/next1.png',
  '/media/news/next2.png',
  '/media/news/next2.png',
  '/media/news/next2.png',
  '/media/news/next1.png',
  '/media/news/next1.png',
  '/media/news/next2.png',
];

const NewsPage = () => {
  return (
    // px-6 md:px-8 lg:px-6 xl:px-24 py-8 max-w-screen-xl
    <div className="w-full px-[24px]">
      {/* Заголовок страницы */}
      <div className="w-full pb-6">
        <div className="flex flex-col w-full pb-[17px]">
          <h1 className="font-semibold text-3xl leading-[30px] tracking-[-2%] text-[#071437] mb-2">
            Новости
          </h1>
          <p className="font-normal text-sm leading-[14px] text-[#4B5675]">
            Описание статьи
          </p>
        </div>

        {/* Главные новости */}
        <h2 className="mb-4 font-semibold text-2xl leading-6 tracking-[-1%] text-[#071437]">
          Главные
        </h2>

        <div className="flex flex-col gap-4 pb-4 md:flex-row">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="relative flex-1 min-w-[280px]">
              <img
                className="rounded-lg w-full h-[320px] md:h-[425px] object-cover"
                src="/media/news/imageNews1.jpg"
                alt="Новость"
              />
              <div
                style={{ background: '#78829D' }}
                className="flex items-center justify-center absolute w-[61px] h-[15px] top-[26px] left-[81%] rounded-full text-white"
              >
                <p className="font-normal text-[10px] h-[12px] leading-[10px] tracking-[-3%] text-right align-middle font-family: Inter">
                  25.12.2025
                </p>
              </div>
              <div
                className="absolute bottom-0 w-full h-[94px] backdrop-blur-[5px] rounded-b-lg"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #000000 100%)',
                }}
              >
                <div className="flex flex-col p-6 gap-2">
                  <p className="text-white font-semibold text-xl">
                    Заголовок статьи
                  </p>
                  <p className="text-white font-normal text-base">
                    Краткое описание
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Карусель */}
        <div
          className="w-[93vw] mb-8 overflow-hidden
        [@media(max-width:1024px)]:w-[89vw]
        "
        >
          <EmblaCarousel images={images} />
        </div>

        {/* О продукте */}
        <div className="pb-[15px] w-full">
          <h2 className="mb-4 font-semibold text-2xl leading-6 tracking-[-1%] text-[#071437]">
            О продукте
          </h2>

          <div
            className="
              grid grid-cols-1 
                sm:grid-cols-2
                sm:h-auto 
                lg:grid-cols-3
                lg:h-[440px] overflow-hidden
                xl:grid-cols-4
                gap-4 pb-8
                md:h-[440px] 
                overflow-hidden
          "
          >
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative w-[fit-content] mx-auto my-0"
              >
                <img
                  className="rounded-lg w-full h-[320px] sm:h-[424px] object-cover
                  [@media(max-width:1440px)]:w-[322px] h-[424px]
                  [@media(max-width:1024px)]:w-[296px] h-[424px]
                  [@media(max-width:639px)]:h-[320px]
                  "
                  src="/media/news/imageNews1.jpg"
                  alt="Новость о продукте"
                />

                <div
                  style={{ background: '#78829D' }}
                  className="flex items-center justify-center absolute w-[61px] h-[15px] top-[26px] left-[71%] rounded-full text-white"
                >
                  <p className="font-normal text-[10px] h-[12px] leading-[10px] tracking-[-3%] text-right align-middle font-family: Inter">
                    25.12.2025
                  </p>
                </div>

                <div
                  className="absolute bottom-0 w-full h-[125px] backdrop-blur-[5px] rounded-b-lg"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #000000 100%)',
                  }}
                >
                  <div className="flex flex-col p-4 lg:p-6 gap-2">
                    <p className="text-white font-semibold text-xl">
                      Заголовок статьи
                    </p>
                    <p className="text-white font-normal text-base">
                      Анонс, краткое описание статьи, или цитата из интервью
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Остальные новости */}
        <div className="pb-[15px]">
          <h2 className="mb-4 font-semibold text-2xl leading-6 tracking-[-1%] text-[#071437]">
            Остальные новости
          </h2>

          <div
            className="
              grid grid-cols-1 
                sm:grid-cols-2
                sm:h-auto 
                lg:grid-cols-3
                lg:h-[840px] overflow-hidden
                xl:grid-cols-4
                gap-4 pb-8
                md:h-[440px] 
                overflow-hidden
            "
          >
            {[...Array(8)].map((_, index) => (
              <div key={index} className="w-full relative">
                <img
                  className="rounded-xl w-full h-[320px] object-cover
                  [@media(max-width:1440px)]:w-[322px] h-[424px]
                  [@media(max-width:1024px)]:w-[296px] h-[424px]
                  [@media(max-width:639px)]:h-[320px]
                  "
                  src="/media/news/imageNews2.jpg"
                  alt="Другие новости"
                />

                <div
                  style={{ background: '#78829D' }}
                  className="flex items-center justify-center absolute w-[61px] h-[15px] top-[26px] left-[71%] rounded-full text-white"
                >
                  <p className="font-normal text-[10px] h-[12px] leading-[10px] tracking-[-3%] text-right align-middle font-family: Inter">
                    25.12.2025
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CustomPagination />
    </div>
  );
};

export default NewsPage;
