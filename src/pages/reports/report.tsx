import { useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { DateRangePickerInput } from '@/components/custom/DateRangePickerInput';
import { LabeledSelect } from '@/components/custom/LabeledSelect';
import { KeenIcon } from '@/components/keenicons';
import { StoreClients } from './reports-table/components/index';

const Reports = () => {
  const [language, setLanguage] = useState('ru');

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(
    date,
  );

  useEffect(() => {
    setTempDateRange(date);
  }, [date]);

  return (
    <div className="w-full p-[32px] pt-1 max-sm:p-[17px]">
      <div className="w-[100%]">
        <div className="flex flex-col w-[100%] pb-[24px]">
          <h1 className="font-semibold text-3xl leading-[30px] tracking-[-2%] align-middle font-family: Inter text-[#071437] mb-[8px]">
            Отчеты
          </h1>
          <p className="font-normal text-sm leading-[14px] tracking-[0%] align-middle font-family: Inter text-[#4B5675]">
            описание раздела
          </p>
        </div>
        <div className="flex flex-wrap gap-[11px] mb-[32px] max-sm:flex-col">
          <div className="w-[306px] max-sm:w-[90vw]">
            <DateRangePickerInput
              label="Дата и время"
              value={date}
              icon={<KeenIcon icon="calendar" />}
              onChange={setTempDateRange}
              placeholder="Выберите дату и время"
            />
          </div>

          <LabeledSelect
            label={'Отображать по'}
            value={language}
            placeholder="Дням"
            onChange={setLanguage}
            options={[]}
            className="w-[306px] h-[42px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Проект"
            value={language}
            placeholder="GameSport"
            onChange={setLanguage}
            options={[]}
            className="w-[306px] h-[42px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Юр. лицо"
            value={language}
            placeholder="Все"
            onChange={setLanguage}
            options={[]}
            className="w-[306px] h-[42px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Общая выгрузка"
            value={language}
            onChange={setLanguage}
            options={[]}
            className="w-[196px] h-[42px] max-sm:w-[90vw]"
          />

          <button className="w-[97px] h-[40px] bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 px-1 py-2 rounded-md transition duration-300 ease-in-out font-family: Inter">
            <p>Выгрузить</p>
          </button>
        </div>
        <div>
          <StoreClients />
        </div>
      </div>
    </div>
  );
};

export default Reports;
