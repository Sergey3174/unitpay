import { useState } from 'react';
import { addDays } from 'date-fns';
import { Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Input as InputC, LabeledSelect } from '@/components/custom';
import { DateRangePickerInput } from '@/components/custom/DateRangePickerInput';
import { FilterToggle } from '@/components/custom/FilterToggle';
import { KeenIcon } from '@/components/keenicons';


const TransactionsFilter = () => {
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [searchParam, setSearchParam] = useState(
    'По плательщику (ФИО, телефон, почта)',
  );

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(
    date,
  );

  return (
    <div className="flex flex-col gap-[13px] mt-[16px] max-sm:mt-[9px]">
      <div className="flex items-center gap-[24px] flex-wrap max-sm:gap-[16px]">
        {/* <Input className="[&_input]:pl-5 [&_.absolute]:left-5" placeholder="Поиск" type="search" icon={<span className="ki-outline ki-magnifier"></span>} /> */}
        <div className="flex relative flex-grow-1">
          <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Поиск"
            className="ps-9 w-40 flex-grow-1 w-full bg-transparent shadow-none h-[40px]"
          />
        </div>
        <div className="flex flex-wrap gap-[20px] items-center">
          <LabeledSelect
            label="Искать по параметрам"
            value={searchParam}
            onChange={setSearchParam}
            options={[
              { label: 'ФИО', value: '1000' },
              { label: 'Почта', value: '2000' },
            ]}
            className="sm:w-[364px] w-full flex-grow-1 w-[290px] h-[40px]"
          />
          <span className="ki-filled ki-question-2 text-[22px] text-[#99A1B7]"></span>
          <Button
            className="bg-[#EFF6FF] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 py-2 rounded-md transition duration-300 ease-in-out w-[80%] sm:w-[77px] h-[40px]"
            variant={'primary'}
          >
            Искать
          </Button>
        </div>
      </div>
      <FilterToggle
        showAllFilter={showAllFilter}
        onToggle={() => setShowAllFilter((prev) => !prev)}
      />
      {showAllFilter && (
        <div className="flex gap-[16px] max-sm:gap-[17px] text-[#78829D] flex-wrap gap-x-[10px]">
          <div className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]">
            <DateRangePickerInput
              label="Дата и время"
              value={date}
              icon={<KeenIcon icon="calendar" />}
              onChange={setTempDateRange}
              placeholder="Выберите дату и время"
            />
          </div>
          <LabeledSelect
            label="Статус"
            value={'Все'}
            placeholder="Все"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <InputC
            label="Номер карты"
            placeholder="Укажите номер"
            className="!max-w-none 2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <div className="flex items-center gap-[8px] 2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]">
            <InputC
              label="Сумма от"
              placeholder="10 000"
              className="!max-w-none 2xl:w-[176px] xl:w-[141px] max-sm:w-[100%]"
            />
            —
            <InputC
              label="Сумма до"
              placeholder="100 000"
              className="!max-w-none 2xl:w-[176px] xl:w-[141px] max-sm:w-[100%]"
            />
          </div>
          <LabeledSelect
            label="Проект"
            value={'Все'}
            placeholder="Выберите"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Терминал"
            value={'Все'}
            placeholder="Все"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Тип"
            value={'Все'}
            placeholder="Все"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Режим сайта"
            value={'Все'}
            placeholder="Все"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Метод оплаты"
            value={'Все'}
            placeholder="Все"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Банк"
            value={'Все'}
            placeholder="Все"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Код ошибки"
            value={'Все'}
            placeholder="Все"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Платёжная система"
            value={'Все'}
            placeholder="Все"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Страна"
            value={'Все'}
            placeholder="Все"
            options={[]}
            className="2xl:w-[382px] xl:w-[311px] lg:w-[286px] sm:w-[306px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Общая выгрузка"
            value={'Все'}
            placeholder="Формат xlsx"
            options={[]}
            className="2xl:w-[275px] xl:w-[204px] md:w-[179px] sm:w-[199px] max-sm:w-[208px]"
          />
          <Button className="bg-[#EFF6FF] text-[13px] text-blue-500 border border-[#1B84FF33] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 px-4 py-2 rounded-md transition duration-300 ease-in-out h-[40px]">
            Выгрузить
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionsFilter;