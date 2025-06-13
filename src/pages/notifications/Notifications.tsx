import { useState } from 'react';
import { addDays } from 'date-fns';
import { Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { FilterToggle, Input, LabeledSelect } from '@/components/custom';
import { DateRangePickerInput } from '@/components/custom/DateRangePickerInput';
import { KeenIcon } from '@/components/keenicons';
import NotificationsList from './components/NotificationsList';


const Notifications = () => {
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [valueSearch, setValueSearch] = useState('');

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(
    date,
  );

  return (
    <div className="2xl:px-[32px] md:px-[24px] px-[16px] flex flex-col gap-[15px] h-full">
      <div className="flex justify-between items-center flex-wrap gap-y-[8px]">
        <div className="tracking-[0.03rem]">
          <h1 className="2xl:text-[30px] xl:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold leading-[40px]">
            Уведомления
          </h1>
          <span className="text-[14px]">5 непрочитанных</span>
        </div>
        <Button className="max-w-[267px] lg:max-w-[267px] sm:max-w-[232px] max-w-[212px] lg:h-[48px] sm:h-[40px] h-[32px] w-full lg:text-[14px] sm:text-[13px] text-[12px] tracking-[0.02rem]">
          Отметить все как прочитанные
        </Button>
      </div>
      <FilterToggle
        showAllFilter={showAllFilter}
        onToggle={() => setShowAllFilter((prev) => !prev)}
      />
      {showAllFilter && (
        <div className="flex gap-[18px] flex-wrap mb-[16px] mt-[5px]">
          <LabeledSelect
            label="Тип"
            value={'Все'}
            options={[]}
            placeholder="Регистрация"
            className="w-[376px] max-sm:w-[90vw]"
          />
          <LabeledSelect
            label="Статус"
            value={'Все'}
            options={[]}
            placeholder="Непрочитанные"
            className="w-[376px] max-sm:w-[90vw]"
          />
          <div className="w-[376px] max-sm:w-[90vw]">
            <DateRangePickerInput
              label="Период"
              value={date}
              icon={<KeenIcon icon="calendar" />}
              onChange={setTempDateRange}
              placeholder="Выберите дату и время"
            />
          </div>
          <Input
            label="Поиск"
            type="text"
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
            icon={
              <Search className="absolute left-[-3px] size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
            }
            className="w-[376px] max-sm:w-[90vw]"
          />
        </div>
      )}
      <NotificationsList />
    </div>
  );
};

export default Notifications;