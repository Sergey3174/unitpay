import { useState } from 'react';
import { CheckCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';


interface NotificationCardProps {
  title: string;
  date: string;
  type: string;
  description: string;
  isRead: boolean;
}

const NotificationCard = ({ title, date, type, description, isRead }: NotificationCardProps) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Card className="flex flex-row w-full relative rounded-xl">
      <div
        className={`w-[12px] ${
          type === 'info'
            ? 'bg-[#7239EA]'
            : type === 'primary'
              ? 'bg-[#1B84FF]'
              : type === 'success'
                ? 'bg-[#17C653]'
                : type === 'warning'
                  ? 'bg-[#F6B100]'
                  : 'bg-[#F8285A]'
        } rounded-l-xl min-h-[60px] shrink-[0]`}
      ></div>
      <div className={`flex flex-grow-[1] flex-row px-[16px] lg:py-[16px] md:py-[20px] py-[16px] gap-x-[24px] md:flex-nowrap flex-wrap gap-y-[16px] ${showDescription ? 'items-start' : 'items-center'} sm:justify-end justify-center`}>
        <div
          className={`flex flex-col items-center flex-grow-1 gap-y-[8px] ${showDescription ? 'justify-start' : 'justify-center'}`}
        >
          <div className="flex xs:items-center justify-between w-full flex-wrap sm:flex-nowrap flex-col sm:flex-row">
            <div className="flex gap-[8px] items-center order-2 sm:order-1">
              {type === 'info' ? (
                <span className="ki-filled ki-information-4 sm:text-[24px] text-[16px] text-[#7239EA]"></span>
              ) : type === 'primary' ? (
                <span className="ki-filled ki-time sm:text-[24px] text-[16px] text-[#1B84FF]"></span>
              ) : type === 'success' ? (
                <span className="ki-filled ki-check-circle sm:text-[24px] text-[16px] text-[#17C653]"></span>
              ) : type === 'warning' ? (
                <span className="ki-filled ki-information-1 sm:text-[24px] text-[16px] text-[#F6B100]"></span>
              ) : (
                <span className="ki-filled ki-cross-circle sm:text-[24px] text-[16px] text-[#F8285A]"></span>
              )}
              <h3 className="text-[#071437] sm:text-[16px] text-[14px] font-semibold tracking-[0.04rem]">
                {title}
              </h3>
            </div>
            <div className="flex gap-x-[24px] items-center flex-grow-1 justify-end order-1 sm:order-2 shrink-0">
              <div>
                <button
                  onClick={() => setShowDescription((prev) => !prev)}
                  className="text-[#78829D] flex cursor-pointer sm:text-[13px] text-[10px] tracking-[0.04rem] flex items-center gap-1"
                >
                  {date}
                  {showDescription ? <ChevronUp className='text-[16px]' /> : <ChevronDown className='text-[16px]' />}
                </button>
              </div>
            </div>
          </div>
          {showDescription && (
            <p className="text-[14px] font-normal tracking-[0.04rem] w-full">
              {description}
              {/* Поздравляем! Вы успешно зарегистрировались в системе Unitpay.
              <br />
              Пожалуйста, ознакомьтесь с документацией. О том, как начать
              получать средства на ваш счёт, читайте в разделе «Выплаты».
              <br /> Если у вас возникнут вопросы в дальнейшей работе, то можете
              почитать FAQ для партнеров или обратитесь в нашу службу поддержки
              (контакты поддержки находятся в вашем личном кабинете на главной
              странице). */}
            </p>
          )}
        </div>
        {!isRead && (
          <div className="flex lg:flex-col gap-[8px] justify-center flex-row flex-wrap grow sm:grow-0">
            {!showDescription ? (
              <Button variant={'outline'} className="text-[#4B5675] w-[200px] grow sm:grow-0">
                <CheckCheck className="text-[#17C653]" />
                Отметить прочитанным
              </Button>
            ) : type === 'success' ? (
              <>
                <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out w-[200px] grow md:grow-0">
                  Настройки интеграции
                </Button>
                <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out w-[200px] grow md:grow-0">
                  Подключить кассу
                </Button>
                <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out w-[200px] grow md:grow-0">
                  Написать в поддержку
                </Button>
                <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out w-[200px] grow md:grow-0">
                  Подписаться на канал
                </Button>
              </>
            ) : type === 'info' ? (
              <>
                <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out w-[200px] grow md:grow-0">
                  Перейти к документации
                </Button>
                <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out w-[200px] grow md:grow-0">
                  Настроить выплаты
                </Button>
                <Button variant={'outline'} className="text-[#4B5675] grow md:grow-0">
                  <CheckCheck className="text-[#17C653]" />
                  Отметить прочитанным
                </Button>
              </>
            ) : type === 'primary' ? (
              <>
                <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out w-[200px] grow md:grow-0">
                  Перейти к документации
                </Button>
                <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out w-[200px] grow md:grow-0">
                  Перейти к проекту
                </Button>
                <Button variant={'outline'} className="text-[#4B5675] grow md:grow-0">
                  <CheckCheck className="text-[#17C653]" />
                  Отметить прочитанным
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition duration-300 ease-in-out w-[200px]">
                  Проверить настройки
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default NotificationCard;