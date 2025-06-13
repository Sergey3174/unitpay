const InfoOperation = () => {
  return (
    <div className="p-[16px]">
      <div className="flex justify-between items-center flex-wrap gap-[10px]">
        <div className="flex gap-2 sm:flex-nowrap flex-wrap lg:w-[348px] w-full">
          <button className="bg-[#EFF6FF] w-full h-[40px] text-blue-500 border border-[#1B84FF33] text-[13px]  hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 px-[12px] py-2 rounded-md transition duration-300 ease-in-out flex items-center justify-center gap-[5px] whitespace-nowrap">
            <span className="ki-filled ki-document text-[18px]"></span>
            Скачать квитанцию
          </button>
          <button className="bg-[#EFF6FF] w-full h-[40px] text-blue-500 border border-[#1B84FF33] text-[13px] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 px-[12px] py-2 rounded-md transition duration-300 ease-in-out flex items-center justify-center gap-[5px] whitespace-nowrap">
            <span className="ki-filled ki-arrow-circle-left text-[18px]"></span>
            Вернуть деньги
          </button>
        </div>
        <div className="flex gap-2 sm:flex-nowrap flex-wrap lg:w-[348px] w-full lg:mr-[30px]">
          <button className="bg-green-50 w-full h-[40px] text-[#17C653] border border-[#17C65333] text-[13px] px-[12px] py-2 rounded-md transition duration-300 ease-in-out flex items-center justify-center gap-[5px] whitespace-nowrap">
            <span className="ki-filled ki-check-circle text-[18px]"></span>
            Подтвердить операцию
          </button>
          <button className="bg-red-50 w-full h-[40px] text-[#F8285A] border border-[#F8285A33] text-[13px] px-[12px] py-2 rounded-md transition duration-300 ease-in-out flex items-center justify-center gap-[5px] whitespace-nowrap">
            <span className="ki-filled ki-cross-circle text-[18px]"></span>
            Отклонить операцию
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-[16px] mt-[16px] xl:flex-nowrap flex-wrap">
        <div className="flex flex-col w-full gap-[8px]">
          <h4 className="text-[#071437] text-[14px] font-semibold">Платеж</h4>
          <div className="flex flex-col rounded-xl border border-[#F1F1F4] overflow-y-hidden">
            <div className="flex justify-between px-[8px] py-[11px]">
              <span className="text-[#78829D] text-[13px]">Сайт</span>
              <a
                target="_blank"
                className="text-[14px] text-[#1B84FF]"
                href="https://gamesport.com/ru"
              >
                gamesport.com
              </a>
            </div>
            <div className="flex items-center justify-between px-[8px] py-[11px] bg-[#F9F9F9]">
              <span className="text-[#78829D] text-[13px]">
                Номер транзакции
              </span>
              <span className="text-[14px] flex items-center justify-center gap-1">
                5681616414618168
                <span className="ki-filled ki-size text-[20px] text-[#99A1B7]"></span>
              </span>
            </div>
            <div className="flex items-center justify-between px-[8px] py-[11px]">
              <span className="text-[#78829D] text-[13px]">Метод оплаты</span>
              <span className="text-[14px] flex items-center justify-center gap-1">
                СБП
                <span className="ki-filled ki-size text-[20px] text-[#99A1B7]"></span>
              </span>
            </div>
            <div className="flex justify-between px-[8px] py-[11px] bg-[#F9F9F9]">
              <span className="text-[#78829D] text-[13px]">
                Наименование услуги
              </span>
              <span className="text-[14px]">Оплата по тарифу PRO</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-[8px]">
          <h4 className="text-[#071437] text-[14px] font-semibold">Клиент</h4>
          <div className="flex flex-col rounded-xl border border-[#F1F1F4]">
            <div className="flex justify-between px-[8px] py-[11px]">
              <span className="text-[#78829D] text-[13px]">Email</span>
              <a
                target="_blank"
                className="text-[14px] text-[#1B84FF]"
                href="mailto:username@domain.com"
              >
                username@domain.com
              </a>
            </div>
            <div className="flex items-center justify-between px-[8px] py-[11px] bg-[#F9F9F9]">
              <span className="text-[#78829D] text-[13px]">ID клиента</span>
              <span className="text-[14px] flex items-center justify-center gap-1">
                5681616414618168
                <span className="ki-filled ki-size text-[20px] text-[#99A1B7]"></span>
              </span>
            </div>
            <div className="flex items-center justify-between px-[8px] py-[11px]">
              <span className="text-[#78829D] text-[13px]">Локация</span>
              <span className="text-[14px] flex items-center justify-center gap-1">
                Россия
                <span className="ki-filled ki-size text-[20px] text-[#99A1B7]"></span>
              </span>
            </div>
            <div className="flex justify-between px-[8px] py-[11px] bg-[#F9F9F9]">
              <span className="text-[#78829D] text-[13px]">Маска карты</span>
              <span className="text-[14px]">5599 44** **** 4568</span>
            </div>
            <div className="flex justify-between px-[8px] py-[11px]">
              <span className="text-[#78829D] text-[13px]">Эмитент</span>
              <span className="text-[14px]">Сбер</span>
            </div>
            <div className="flex justify-between px-[8px] py-[11px] bg-[#F9F9F9]">
              <span className="text-[#78829D] text-[13px]">
                Страна эмитента карты
              </span>
              <span className="text-[14px]">Russia</span>
            </div>
            <div className="flex items-center justify-between px-[8px] py-[11px]">
              <span className="text-[#78829D] text-[13px]">RRN</span>
              <span className="text-[14px] flex items-center justify-center gap-1">
                5681616414618168
                <span className="ki-filled ki-size text-[20px] text-[#99A1B7]"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoOperation;
