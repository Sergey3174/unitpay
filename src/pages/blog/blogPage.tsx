import { useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { DateRangePickerInput } from '@/components/custom/DateRangePickerInput';
import { LabeledSelect } from '@/components/custom/LabeledSelect';
import Slider from '@/components/custom/Slider/slider';
import { KeenIcon } from '@/components/keenicons';
import { StoreClients } from './reports-table/components/index';

const slides = [
  {
    image: '/media/blog/desktop-blog.png',
    downloadUrl: '#',
    title: 'Slide 1',
    likes: 42,
  },
  {
    image: '/media/blog/img2-blog.png',
    downloadUrl: '#',
    title: 'Slide 2',
    likes: 36,
  },
  {
    image: '/media/blog/carousel1.png',
    downloadUrl: '#',
    title: 'Slide 3',
    likes: 28,
  },
];

const Blog = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-[24px] py-8 max-sm:pt-0 pb-0">
      {/* Заголовок */}
      <div className="flex flex-col w-full pb-6 max-sm:pb-[16px]">
        <h1 className="font-semibold leading-[30px] tracking-[-2%] text-[#071437] mb-2 max-sm:text-[19px] h-[15px]">
          Заголовок статьи
        </h1>
        <p className="font-normal text-sm leading-[14px] text-[#4B5675]">
          Анонс или описание статьи
        </p>
      </div>

      {/* Основное изображение */}
      <div className="pb-8 max-sm:pb-[27px]">
        <img
          className="w-full h-auto rounded-lg"
          src="/media/blog/desktop-blog.png"
          alt=""
        />
      </div>

      {/* Текстовый блок */}
      <div>
        <p className="font-semibold text-lg leading-6 pb-4 text-[#212529] max-sm:font-[18px] pb-[11px]">
          Кто виноват и что делать?
        </p>
        <div>
          <p className="font-normal text-base leading-6 text-[#4B5675]">
            В своём стремлении повысить качество жизни, они забывают, что
            базовый вектор развития не оставляет шанса для соответствующих
            условий активизации. Следует отметить, что реализация намеченных
            плановых заданий представляет собой интересный эксперимент проверки
            укрепления моральных ценностей! Не следует, однако, забывать, что
            синтетическое тестирование выявляет срочную потребность поэтапного и
            последовательного развития общества. Являясь всего лишь частью общей
            картины, действия представителей оппозиции могут быть объективно
            рассмотрены соответствующими инстанциями.
          </p>
          <br />
          <div className="space-y-2">
            <p className="mb-0">・базовый вектор развития не оставляет</p>
            <p className="mb-0">・шанса для соответствующих условий</p>
            <p>・активизации</p>
          </div>
          <br />
          <div className="space-y-2">
            <p className="mb-0">1. базовый вектор развития не оставляет</p>
            <p className="mb-0">2. шанса для соответствующих условий</p>
            <p>3. активизации</p>
          </div>
        </div>
      </div>

      {/* Второе изображение */}
      <div className="pt-8 pb-8">
        <img
          className="w-full h-auto rounded-lg"
          src="/media/blog/img2-blog.png"
          alt=""
        />
      </div>

      {/* Продолжение текста */}
      <div>
        <p className="font-normal text-base leading-6">
          В своём стремлении повысить качество жизни, они забывают, что базовый
          вектор развития не оставляет шанса для соответствующих условий
          активизации. Следует отметить, что реализация намеченных плановых
          заданий представляет собой интересный эксперимент проверки укрепления
          моральных ценностей! Не следует, однако, забывать, что синтетическое
          тестирование выявляет срочную потребность поэтапного и
          последовательного развития общества. Являясь всего лишь частью общей
          картины, действия представителей оппозиции могут быть объективно
          рассмотрены соответствующими инстанциями.
        </p>
      </div>

      {/* Галерея / Слайдер */}
      <h1 className="pt-8 pb-4 font-semibold text-lg max-sm:pt-[26px] pb-[10px]">
        Заголовок галереи это
      </h1>
      <div className="w-full mb-8">{<Slider slides={slides} />}</div>

      {/* Блок с картинкой и затемнённой подписью */}
      <div className="relative mb-[32px]">
        <img
          className="w-full h-auto rounded-lg max-sm:h-[330px]"
          src="/media/blog/img3.jpg"
          alt=""
        />
        <div
          style={{ background: '#212529' }}
          className="absolute bottom-0 w-full py-4 px-[10px] opacity-90 flex flex-col gap-1"
        >
          <p className="text-white font-semibold text-base">
            Заголовок single image это
          </p>
          <p className="text-white font-normal text-sm">
            Описание single image, если есть
          </p>
        </div>
      </div>

      {/* Предупреждение */}
      <div className="bg-gray-100 rounded-md p-4 mb-[26px] pt-[20px] h-[110px]">
        <div className="flex items-center gap-7">
          <img
            className="relative left-[10px]"
            src="/media/blog/warning-blog.svg"
            alt=""
          />
          <p className="leading-[17px] tracking-[0.4px] max-sm:w-[200px]">
            Ни в коем случае не повторяйте это, трюк выполнен профессионалами!
          </p>
        </div>
      </div>

      {/* Цитата */}
      <div className="flex flex-col">
        <h1 className="pb-2 font-semibold text-lg">Что же это делается!?</h1>
        <p>
          Современные технологии достигли такого уровня, что начало повседневной
          работы по формированию позиции требует анализа распределения
          внутренних резервов и ресурсов. В частности, убеждённость некоторых
          оппонентов не даёт нам иного выбора, кроме определения приоритизации
          разума над эмоциями. Вот вам яркий пример современных тенденций -
          разбавленное изрядной долей эмпатии, рациональное мышление
          предопределяет высокую востребованность новых принципов формирования
          материально-технической и кадровой базы. Задача организации, в
          особенности же сплочённость команды профессионалов требует анализа
          вывода текущих активов.
        </p>
      </div>

      {/* Цитата с аватаром */}
      <div className="flex flex-col mb-[15px]">
        <h1 className="font-semibold text-lg">Мнение эксперта, цитата</h1>
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6
          [@media(max-width:640px)]:flex-col 
          [@media(max-width:640px)]:items-center 
          [@media(max-width:640px)]:justify-center gap-[3px]
        "
        >
          <div className="flex flex-col items-center gap-1 max-sm:relative top-[-11px]">
            <img
              className="w-5 h-5 relative top-[21px] left-[42px] -bottom-6"
              src="/media/blog/social-media.svg"
              alt=""
            />
            <img
              className="w-[100px] h-[100px] rounded-full"
              src="/media/blog/avatar.png"
              alt=""
            />
            <p className="text-xs text-center">Ashley Schneider</p>
          </div>
          <div className="bg-gray-100 rounded-md p-6 w-full">
            <p>
              “В своём стремлении повысить качество жизни, они забывают, что
              базовый вектор развития не оставляет шанса для соответствующих
              условий активизации. Следует отметить, что реализация намеченных
              плановых заданий представляет собой интересный эксперимент
              проверки укрепления моральных ценностей!”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
